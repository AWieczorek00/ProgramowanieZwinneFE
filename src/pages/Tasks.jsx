import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";

const Tasks = () => {
  const theme = useTheme();
  const { projectId } = useParams();

  // Sample data for tasks table
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1 name", order: 1, description: "Task 1 Description", estimatedTime: "2h" },
    { id: 2, name: "Task 2 name", order: 2, description: "Task 2 Description", estimatedTime: "3h" },
    { id: 3, name: "Task 3 name", order: 3, description: "Task 3 Description", estimatedTime: "1.5h" },
    { id: 4, name: "Task 4 name", order: 4, description: "Task 4 Description", estimatedTime: "4h" },
    { id: 5, name: "Task 5 name", order: 5, description: "Task 5 Description", estimatedTime: "1h" },
    { id: 6, name: "Task 6 name", order: 6, description: "Task 6 Description", estimatedTime: "2h" },
    { id: 7, name: "Task 7 name", order: 7, description: "Task 7 Description", estimatedTime: "1.5h" },
    { id: 8, name: "Task 8 name", order: 8, description: "Task 8 Description", estimatedTime: "3h" },
    { id: 9, name: "Task 9 name", order: 9, description: "Task 9 Description", estimatedTime: "1h" },
    { id: 10, name: "Task 10 name", order: 10, description: "Task 10 Description", estimatedTime: "1.5h" }
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter tasks based on search query
  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.estimatedTime.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

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
        <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
          <Link
            onClick={() => alert("Delete task")}
            state={{ projectData: params.row }}
            style={{ textDecoration: "none", color: theme.palette.primary.main }}
          >
            Delete
          </Link>
        </Box>
      ),
    },
  ];

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

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing(2) }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={() => alert("Add new task")}
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
            rows={filteredTasks}
            columns={columns}
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
