const parseJwt = (token: string) => {
    if (!token) {
        return {};
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);

    if(payload.exp*1000<Date.now()) {
        return {}; // token is expired;
    }
    return payload;
}

export {parseJwt};