"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    const possibleChars = "qwertyuiopasdfghjklzxcvbnm1234567890";
    const length = possibleChars.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += possibleChars[Math.floor((Math.random()) * length)];
    }
    return ans;
};
exports.random = random;
