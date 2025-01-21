import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskService from "../services/TaskService";
import ProjectService from "../services/ProjectService";

const Tasks = () => {
  const theme = useTheme();
  const navigate = useNavigate();  // For navigation
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tasks from the backend
  const fetchTasks = (searchText = "") => {
    setLoading(true);
    TaskService.searchTask(searchText, projectId).then((response) => {
      setTasks(response.data);
    }).catch((error) => {
      alert(error.response.data.description)
    }).finally(() => {
      setLoading(false)
    })
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    ProjectService.removeTaskFromProject(projectId, taskId).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert("Task deleted successfully");
    }).catch((error) => {
      alert(error.response.data.description)
    })
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch tasks when the search query changes
  useEffect(() => {
    fetchTasks(searchQuery);
  }, [searchQuery]);

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "order", headerName: "Order", width: 100 },
    { field: "description", headerName: "Description", width: 350 },
    { field: "estimatedTime", headerName: "Estimated Time", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          onClick={() => handleDeleteTask(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Navigate to AddTask page
  const handleAddTask = () => {
    navigate(`/project/${projectId}/tasks/add`);
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
          Tasks in Project: {projectId}
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
            onClick={handleAddTask}  // Navigate to AddTask page
          >
            Add new task
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: "300px" }}
          />
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={tasks}
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

export default Tasks;
