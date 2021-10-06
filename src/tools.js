/*----------------------------------------*\
  easyPlayer - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-01-04 15:48:54
  @Last Modified time: 2021-10-06 12:47:55
\*----------------------------------------*/
import { exec, spawn } from "child_process";
import read from 'fs-readdir-recursive';

export const attemptUntilSuccess = async (action, interval, caller, debug=false) => {
	debug && console.log(`${caller} : attemptUntilSuccess`);
	let result;
	while(true){
		try{
			if(result = await action())return result;
			debug && console.log(".");
			await new Promise( resolve => setTimeout(resolve, interval) );
		}catch(error){

		}
	}
}

export const getProcessType = (dataDir, ProcessType) => {
	return new Promise((resolve, reject)=>{
		const videoFile = read(dataDir).find(name => !!(name.match(/\.mp4$/ig)));
		const audioFile = read(dataDir).find(name => !!(name.match(/\.wav$/ig)));

		if(!videoFile && !audioFile) return reject(`Audio/Video not found in ${dataDir}`);
		if(videoFile){
			let videoPath = `${dataDir}/${videoFile}`;
			videoPath = videoPath.split("/");
			const filename = videoPath.pop();
			videoPath = videoPath.join("/");
			if(videoFile.match(/dual\.?-?_?screen/ig)){
				if(videoFile.match(/master/ig)){
					resolve([ProcessType.DUAL_SCREEN_MASTER, videoPath, filename])
				}else if(videoFile.match(/slave/ig)){
					resolve([ProcessType.DUAL_SCREEN_SLAVE, videoPath, filename])
				}
			}else{
				resolve([ProcessType.SINGLE_SCREEN, videoPath, filename])
			}	
		}else{
			let audioPath = `${dataDir}/${audioFile}`;
			audioPath = audioPath.split("/");
			const filename = audioPath.pop();
			audioPath = audioPath.join("/");
			resolve([ProcessType.AUDIO, audioPath, filename])
		}
	})
}

export const getUSBStorage = (label, interval, debug=false) => {
	return attemptUntilSuccess(() => {
		return new Promise((resolve, reject) => {
			debug && console.log("sudo blkid", " # list les attributs de périphériques");
			exec("sudo blkid", (err, stdout, stderr) => {
				if(err) return reject(err);
				if(stderr) return reject(stderr);	
				for(let line of stdout.split("\n")){
					if(line.includes(`LABEL="${label}"`)){
						return resolve({
							path : line.split(":")[0],
							LABEL : line.split(`LABEL="`)[1].split(`"`)[0],
							TYPE : line.split(`TYPE="`)[1].split(`"`)[0],
							UUID : line.split(`UUID="`)[1].split(`"`)[0]
						});
					}
				}
				return resolve(false);
			});
		})
	}, interval, "getUSBStorage", debug);
}

export const mount = ({path, LABEL, TYPE, UUID}, mountPath, debug=false) => {
	return new Promise((resolve, reject) => {
		debug && console.log(`sudo mkdir -p ${mountPath}`, " # crée le dossier de montage");
		exec(`sudo mkdir -p ${mountPath}`, (err, stdout, stderr) => {
			if(err) return reject(err);
			if(stderr) return reject(stderr);
			debug && console.log(`sudo mount ${path} ${mountPath}`, " # monte le périphérique dans le dossier de montage");
			exec(`sudo mount ${path} ${mountPath}`, (err, stdout, stderr) => {
				if(err) return reject(err);
				if(stderr) return reject(stderr);	
				resolve(stdout);
			});	
		});
	});
}

export const run = (cmd, options={}, debug=false) => {
	debug && console.log('Current play command : ', cmd.join(" "));
	const child = spawn(cmd.shift(), cmd, options);
	child.stdout.on('data', data => debug && console.log("\t" + data.toString().split("\n").join("\n\t")));
	child.stderr.on('data', data => debug && console.error("\t" + data.toString().split("\n").join("\n\t")));
	child.on('exit', code => debug && console.log('child process exited with code ' + code.toString()));
}