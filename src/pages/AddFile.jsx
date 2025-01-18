import React, { useState } from "react";
import { Box, Typography, Button, TextField, useTheme, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FileService from "../services/FileService";

export default function AddFile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams(); 


  // State for the new file
  const [file, setFile] = useState({
    data: ""
  });

  // Validation state
  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setFile((prevFile) => ({ ...prevFile, [field]: value }));
  };

  // Handle adding a new file
  const handleAdd = () => {
    if (!file.data) {
      setError(true);
      return;
    }
    const formData = new FormData();

    formData.append("file", file.data)

    FileService.addFileToProject(projectId, formData).then((response) => {
      alert("File added successfully");
      navigate(`/files/${projectId}`);
    }).catch((err) => {
      console.error("Error adding file:", err);
      alert("Failed to add file");
    })
  };

  // Cancel, go back to files page
  const handleCancel = () => {
    navigate(`/files/${projectId}`);
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100%",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      paddingTop: "4rem",
    },
    innerBox: {
      maxWidth: "50%",
      width: "100%",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
    },
    addButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      width: "6rem",
    },
    cancelButton: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.grey[700],
      },
      width: "6rem",
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Add New File
        </Typography>

        <Box sx={styles.inputContainer}>
        <Button
            variant="contained"
            component="label">
            Upload file
            <input type={'file'} hidden onChange={(e) => handleChange("data", e.target.files[0])}></input>
        </Button>
        <InputLabel>File name {file.data.name}</InputLabel>
        <br></br>
        </Box>

        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            sx={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={styles.addButton}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
