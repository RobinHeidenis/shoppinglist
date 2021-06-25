import history from "./history";

export default async function request(path: string, data = {}) {
    if (!process.env.REACT_APP_API_URL) throw new Error("EVENTS_URL environment variable has not been set.");
    if (Object.keys(data).length !== 0) {
        return await fetch(process.env.REACT_APP_API_URL + path, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify(data)
        }).then(r => {
            return r.json()
        }).catch((e) => {console.log(e); history.push("/login")});
    } else {
        return await fetch(process.env.REACT_APP_API_URL + path, {
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        }).then(r => {
            return r.json()
        }).catch((e) => {console.log(e); history.push("/login")});
    }
}
