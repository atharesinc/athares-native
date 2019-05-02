import sha256 from "hash.js/lib/hash/sha/256";
import JSEncrypt from "jsencrypt";

export function sha(text) {
  return sha256()
    .update(text)
    .digest("hex");
}

/** Generate and store keypair */
export function pair() {
  let crypt = new JSEncrypt({ default_key_size: 2048 });
  crypt.getPrivateKey();

  // Only return the public key, keep the private key hidden
  return { pub: crypt.getPublicKey(), priv: crypt.getPrivateKey() };
}

/** Encrypt the provided string with the destination public key */
export function encrypt(content, publicKey) {
  let crypt = new JSEncrypt({ default_key_size: 2048 });
  crypt.setKey(publicKey);
  console.log(crypt, publicKey, content);
  return crypt.encrypt(content);
}

/** Decrypt the provided string with the local private key */
export function decrypt(content, privateKey) {
  let crypt = new JSEncrypt({ default_key_size: 2048 });
  crypt.setKey(privateKey);
  return crypt.decrypt(content);
}
