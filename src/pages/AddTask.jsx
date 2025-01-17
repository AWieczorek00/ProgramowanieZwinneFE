import React, { useState } from "react";
import { Box, Typography, Button, TextField, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddTask() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams(); 

  // State for the new task
  const [task, setTask] = useState({
    name: "",
    description: "",
    order: 1,
    estimatedTime: "",
  });

  // Validation state
  const [error, setError] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  // Handle adding a new task
  const handleAdd = async () => {
    if (!task.name || !task.description || !task.estimatedTime) {
      setError(true);
      return;
    }

    try {
      await axios.post(`/api/project/${projectId}/task`, {
        taskName: task.name,
        taskDescription: task.description,
        taskEstimatedTime: task.estimatedTime,
      });

      alert("Task added successfully");
      navigate(`/project/${projectId}/tasks`);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  // Cancel, go back to tasks page
  const handleCancel = () => {
    navigate(`/tasks/${projectId}`);
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
          Add New Task
        </Typography>

        <Box sx={styles.inputContainer}>
          <TextField
            label="Task Name"
            value={task.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            fullWidth
            required
            error={error && !task.name}
          />
          <TextField
            label="Description"
            value={task.description}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            error={error && !task.description}
          />
          <TextField
            label="Order"
            value={task.order}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Estimated Time (hours)"
            value={task.estimatedTime}
            onChange={(e) => handleChange("estimatedTime", e.target.value)}
            variant="outlined"
            type="number"
            fullWidth
            required
            error={error && !task.estimatedTime}
          />
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
