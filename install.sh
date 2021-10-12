#!/bin/bash
# @Author: Evrard Vincent
# @Date:   2021-10-12 15:09:56
# @Last Modified by:   oogre
# @Last Modified time: 2021-10-12 15:41:00

rm /usr/local/bin/play
rm /usr/local/bin/omxplayer-sync
rm /usr/local/bin/customount
rm /usr/local/bin/getFirstAvailbaleAudioDeviceId
rm /usr/local/bin/easyPlayer

ln -s /home/pi/easyPlayer/bin/play /usr/local/bin/play
ln -s /home/pi/easyPlayer/bin/omxplayer-sync /usr/local/bin/omxplayer-sync
ln -s /home/pi/easyPlayer/bin/customount /usr/local/bin/customount
ln -s /home/pi/easyPlayer/bin/getFirstAvailbaleAudioDeviceId /usr/local/bin/getFirstAvailbaleAudioDeviceId
ln -s /home/pi/easyPlayer/bin/easyPlayer /usr/local/bin/easyPlayer

