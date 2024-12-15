import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const theme = useTheme();
  const navigate = useNavigate();

  // State for new project fields, generate ID and dates
  const [project, setProject] = useState({
    id: Math.floor(Math.random() * 10000),
    creationDate: new Date().toISOString().split("T")[0],
    name: "",
    description: "",
    defenseDate: new Date().toISOString().split("T")[0],
  });

  // Validation state
  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setProject((prevProject) => ({ ...prevProject, [field]: value }));
  };

  // Handle adding a new project
  const handleAdd = () => {
    if (!project.name || !project.description || !project.defenseDate) {
      setError(true);
      return;
    }

    navigate("/", { state: { addedProject: project } });
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
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
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
            label="ID"
            value={project.id}
            InputProps={{ readOnly: true, disabled: true }} // ID field not clickable
            variant="outlined"
            fullWidth
          />
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
              type="date"
              value={project.creationDate}
              InputProps={{ readOnly: true, disabled: true }} // Creation Date field not clickable
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Defense Date"
              type="date"
              value={project.defenseDate}
              onChange={(e) => handleChange("defenseDate", e.target.value)}
              variant="outlined"
              fullWidth
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
