import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, useTheme, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";

export default function AdminPanel() {
    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [roles, setRoles] = useState([]);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);

    // Fetch students and current user
    const fetchStudents = (searchText = "") => {
        setLoading(true);
        UserService.getUsers(searchText)
            .then((response) => {
                setStudents(
                    response.data.map((student) => ({
                        ...student,
                        role: student.role ? student.role.name : "",
                    }))
                );
            })
            .catch((err) => {
                console.error("Error fetching students:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Fetch roles
    const fetchRoles = () => {
        UserService.getAllRoles().then((response) => {
            setRoles(response.data);
        }).catch((err) => {
            console.error("Error fetching roles:", err);
        });
    };

    useEffect(() => {
        fetchStudents();
        fetchRoles();

        // Pobranie danych zalogowanego użytkownika z localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user_data"));
        if (loggedInUser) {
            setCurrentUserEmail(loggedInUser.email); // Zakładamy, że email jest przechowywany w `loggedInUser`
        }
    }, []);

    // Handle search change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        fetchStudents(event.target.value);
    };

    // Open the dialog for role editing
    const handleClickOpen = (student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    // Close the dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
    };

    // Save the role change
    const handleSave = async () => {
        if (selectedStudent) {
            try {
                // Send request to change role
                await UserService.changeRole(selectedStudent.id, selectedStudent.role);
                handleRoleChange(selectedStudent.id, selectedStudent.role);
            } catch (error) {
                console.error("Failed to update role:", error);
            }
        }
        handleClose();
    };

    // Update the role of the student in the state
    const handleRoleChange = (studentId, newRole) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, role: newRole } : student
            )
        );
    };

    // DataGrid columns
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Student Name", width: 200 },
        { field: "email", headerName: "Email", width: 200, flex: 1 },
        { field: "role", headerName: "Role", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 300,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
                    <Button
                        onClick={() => handleClickOpen(params.row)}
                        style={{ textDecoration: "none", color: theme.palette.primary.main }}
                        disabled={params.row.email === currentUserEmail} // Wyłączenie dla zalogowanego użytkownika
                    >
                        Edit
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100%",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        }}>
            <Box sx={{ maxWidth: "75%", width: "100%", marginTop: "4rem" }}>
                <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                    Users Table
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: theme.spacing(2)
                }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search users..."
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
                        pagination
                        pageSizeOptions={[10, 25, 50]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10, page: 0 } },
                        }}
                    />
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select a new role for the user.
                    </DialogContentText>
                    <Select
                        value={selectedStudent?.role || ""}
                        onChange={(e) => setSelectedStudent({ ...selectedStudent, role: e.target.value })}
                        displayEmpty
                        sx={{ minWidth: 120 }}
                        disabled={selectedStudent?.email === currentUserEmail} // Disable if editing own role
                    >
                        <MenuItem value="" disabled>Select Role</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={selectedStudent?.email === currentUserEmail}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
