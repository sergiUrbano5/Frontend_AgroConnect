
export const setAccessTokenCookie = (response) => {
    const accessTokenCookie = response.raw_headers.find(
        (header) => header[0] === 'set-cookie'
    );

    if (accessTokenCookie) {
        const maxAge = accessTokenCookie[1].split(';')[1].split('=')[1]
        const accessToken = accessTokenCookie[1]
            .split(';')[0]
            .split('=')[1];
        setCookie("access_token", accessToken, maxAge)
        return true
    } else {
        return false
    }
};

const setCookie = (name, value, seconds) => {
    const expiration = new Date(Date.now() + seconds * 1000);
    document.cookie = `${name}=${value}; expires=${expiration.toUTCString()}; path=/`;
};
