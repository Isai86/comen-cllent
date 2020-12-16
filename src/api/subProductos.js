export function getProductosApi(token, producto) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/subproductos`;

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
            return console.log(response)
        })
        .then(result => {
            return console.log(result)
        })
        .catch(err => {
            return console.log(err)
        })

}