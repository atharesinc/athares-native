import sha256 from "hash.js/lib/hash/sha/256";
import JSEncrypt from "jsencrypt";

export function sha(text) {
  return sha256()
    .update(text)
    .digest("hex");
}

/** Generate and store keypair */
export function pair() {
  let crypt = new JSEncrypt();
  crypt.getPrivateKey();

  // Only return the public key, keep the private key hidden
  return { pub: crypt.getPublicKey(), priv: crypt.getPrivateKey() };
}

/** Encrypt the provided string with the destination public key */
export function encrypt(content, publicKey) {
  let crypt = new JSEncrypt();
  crypt.setKey(publicKey);
  return crypt.encrypt(content);
}

/** Decrypt the provided string with the local private key */
export function decrypt(content, privateKey) {
  let crypt = new JSEncrypt();
  crypt.setKey(privateKey);
  return crypt.decrypt(content);
}
