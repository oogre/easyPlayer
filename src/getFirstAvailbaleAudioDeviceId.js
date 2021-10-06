#!/usr/bin/env node
/*----------------------------------------*\
  startVideoPlayer - getFirstAvailbaleAudioDeviceId.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-12-13 17:24:39
  @Last Modified time: 2021-01-06 15:53:51
\*----------------------------------------*/
import {exec} from "child_process";

exec("aplay -l", (err, stdout, stderr) => {
	if(err) return console.error(err);
	if(stderr) return console.error(stderr);
	const deviceOrder = ["HiFiBerry", "Headphones", "HDMI 1", "HDMI 2"];
	const devices = stdout.split(/(card \d+:)/ig).filter((d, key) => key!=0 && key%2==0);
	for(let deviceToken of deviceOrder){
		const index = devices.findIndex(device=>device.includes(deviceToken))	
		if(index > -1){
			return console.log(index);
		}
	}
});

/*
$ aplay -l 
	` ... \n`+
	`card 0: b1 [bcm2835 HDMI 1], device 0: bcm2835 HDMI 1 [bcm2835 HDMI 1]\n`+
	` ... \n`+
	`card 1: Headphones [bcm2835 Headphones], device 0: bcm2835 Headphones [bcm2835 Headphones]\n`+
	` ... \n`+
	`card 2: sndrpihifiberry [snd_rpi_hifiberry_dacplus], device 0: HiFiBerry DAC+ Pro HiFi pcm512x-hifi-0 [HiFiBerry DAC+ Pro HiFi pcm512x-hifi-0]\n`+
	` ... \n`+
	``
*/
