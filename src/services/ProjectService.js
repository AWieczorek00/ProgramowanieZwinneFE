import instance from "./AxiosService";


const addProject = async (project) => {
    return await instance.post("/api/project/", project).catch((error) => {
        return Promise.reject(error)
    });
}

const searchProjects = async (searchQuery) => {
    return await instance.get("/api/project/search", {params: {
        searchText: searchQuery
    }}).catch((error) => {
        return Promise.reject(error)
    });
}

const updateProject = async (project) => {
    return await instance.patch("/api/project/"+project.id, project).catch((error) => {
        return Promise.reject(error)
    });
}

const deleteProject = async (id) => {
    return await instance.delete("/api/project/"+id).catch((error) => {
        return Promise.reject(error)
    });
}

const addTaskToProject = async (projectID, taskName, taskDescription, taskEstimatedTime) => {
    return await instance.post("/api/project/"+projectID+'/task',{
        'taskName': taskName,
        'taskDescription': taskDescription,
        'taskEstimatedTime': taskEstimatedTime
    }).catch((error) => {
        return Promise.reject(error)
    });
}

const removeTaskFromProject = async (projectID, taskID) => {
    return await instance.delete("/api/project/"+projectID+"/task/"+taskID).catch((error) => {
        return Promise.reject(error)
    });
}

const addUserToProject = async (projectID, userID) => {
    return await instance.post("/api/project/"+ projectID + "/user/" + userID).catch((error) => {
        return Promise.reject(error)
    });
}

const removeUserFromProject = async (projectID, userID) => {
    return await instance.delete("/api/project/"+ projectID + "/user/" + userID).catch((error) => {
        return Promise.reject(error)
    });
}

const getUsersFromProject = async (projectID) => {
    return await instance.get("/api/project/"+projectID+"/user").catch((error) => {
        return Promise.reject(error)
    });
}

const ProjectService = {
    addProject,
    searchProjects,
    updateProject,
    deleteProject,
    addTaskToProject,
    removeTaskFromProject,
    addUserToProject,
    removeUserFromProject,
    getUsersFromProject,

};

export default ProjectService;