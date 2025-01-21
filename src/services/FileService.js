import instance from "./AxiosService";

const addFileToProject = async (projectID, formData) => {
    return await instance.post("/api/minio/project/"+projectID, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).catch((error) => {
        return Promise.reject(error)
    });
}

const removeFileFromProject = async (projectID, filename) => {
    return await instance.delete("/api/minio/project/"+projectID+"/file", {params: {'filename': filename}}).catch((error) => {
        return Promise.reject(error)
    });
}

const getAllFilesFromProject = async (projectID) => {
    return await instance.get("/api/minio/project/"+projectID+"/file").catch((error) => {
        return Promise.reject(error)
    });
}

const FileService = {
    addFileToProject,
    removeFileFromProject,
    getAllFilesFromProject,
};

export default FileService;