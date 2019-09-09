import { RNS3 } from 'react-native-aws3';
import getEnvVars from '../env';
const { AUTH_URL } = getEnvVars();

// for uploading images
export const uploadImage = async ({ uri }) => {
  try {
    let ext = getImageFileExtension(uri);

    const file = {
      uri,
      name: generateUUID(ext),
      type: 'image/' + ext,
    };

    let res = await uploadToAWS(file);

    if (res.error) {
      return { error: res.error };
    }
    return res;
  } catch (err) {
    return { error: err.message };
  }
};

// for uploading everything except images
export const uploadDocument = async ({ uri, name }) => {
  try {
    let ext = getImageFileExtension(name);

    const file = {
      uri,
      name: generateUUID(ext),
      type: `application/${ext}`,
    };

    let res = await uploadToAWS(file);

    if (res.error) {
      return { error: res.error };
    }
    return res;
  } catch (err) {
    return { error: err.message };
  }
};

// attach AsyncStorage auth token and some other way to make sure only this function can call this url
async function uploadToAWS(file) {
  try {
    let API_KEYS = await fetch(`${AUTH_URL}/creds`).then(res => res.json());
    const { accessKey, secretKey } = API_KEYS;

    const options = {
      bucket: 'athares-images',
      region: 'us-east-2',
      accessKey,
      secretKey,
      successActionStatus: 201,
    };

    let response = await RNS3.put(file, options);
    if (response.status !== 201) {
      return { error: 'Failed to upload image to S3' };
    }
    return {
      url: response.body.postResponse.location,
      name: response.body.postResponse.key,
    };
  } catch (err) {
    return { error: err.message };
  }
}

function getImageFileExtension(filename) {
  let extension =
    filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
    filename;
  return extension.toLowerCase() === 'jpeg' ? 'jpg' : extension.toLowerCase();
}

function generateUUID(ext) {
  return (
    new Date().getTime() +
    '-' +
    Math.random()
      .toString(16)
      .replace('.', '') +
    '.' +
    ext
  );
}
