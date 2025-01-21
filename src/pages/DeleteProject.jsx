import React from "react";
import { Box, Typography, Button, TextField, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectService from "../services/ProjectService";

export default function DeleteProject(){
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // Get project data from the main page
    const { projectData } = location.state || {};

    // Delete project, go back to main page
    const handleDelete = () => {
      ProjectService.deleteProject(projectData.id).then(() => {
        navigate("/", { state: { deletedProjectId: projectData.id } });
      }).catch((error) => {
        alert(error.response.data.description)
      })
    };

    // Cancel, go back to main page
    const handleCancel = () => {
        navigate("/");
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
    dateContainer: {
        display: "flex",
        gap: theme.spacing(2),
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    deleteButton: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
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
    field: {
      marginBottom: theme.spacing(2),
    },
  };

    return (
        <Box sx={styles.container}>
        <Box sx={styles.innerBox}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Are you sure you want to delete the following project? This action cannot be undone.
          </Typography>
  
          {/* Project Data */}
          <TextField
            label="Project ID"
            value={projectData.id}
            variant="outlined"
            InputProps={{ readOnly: true, disabled: true }}
            fullWidth
            sx={styles.field}
          />
          <TextField
            label="Project Name"
            value={projectData.name}
            variant="outlined"
            InputProps={{ readOnly: true, disabled: true }}
            fullWidth
            sx={styles.field}
          />
          <TextField
            label="Description"
            value={projectData.description}
            variant="outlined"
            multiline
            rows={3}
            InputProps={{ readOnly: true, disabled: true }}
            fullWidth
            sx={styles.field}
          />
          <Box sx={styles.dateContainer}>
            <TextField
                label="Creation Date"
                value={projectData.dateCreate.slice(0,16)}
                variant="outlined"
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
                sx={styles.field}
            />
            <TextField
                label="Defense Date"
                value={projectData.dateDefense.slice(0,16)}
                variant="outlined"
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
                sx={styles.field}
            />
          </Box>
  
          <Box sx={styles.buttonContainer}>
            <Button variant="contained" sx={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" sx={styles.deleteButton} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    );
}

