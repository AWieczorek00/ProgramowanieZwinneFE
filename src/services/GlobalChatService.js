import instance from './AxiosService';

const getAllGlobalChatMessages  = () => {
    return instance.get("/api/globalChat/").then(response => {
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