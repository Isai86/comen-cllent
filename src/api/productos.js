export function getProductosApi(token, producto) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/productos`;
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

}

export function updateProductosApi(token, productos, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/productos/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(productos)
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });

}

export function deleteProductosApi(token, id) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/productos/${id}`;

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

export function signUpProductosApi(token, producto) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/productos`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(producto)
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

export function getProductoDataApi(token, id, producto) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/productos/${id}`;
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
}