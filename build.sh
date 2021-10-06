#!/bin/bash
# @Author: Evrard Vincent
# @Date:   2020-12-23 22:10:56
# @Last Modified by:   oogre
# @Last Modified time: 2021-10-06 17:22:13

./node_modules/.bin/babel --verbose --out-dir tmp src
pkg -t node14-linuxstatic-armv7 -o bin/easyPlayer tmp/main.js
pkg -t node14-linuxstatic-armv7 -o bin/getFirstAvailbaleAudioDeviceId tmp/getFirstAvailbaleAudioDeviceId.js
pkg -t node14-linuxstatic-armv7 -o bin/mount tmp/mount.js

#uglifyjs tmp/startVideoPlayer.js -c -m -o dist/startVideoPlayer.js
#uglifyjs tmp/mount.js -c -m -o dist/mount.js
#uglifyjs tmp/getFirstAvailbaleAudioDeviceId.js -c -m -o dist/getFirstAvailbaleAudioDeviceId.js

#rollup src/startVideoPlayer.js --file dist/startVideoPlayer.js --format cjs --banner \#!/usr/bin/env\ node
#rollup src/mount.js --file dist/mount.js --format cjs --banner \#!/usr/bin/env\ node
#rollup src/getFirstAvailbaleAudioDeviceId.js --file dist/getFirstAvailbaleAudioDeviceId.js --format cjs --banner \#!/usr/bin/env\ node

# rm tmp/*
# rm -r tmp