# easyPlayer

## Desc.

This is a omxplayer wrapper. It handles start at launch and looping A/V file on usb key. 

It handles

1. synched dual-screen [omxplayer-sync](https://github.com/turingmachine/omxplayer-sync)

2. single-sreen

3. no-screen (just audio)

4. HiFiBerry DAC2 Pro XLR for audio output if presents (fallback on headphones)

It auto mount usb storage key named "FelixLuque" (you can change config in src/Constants.js:USB_STORAGE_NAME).

The first mp4/wav file found select the mode (dual/single/no-screen)

```lolcode
if file is "mp4" : 
    if filePath contains "dual-screen"
        if filePath contains "master"
            play this video with omxplayer-sync as master (dual-screen)
        if filePath contains "slave"
            play this video with omxplayer-sync as slave (dual-screen)
    else 
        play this video with omxplayer as master (single-screen)
else : 
    play this audio with omxplayer (no-screen)
```

## Install

Install nodejs 14, Git and dependencies : 

```bash
sudo apt update
sudo apt upgrade
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs git python3 omxplayer
```

Download easyPlayer

```bash
git clone https://github.com/oogre/easyPlayer.git
```

Enter the easyPlayer directory, install node dependencies, and build

```bash
cd easyPlayer
npm install
npm run build
# for install 
sudo npm run install

```

## Run

```bash
# run at startup 
ln -s EASYPLAYER_PATH/runEasyPlayer /etc/init.d/runEasyPlayer

# run on demand
./EASYPLAYER_PATH/runEasyPlayer start
#or
easyPlayer
# stop on demand
./EASYPLAYER_PATH/runEasyPlayer stop
```


