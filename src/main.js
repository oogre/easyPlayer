#!/usr/bin/env node
/*----------------------------------------*\
  startVideoPlayer - startVideoPlayer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-12-13 17:24:39
  @Last Modified time: 2021-10-12 12:08:11
\*----------------------------------------*/
import { exec } from "child_process";
import { program } from 'commander';
import { 
	run, 
	getProcessType,
	getLocalPlayersIP
} from "./tools.js";
import { 
	DATA_DIR, 
	PLAY_PATH, 
	MOUNT_PATH,
	ProcessType, 
	OMX_SYNC_PATH
} from "./Constants.js";

process.title = "easyPlayer";


program
	.option('-v, --verbose <verbose>', 'verbose', false)
	.action(async ({verbose}) => {
		try{
			await run([MOUNT_PATH], {}, verbose);	
			await new Promise( resolve => setTimeout(resolve, 5000) );
			let [type, path, filename] = await getProcessType(DATA_DIR, ProcessType);
			switch(type){
				case ProcessType.DUAL_SCREEN_MASTER : {
					console.log("DUAL_SCREEN_MASTER");
					run([OMX_SYNC_PATH, `-muv`, filename], {cwd : path}, verbose);	
				}
				break;
				case ProcessType.DUAL_SCREEN_SLAVE : {
					console.log("DUAL_SCREEN_SLAVE");
					run([OMX_SYNC_PATH, `-luv`, filename], {cwd : path}, verbose);	
				}
				break;
				case ProcessType.SINGLE_SCREEN : {
					console.log("SINGLE_SCREEN");
					run([PLAY_PATH, filename], {cwd : path}, verbose);
				}
				break;
				case ProcessType.AUDIO : {
					console.log("AUDIO");
					console.log(`${PLAY_PATH} --vol 3000 ${path}/${filename}`);
					run([PLAY_PATH, `--vol 3000`, filename], {cwd : path}, verbose);
				}
				break;
				default : 
					console.log("Unknow type");
				break;
			}
		}catch(error){
			console.log(error);
		}
	});

program.parse(process.argv);
