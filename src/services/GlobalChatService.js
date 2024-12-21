import instance from './AxiosService';

const getAllGlobalChatMessages  = () => {
    return instance.get("http://localhost:8080/api/globalChat/").then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
        return []
    })
}

const GlobalChatService = {
    getAllGlobalChatMessages,
}

export default GlobalChatService