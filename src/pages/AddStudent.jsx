import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Select, MenuItem, InputLabel, FormControl, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    if (!selectedStudent) {
      setError(true);
      return;
    }

    try {
      await axios.post(`/api/project/${projectId}/user/${selectedStudent}`);
      alert("Student added successfully");
      navigate(`/students/${projectId}`); // Redirect to the Students page after adding the student
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  const handleCancel = () => {
    navigate(`/students/${projectId}`);
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
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "2rem"
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
          Add Student to Project: {projectId}
        </Typography>

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
            onClick={handleAddStudent}
          >
            Add
          </Button>
        </Box>

        <Box sx={styles.inputContainer}>
          <FormControl fullWidth required error={error && !selectedStudent}>
            <InputLabel>Student</InputLabel>
            <Select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              label="Student"
              size="large"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name} {student.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
