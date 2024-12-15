import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditProject() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Get project data from location state
  const { projectData } = location.state || {};
  // State for project data
  const [project, setProject] = useState(projectData || {});

  // Validation
  const [error, setError] = useState(false);

  // Handle project field edit
  const handleChange = (field, value) => {
    setProject((prevProject) => ({ ...prevProject, [field]: value }));
  };

  // Save changes, go back to main page
  const handleSave = () => {
    if (!project.name || !project.description || !project.defenseDate) {
      setError(true);
      return;
    }

    navigate("/", { state: { updatedProject: project } });
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
      marginBottom: theme.spacing(3)
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem"
    },
    saveButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      width: '6rem'
    },
    cancelButton: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
      width: '6rem'
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Edit Project
        </Typography>

        <Box sx={styles.inputContainer}>
          <TextField
            label="ID"
            value={project.id || ""}
            InputProps={{ readOnly: true, disabled: true }} // ID field not clickable
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Project Name"
            value={project.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            fullWidth
            required
            error={error && !project.name}
          />
          <TextField
            label="Description"
            value={project.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={error && !project.description}
          />
          <Box>
            <TextField
              label="Defense Date"
              type="date"
              value={project.defenseDate || ""}
              onChange={(e) => handleChange("defenseDate", e.target.value)}
              variant="outlined"
              required
              error={error && !project.defenseDate}
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
            sx={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
