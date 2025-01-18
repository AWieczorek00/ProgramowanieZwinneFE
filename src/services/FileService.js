import instance from "./AxiosService";

const addFileToProject = (projectID, formData) => {
    return instance.post("/api/minio/project/"+projectID, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

const removeFileFromProject = (projectID, filename) => {
    return instance.delete("/api/minio/project/"+projectID+"/file", {params: {'filename': filename}});
}

const getAllFilesFromProject = (projectID) => {
    return instance.get("/api/minio/project/"+projectID+"/file");
}

const FileService = {
    addFileToProject,
    removeFileFromProject,
    getAllFilesFromProject,
};

export default FileService;