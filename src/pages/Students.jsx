import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Students = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 
  const { projectId } = useParams();

  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch students from the backend
  const fetchStudents = async (searchText = "") => {
    setLoading(true);
    try {
      const response = await axios.get("/api/students", {
        params: {
          projectId,
          search: searchText,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle student deletion
  const handleDeleteStudent = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this student?")) return;

    try {
      await axios.delete(`/api/project/${projectId}/user/${userId}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== userId)
      );
      alert("Student removed successfully");
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Failed to remove student");
    }
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch students when searchQuery changes
  useEffect(() => {
    fetchStudents(searchQuery);
  }, [searchQuery]);

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
        <Button
          variant="text"
          color="error"
          onClick={() => handleDeleteStudent(params.row.id)}
        >
          Remove
        </Button>
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
            onClick={() => navigate(`/students/${projectId}/add`)}
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
            rows={students}
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

export default Students;
