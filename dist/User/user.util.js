// const logo = "https://i.ibb.co/w73H9FS/3.jpg";
export function generateNewQR(full_name, email) {
    const salt = createSaltForQR();
    const infoString = generateInfoString(full_name, email, salt);
    const URL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${infoString}`;
    return {
        image: URL,
        salt: salt,
        qr_code: infoString,
    };
}
export function createSaltForQR() {
    return Math.random().toString(36).substring(2, 9);
}
export function generateInfoString(full_name, email, salt) {
    // transform full_name to lowercase and remove spaces between
    full_name = full_name.replace(" ", "").toLowerCase();
    return full_name + email + salt;
}
(() => {
    const { image, salt, qr_code } = generateNewQR("John Doe", "rncy29@gmail.com");
    console.table({ image, salt, qr_code });
})();
