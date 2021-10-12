"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = exports.mount = exports.getUSBStorage = exports.getProcessType = exports.attemptUntilSuccess = void 0;

var _child_process = require("child_process");

var _fsReaddirRecursive = _interopRequireDefault(require("fs-readdir-recursive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*----------------------------------------*\
  easyPlayer - tools.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2021-01-04 15:48:54
  @Last Modified time: 2021-10-06 12:47:55
\*----------------------------------------*/
const attemptUntilSuccess = async (action, interval, caller, debug = false) => {
  debug && console.log(`${caller} : attemptUntilSuccess`);
  let result;

  while (true) {
    try {
      if (result = await action()) return result;
      debug && console.log(".");
      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {}
  }
};

exports.attemptUntilSuccess = attemptUntilSuccess;

const getProcessType = (dataDir, ProcessType) => {
  return new Promise((resolve, reject) => {
    const videoFile = (0, _fsReaddirRecursive.default)(dataDir).find(name => !!name.match(/\.mp4$/ig));
    const audioFile = (0, _fsReaddirRecursive.default)(dataDir).find(name => !!name.match(/\.wav$/ig));
    if (!videoFile && !audioFile) return reject(`Audio/Video not found in ${dataDir}`);

    if (videoFile) {
      let videoPath = `${dataDir}/${videoFile}`;
      videoPath = videoPath.split("/");
      const filename = videoPath.pop();
      videoPath = videoPath.join("/");

      if (videoFile.match(/dual\.?-?_?screen/ig)) {
        if (videoFile.match(/master/ig)) {
          resolve([ProcessType.DUAL_SCREEN_MASTER, videoPath, filename]);
        } else if (videoFile.match(/slave/ig)) {
          resolve([ProcessType.DUAL_SCREEN_SLAVE, videoPath, filename]);
        }
      } else {
        resolve([ProcessType.SINGLE_SCREEN, videoPath, filename]);
      }
    } else {
      let audioPath = `${dataDir}/${audioFile}`;
      audioPath = audioPath.split("/");
      const filename = audioPath.pop();
      audioPath = audioPath.join("/");
      resolve([ProcessType.AUDIO, audioPath, filename]);
    }
  });
};

exports.getProcessType = getProcessType;

const getUSBStorage = (label, interval, debug = false) => {
  return attemptUntilSuccess(() => {
    return new Promise((resolve, reject) => {
      debug && console.log("sudo blkid", " # list les attributs de périphériques");
      (0, _child_process.exec)("sudo blkid", (err, stdout, stderr) => {
        if (err) return reject(err);
        if (stderr) return reject(stderr);

        for (let line of stdout.split("\n")) {
          if (line.includes(`LABEL="${label}"`)) {
            return resolve({
              path: line.split(":")[0],
              LABEL: line.split(`LABEL="`)[1].split(`"`)[0],
              TYPE: line.split(`TYPE="`)[1].split(`"`)[0],
              UUID: line.split(`UUID="`)[1].split(`"`)[0]
            });
          }
        }

        return resolve(false);
      });
    });
  }, interval, "getUSBStorage", debug);
};

exports.getUSBStorage = getUSBStorage;

const mount = ({
  path,
  LABEL,
  TYPE,
  UUID
}, mountPath, debug = false) => {
  return new Promise((resolve, reject) => {
    debug && console.log(`sudo mkdir -p ${mountPath}`, " # crée le dossier de montage");
    (0, _child_process.exec)(`sudo mkdir -p ${mountPath}`, (err, stdout, stderr) => {
      if (err) return reject(err);
      if (stderr) return reject(stderr);
      debug && console.log(`sudo mount ${path} ${mountPath}`, " # monte le périphérique dans le dossier de montage");
      (0, _child_process.exec)(`sudo mount ${path} ${mountPath}`, (err, stdout, stderr) => {
        if (err) return reject(err);
        if (stderr) return reject(stderr);
        resolve(stdout);
      });
    });
  });
};

exports.mount = mount;

const run = (cmd, options = {}, debug = false) => {
  debug && console.log('Current play command : ', cmd.join(" "));
  const child = (0, _child_process.spawn)(cmd.shift(), cmd, options);
  child.stdout.on('data', data => debug && console.log("\t" + data.toString().split("\n").join("\n\t")));
  child.stderr.on('data', data => debug && console.error("\t" + data.toString().split("\n").join("\n\t")));
  child.on('exit', code => debug && console.log('child process exited with code ' + code.toString()));
};

exports.run = run;