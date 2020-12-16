import { ACCESS_TOKEN } from '../utils/constants';
import jwtDecode from "jwt-decode";


export function getAccessToken() {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token || token === "null") {
        return null;
    }

    return willExpireToken(token) ? null : token;
}


export function refreshAccessToken(token) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/renew`;
    const bodyObj = {
        token: token
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                return null;
            }
            return response.json();
        })
        .then(result => {
            if (!result) {
                logout();
            } else {
                const { token } = result;
                localStorage.setItem(ACCESS_TOKEN, token);
            }
        })
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
}


function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > exp;
}