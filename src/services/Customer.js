import axios from "axios"

//const baseUrl = "http://localhost:5052/api/customers"
const baseUrl = "https://northwindrestapi20251121141605-dpercdbkeue9asga.northeurope-01.azurewebsites.net/api/customers"



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

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer, getConfig())
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`, getConfig())
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.customerId}`, object, getConfig())
}


export default { getAll, create, remove, update, setToken }
