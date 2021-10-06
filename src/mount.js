#!/usr/bin/env node
/*----------------------------------------*\
  easyPlayer - mount.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-01-04 14:26:06
  @Last Modified time: 2021-01-06 15:53:46
\*----------------------------------------*/

import { program } from 'commander';
import { getUSBStorage, mount } from "./tools.js";
import { 
	USB_STROB_INTERVAL, 
	USB_STORAGE_NAME,
	DATA_DIR
} from "./Constants.js";

program
	.option('-v, --verbose <verbose>', 'verbose', false)
	.option('-l, --label <label>', 'label of the disk to mount', USB_STORAGE_NAME)
	.option('-m, --mountPoint <mountPoint>', 'path of the mounted disk', DATA_DIR)
	.action(async ({verbose, label, mountPoint}) => {
		try{
			const usbStorage = await getUSBStorage(label, USB_STROB_INTERVAL, !!verbose);
			const result = await mount(usbStorage, mountPoint, !!verbose);
			console.log(mountPoint);	
		}catch(error){
			console.log(error);
		}
	});

program.parse(process.argv);