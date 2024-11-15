import axios from 'axios';

const getAllGlobalChatMessages  = () => {
    return axios.get("http://localhost:8080/api/globalChat/").then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
    })
}


const GlobalChatService = {
    getAllGlobalChatMessages,
}

export default GlobalChatService