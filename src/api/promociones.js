export function getPromocionApi(token, promocion) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/promocion`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(promocion)
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

export function updatePromocionApi(token, promocion, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/promocion/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(promocion)
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });

}

export function deletePromocionApi(token, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/promocion/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    }
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

export function signUpPromocionApi(token, promocion) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/promocion`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(promocion)
    }
    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}


export function uploadImageApi(token, avatar, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/promocion/avatar/${id}`;

    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);

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

/* export function getProductoDataApi(token, id, producto) {
    const url = `${BASE_PATH}/api/productos/${id}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(producto)
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
} */