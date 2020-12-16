export function signUpLugarApi(data) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/lugares`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.lugar) {
                return { ok: true, message: '¡Cuenta registrada! Por favor revise su correo electrónico para el enlace de activación.' };
            }
            return { ok: false, message: result.msg };
        })
        .catch(err => {
            return { ok: false, message: err.msg };
        });
}

export function signInLugarApi(data) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-Type": "application/json"
        }
    }

    return fetch(url, params).then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return { ok: false, message: err.msg };
        });
}

export function getLugarDataApi(token, id, user) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/lugares/${id}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(user)
    };

    return fetch(url, params)
        .then(response => {
            return response.json()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    return err.message;
                })
        })
}

export function uploadAvatarApi(token, logo, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/lugares/avatar/${id}`;

    const formData = new FormData();
    formData.append("logo", logo, logo.name);

    const params = {
        method: "POST",
        body: formData,
        headers: {
            "x-auth-token": token
        }
    }
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });

}

export function updateLugarApi(token, lugar, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/lugares/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(lugar)
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });

}