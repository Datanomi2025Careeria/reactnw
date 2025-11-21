import axios from "axios"

//const baseUrl = "http://localhost:5052/api/authentication"
const baseUrl = "https://northwindrestapi20251121141605-dpercdbkeue9asga.northeurope-01.azurewebsites.net/api//authentication"

const authenticate = (userForAuth) => {
    return axios.post(baseUrl, userForAuth)
}


export default { authenticate }
