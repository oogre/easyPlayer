"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USB_STORAGE_NAME = exports.OMX_SYNC_PATH = exports.DATA_DIR = exports.USB_STROB_INTERVAL = exports.MOUNT_PATH = exports.PLAY_PATH = exports.ProcessType = void 0;

/*----------------------------------------*\
  easyPlayer - Constants.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-01-04 16:33:06
  @Last Modified time: 2021-10-06 16:42:36
\*----------------------------------------*/
const ProcessType = {
  DUAL_SCREEN_MASTER: 0,
  DUAL_SCREEN_SLAVE: 1,
  SINGLE_SCREEN: 2,
  AUDIO: 3
};
exports.ProcessType = ProcessType;
const PLAY_PATH = `play`;
exports.PLAY_PATH = PLAY_PATH;
const MOUNT_PATH = `customount`;
exports.MOUNT_PATH = MOUNT_PATH;
const USB_STROB_INTERVAL = 1000;
exports.USB_STROB_INTERVAL = USB_STROB_INTERVAL;
const DATA_DIR = `/media/mydisk`;
exports.DATA_DIR = DATA_DIR;
const OMX_SYNC_PATH = `omxplayer-sync`;
exports.OMX_SYNC_PATH = OMX_SYNC_PATH;
const USB_STORAGE_NAME = "FelixLuque";
exports.USB_STORAGE_NAME = USB_STORAGE_NAME;