export function validatePassword(str) {
  const re = /(?=.*\d)(?=.*[a-z]).{6,}/;
  return re.test(str);
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  const re = /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;
  return re.test(number);
}
