export function validatePassword(str) {
  const re = /(?=.*\d)(?=.*[a-z]).{6,}/;
  return re.test(str);
}

export function validateEmail(email) {
  const re = /^\w+@[a-zA-Z_A-Za-z0-9]+?\.[A-Za-z0-9]{1,3}(.[a-zA-Z]{1,3})?$/;
  return re.test(String(email));
}

export function validateUsername(username) {
  const re = /[a-zA-Z]/;
  return !re.test(String(username));
}

export function validateScore(score) {
  const re = /^([0-9]|[1-4]\d|50)$/;
  var result = re.test(score);
  return result;
}

export function validateNumber(number) {
  const re = /0((60[3-9]|64[0-5]|66[0-5])\d{6}|(7[1-4689]|6[1-3]|8[1-4])\d{7})/;
  return re.test(number);
}
