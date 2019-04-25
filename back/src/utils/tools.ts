export function getRandom() {
    const rdm = 'abcdefghijklmnobprstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < 16; i++) {
        res += rdm[Math.floor(Math.random() * rdm.length)];
        if (i / 4 > 0 && i % 4 == 0) {
            res += "-";
        }
    }
    return res;
}
