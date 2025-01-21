import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectService from "../services/ProjectService";

export default function AddProject() {
  const theme = useTheme();
  const navigate = useNavigate();

  // State for new project fields, generate ID and dates
  const [project, setProject] = useState({
    dateCreate: new Date().toISOString().slice(0, 16),
    name: "",
    description: "",
    dateDefense: new Date().toISOString().slice(0, 16),
  });

  // Validation state
  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setProject((prevProject) => ({ ...prevProject, [field]: value }));
  };

  // Handle adding a new project
  const handleAdd = () => {
    if (!project.name || !project.description || !project.dateDefense) {
      setError(true);
      return;
    }

    for (const key of Object.keys(project)){
      project[key] = project[key].trim()
    }
    
    ProjectService.addProject(project).then(() => {
      navigate("/", { state: { addedProject: project } });
    }).catch((error) => {
      const errors = error.response.data.errors
      for (const key of Object.keys(errors)){
          alert(key + ": "+ errors[key])
      }
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
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    dateContainer: {
      display: "flex",
      gap: theme.spacing(2),
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
          Add New Project
        </Typography>

        <Box sx={styles.inputContainer}>
          <TextField
            label="Project Name"
            value={project.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            fullWidth
            required
            error={error && !project.name}
          />
          <TextField
            label="Description"
            value={project.description}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={error && !project.description}
          />
          <Box sx={styles.dateContainer}>
            <TextField
              label="Creation Date"
              type="datetime-local"
              value={project.dateCreate}
              InputProps={{ readOnly: true, disabled: true }} // Creation Date field not clickable
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Defense Date"
              type="datetime-local"
              value={project.dateDefense}
              onChange={(e) => handleChange("dateDefense", e.target.value)}
              variant="outlined"
              fullWidth
              required
              error={error && !project.dateDefense}
              InputProps={{
                inputProps:{
                  min: project.dateCreate
                }
              }}
            />
          </Box>
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
