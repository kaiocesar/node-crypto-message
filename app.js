var crypto = require('crypto')
	, algorithm = 'aes-256-gcm'
	, private_key = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'
	, public_key = '60iP0h6vJoEa';
 
function encrypt(text) {
  var cipher = crypto.createCipheriv(algorithm, private_key, public_key);
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  var tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag: tag
  };
}
 
function decrypt(encrypted) {
  var decipher = crypto.createDecipheriv(algorithm, private_key, public_key);
  decipher.setAuthTag(encrypted.tag);
  var dec = decipher.update(encrypted.content, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("Ninguem pode ver essa senha.");
  // outputs hello world
console.log(decrypt(hw));
