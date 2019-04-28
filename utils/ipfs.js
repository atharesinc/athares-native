import IPFS from "ipfs-http-client";
import fileReaderPullStream from "pull-file-reader";

const node = new IPFS({
  host: "ipfs.infura.io",
  protocol: "https",
  port: 5001
});

export const uploadToIPFS = async (file, updateProgress = console.log) => {
  return new Promise(async resolve => {
    const newFile = {
      path: file.name,
      content: fileReaderPullStream(file)
    };

    node.add(
      newFile,
      {
        progress: prog => {
          updateProgress(prog, file.size);
        }
      },
      async (err, result) => {
        if (err) {
          throw err;
        }
        await node.pin.add(result[0].hash);
        resolve("https://ipfs.io/ipfs/" + result[0].hash);
      }
    );
  }).catch(err => {
    console.error(new Error(err));
  });
};
