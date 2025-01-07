import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams, useNavigate } from "react-router-dom";

const Students = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Sample data for students table
  const [students, setStudents] = useState([
    { id: 1, name: "Name1", surname: "LastName1", email: "name1@example.com", index: "123456", stationary: true },
    { id: 2, name: "Name2", surname: "LastName2", email: "name2@example.com", index: "654321", stationary: false },
    { id: 3, name: "Name3", surname: "LastName3", email: "name3@example.com", index: "789012", stationary: true },
    { id: 4, name: "Name4", surname: "LastName4", email: "name4@example.com", index: "345678", stationary: false },
    { id: 5, name: "Name5", surname: "LastName5", email: "name5@example.com", index: "456789", stationary: false },
    { id: 6, name: "Name6", surname: "LastName6", email: "name6@example.com", index: "908576", stationary: true },
    { id: 7, name: "Name7", surname: "LastName7", email: "name7@example.com", index: "345678", stationary: true },
  ]);

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchQuery, setSearchQuery] = useState("");

  // Handling search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter students based on search query
  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.index.includes(searchQuery)
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "surname", headerName: "Surname", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "index", headerName: "Index Number", width: 150 },
    {
      field: "stationary",
      headerName: "Stationary",
      width: 130,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
          <Link
            onClick={() => alert("Delete student")}
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
          Students in Project: {projectId}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing(2) }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={() => alert("Add student")}
          >
            Add new student
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: "300px" }}
          />
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredStudents}
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

export default Students;
