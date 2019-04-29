// import IPFS from "ipfs";
// import fileReaderPullStream from "pull-file-reader";

// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https"
// });

// const node = new IPFS({
//   host: "ipfs.infura.io",
//   protocol: "https",
//   port: 5001
// });

const API_URL = "http://54aef6fd.ngrok.io/upload";

// for uploading images
export const uploadToIPFS = ({ uri }) => {
  return new Promise(resolve => {
    let ext = getImageFileExtension(uri);

    const formData = new FormData();
    const file = {
      uri,
      name: "upload." + ext,
      type: "image/" + ext
    };
    formData.append("file", file);

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    };

    fetch(API_URL, config)
      .then(res => res.json())
      .then(data => {
        //returns {url, hash}
        resolve(data);
      })
      .catch(e => {
        console.error(new Error(e));
      });
  });
};

// for uploading everything except images
export const uploadFileToIPFS = ({ uri, name }) => {
  return new Promise(resolve => {
    let ext = getImageFileExtension(name);

    const formData = new FormData();
    const file = {
      uri,
      name,
      type: `application/${ext}`
    };
    formData.append("file", file);

    const config = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    fetch(API_URL, config)
      .then(res => res.json())
      .then(data => {
        //returns {url, hash}
        resolve(data);
      })
      .catch(e => {
        console.error(new Error(e));
      });
  });
};
// export const uploadToIPFS = async (file, updateProgress = console.log) => {
//   return new Promise(async resolve => {
//     const newFile = {
//       path: file.name,
//       content: fileReaderPullStream(file)
//     };

//     ipfs.add(
//       newFile,
//       {
//         progress: prog => {
//           updateProgress(prog, file.size);
//         }
//       },
//       async (err, result) => {
//         if (err) {
//           throw err;
//         }
//         await ipfs.pin.add(result[0].hash);
//         resolve("https://ipfs.io/ipfs/" + result[0].hash);
//       }
//     );
//   }).catch(err => {
//     console.error(new Error(err));
//   });
// };

function getImageFileExtension(filename) {
  let extension =
    filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
    filename;
  return extension.toLowerCase() === "jpeg" ? "jpg" : extension.toLowerCase();
}
