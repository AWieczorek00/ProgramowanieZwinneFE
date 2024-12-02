import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export default function MainPage() {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100%",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    innerBox: {
      maxWidth: "75%",
      width: "100%",
      marginTop: "4rem",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      "&:hover": {
        textDecoration: "underline",
      },
    },
    addButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    controlsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    searchBox: {
      width: "300px",
    },
  };

  // Sample data for projects table
  const exampleProjects = [
    { no: 1, id: 10, name: "Example project 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mauris lorem, ultrices vitae erat vel, mattis eleifend purus. Nulla sodales urna elit, id bibendum erat viverra ac. In laoreet auctor enim, sed lobortis quam ullamcorper semper.", creationDate: "2024-11-15", defenseDate: "2025-01-22" },
    { no: 2, id: 20, name: "Example project 2", description: "Description 2", creationDate: "2024-11-16", defenseDate: "2025-01-21" },
    { no: 3, id: 30, name: "Example project 3", description: "Description 3", creationDate: "2024-11-17", defenseDate: "2025-02-10" },
    { no: 4, id: 40, name: "Example project 4", description: "Description 4", creationDate: "2024-11-18", defenseDate: "2025-01-23" },
    { no: 5, id: 50, name: "Example project 5", description: "Description 5", creationDate: "2024-10-19", defenseDate: "2025-01-15" },
    { no: 6, id: 60, name: "Example project 6", description: "Description 6", creationDate: "2024-11-20", defenseDate: "2025-02-25" },
    { no: 7, id: 70, name: "Example project 7", description: "Description 7", creationDate: "2024-12-20", defenseDate: "2025-01-25" },
    { no: 8, id: 80, name: "Example project 8", description: "Description 8", creationDate: "2024-11-28", defenseDate: "2025-01-28" },
  ];

  // Handling search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering projects based on search query
  const filteredProjects = exampleProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return Object.values(project).some((value) =>
      value.toString().toLowerCase().includes(query)
    );
  });

  // DataGrid columns
  const columns = [
    { field: "no", headerName: "No", width: 70 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Project Name", width: 200 },
    { field: "description", headerName: "Description", width: 200, flex: 1 },
    { field: "creationDate", headerName: "Creation Date", width: 150 },
    { field: "defenseDate", headerName: "Defense Date", width: 150 },
    {
      field: "settings",
      headerName: "Settings",
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
          <Link to={`/editProject/${params.row.id}`} style={styles.link}>
            Edit
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/tasks/${params.row.id}`} style={styles.link}>
            Tasks
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/students/${params.row.id}`} style={styles.link}>
            Students
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/deleteProject/${params.row.id}`} style={styles.link}>
            Delete
          </Link>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Projects Table
        </Typography>

        <Box sx={styles.controlsContainer}>
          {/* Add Project Button */}
          <Button variant="contained" sx={styles.addButton} component={Link} to="/addProject">
            Add Project
          </Button>
          
          {/* Search Box */}
          <TextField
            variant="outlined"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={styles.searchBox}
          />
        </Box>

        {/* Projects DataGrid */}
        <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredProjects}
          columns={columns}
          pagination // Pagination enabled
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
        </Box>
      </Box>
    </Box>
  );
}
