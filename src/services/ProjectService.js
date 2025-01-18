import instance from "./AxiosService";


const addProject = (project) => {
    return instance.post("/api/project/", project)
}

const searchProjects = (searchQuery) => {
    return instance.get("/api/project/search", {params: {
        searchText: searchQuery
    }})
}

const updateProject = (project) => {
    return instance.patch("/api/project/"+project.id, project)
}

const deleteProject = (id) => {
    return instance.delete("/api/project/"+id)
}

const addTaskToProject = (projectID, taskName, taskDescription, taskEstimatedTime) => {
    return instance.post("/api/project/"+projectID+'/task', null, {params: {
        'taskName': taskName,
        'taskDescription': taskDescription,
        'taskEstimatedTime': taskEstimatedTime
    }})
}

const removeTaskFromProject = (projectID, taskID) => {
    return instance.delete("/api/project/"+projectID+"/task/"+taskID)
}

const addUserToProject = (projectID, userID) => {
    return instance.post("/api/project/"+ projectID + "/user/" + userID);
}

const removeUserFromProject = (projectID, userID) => {
    return instance.delete("/api/project/"+ projectID + "/user/" + userID);
}

const getUsersFromProject = (projectID) => {
    return instance.get("/api/project/"+projectID+"/user")
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