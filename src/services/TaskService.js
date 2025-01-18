import instance from "./AxiosService";

const searchTask = (searchText, projectID) => {
    return instance.get("/api/task/search", {params: {
        'searchText': searchText,
        'projectId': projectID
    }})
}


const TaskService = {
    searchTask
};

export default TaskService;