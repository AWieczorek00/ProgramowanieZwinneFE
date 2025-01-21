import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import FileService from "../services/FileService";

const Files = () => {
  const theme = useTheme();
  const navigate = useNavigate();  // For navigation
  const { projectId } = useParams();

  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch files from the backend
  const fetchFiles = (searchText = "") => {
    setLoading(true);
    FileService.getAllFilesFromProject(projectId).then((response) => {
      setFiles(response.data);
    }).catch((error) => {
      alert(error.response.data.description)
    }).finally(() => {
      setLoading(false)
    })
  };

  // Handle files deletion
  const handleDeleteFiles = (filename) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    FileService.removeFileFromProject(projectId, filename).then(() => {
      setFiles((prevFiles) => prevFiles.filter((file) => file.filename !== filename));
      alert("File deleted successfully");
    }).catch((error) => {
      alert(error.response.data.description)
    })
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch files when the search query changes
  useEffect(() => {
    fetchFiles(searchQuery);
  }, [searchQuery]);

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "filename", headerName: "File Name", width: 250 },
    { 
        field: "url", 
        headerName: "URL", 
        width: 100,
        renderCell: (params) => (
            <Button
            variant="text"
            color="error"
            onClick={() => window.open(params.row.url, '_blank', 'noopener,noreferrer')}
          >
            Pobierz plik
          </Button>)
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          onClick={() => {
            handleDeleteFiles(params.row.filename)
          }}
        >
          Delete
        </Button>
      ),
    },
    
  ];

  // Navigate to AddFile page
  const handleAddFiles = () => {
    navigate(`/project/${projectId}/files/add`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ maxWidth: "75%", width: "100%", marginTop: "4rem" }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Files in Project: {projectId}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(2),
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={handleAddFiles}  // Navigate to AddFile page
          >
            Add new file
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search files..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: "300px" }}
          />
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={files}
            columns={columns}
            loading={loading}
            pagination
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Files;
