export function generateNewQR(full_name: string, email: string) {
    const salt = createSaltForQR();

    const infoString = generateInfoString(full_name, email, salt);

    return {
        salt: salt,
        qr_code: infoString,
    }
}


export function createSaltForQR(): string {
    return Math.random().toString(36).substring(2, 9);
}

export function generateInfoString(full_name: string, email: string, salt: string): string {
    // transform full_name to lowercase and remove spaces between
    full_name = full_name.replace(" ", "").toLowerCase();
    return full_name + email + salt;
}

(() => {
    const {salt, qr_code} = generateNewQR("John Doe", "rncy29@gmail.com")
    console.table({salt, qr_code})
})()