import instance from "./AxiosService";

const searchTask = async (searchText, projectID) => {
    return await instance.get("/api/task/search", {params: {
        'searchText': searchText,
        'projectId': projectID
    }}).catch((error) => {
        return Promise.reject(error)
    });
}

const TaskService = {
    searchTask
};

export default TaskService;