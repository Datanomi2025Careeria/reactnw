import axios from "axios"

//const baseUrl = "http://localhost:5052/api/users"
const baseUrl = "https://northwindrestapi20251121141605-dpercdbkeue9asga.northeurope-01.azurewebsites.net/api/users"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getConfig = () => ({
    headers: { Authorization: token }
});

const getAll = () => {
    const request = axios.get(baseUrl, getConfig())
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser, getConfig())
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`, getConfig())
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object, getConfig())
}


export default { getAll , create, remove, update , setToken }
