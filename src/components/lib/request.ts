export default async function request(path: string, data = {}) {
    if(Object.keys(data).length !== 0) {
        const response = await fetch('http://localhost:3001/api/' + path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify(data)
        })
        return response.json();
    } else {
        const response = await fetch('http://localhost:3001/api' + path, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        })
        return response.json()
    }
}
