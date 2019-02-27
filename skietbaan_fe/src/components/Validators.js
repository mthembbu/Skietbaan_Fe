export function validatePassword(str) {
    const re = /(?=.*\d)(?=.*[a-z]).{6,}/;
    return re.test(str);
}
    
export function validateEmail(email) {
    const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]/;
    return re.test(String(email).toLowerCase());
}
    
export function validateUsername(username) {
    const re = /[a-zA-Z]/;
    return !re.test(String(username));
}

export function validateScore(score){
    const re = /^[0-9]+$/;
    return re.test(score);
}