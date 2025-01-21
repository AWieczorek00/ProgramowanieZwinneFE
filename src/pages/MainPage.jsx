import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import ProjectService from "../services/ProjectService";

export default function MainPage() {
  const theme = useTheme();
  const location = useLocation(); // Access location to get updated project data

  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for projects table
  const [projects, setProjects] = useState([]);

  // Check for updated project data
  useEffect(() => {
    const { updatedProject } = location.state || {};

    if (updatedProject) {
      // Update project data in row
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === updatedProject.id ? { ...proj, ...updatedProject } : proj
        )
      );
    }
  }, [location.state]);

  // Handling search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Call fetchProjects on search query change
  useEffect(() => {
    fetchProjects(searchQuery);
  }, [searchQuery]); 

  // Fetch projects based on search query
  const fetchProjects = (searchQuery) => {
    try {
      ProjectService.searchProjects(searchQuery).then((response) => {
        setProjects(response.data)
      })
    } catch (error) {
        alert(error.response.data.description)
    }
  };

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Project Name", width: 200 },
    { field: "description", headerName: "Description", width: 200, flex: 1 },
    { field: "dateCreate", headerName: "Creation Date", width: 150 },
    { field: "dateDefense", headerName: "Defense Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
          <Link
            to={`/editProject/${params.row.id}`}
            state={{ projectData: params.row }} // Pass the selected row data to the edit page
            style={{ textDecoration: "none", color: theme.palette.primary.main }}
          >
            Edit
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/tasks/${params.row.id}`} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Tasks
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/files/${params.row.id}`} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Files
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link to={`/students/${params.row.id}`} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Students
          </Link>
          <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
          <Link 
            to={`/deleteProject/${params.row.id}`} 
            state={{ projectData: params.row }} // Pass the selected row data to the delete page
            style={{ textDecoration: "none", color: theme.palette.primary.main }}
          >
            Delete
          </Link>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%", backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, }}>
      <Box sx={{ maxWidth: "75%", width: "100%", marginTop: "4rem" }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Projects Table
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing(2) }}>
          <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, "&:hover": { backgroundColor: theme.palette.primary.dark } }} component={Link} to="/addProject">
            Add Project
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: "300px" }}
          />
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={projects}
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
}
