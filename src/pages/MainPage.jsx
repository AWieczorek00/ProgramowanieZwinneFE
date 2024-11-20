import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  Button,
  TextField,
  Link as MuiLink,
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MainPage() {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("asc"); // Sorting order
  const [orderBy, setOrderBy] = useState("no"); // Column to sort by

  // Sample data for projects table
  const exampleProjects = [
    {
      no: 1,
      id: 10,
      name: "Example project 1",
      description: "Example project 1 description",
      creationDate: "2024-11-15",
      defenseDate: "2025-01-20",
    },
    {
      no: 2,
      id: 20,
      name: "Example project 2",
      description: "Example project 2 description",
      creationDate: "2024-11-16",
      defenseDate: "2025-01-21",
    },
    {
      no: 3,
      id: 30,
      name: "Example project 3",
      description: "Example project 3 description",
      creationDate: "2024-11-17",
      defenseDate: "2025-01-22",
    },
  ];

  // Handling search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered projects based on search query
  const filteredProjects = exampleProjects.filter((project) =>
    Object.values(project)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sorting function based on column and order
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort projects data
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const styles = {
    tableCell: {
      border: "1px solid #ddd",
    },
    headerCell: {
      color: theme.palette.primary.contrastText,
      border: "1px solid #ddd",
    },
    tableHeaderRow: {
      backgroundColor: theme.palette.primary.main,
    },
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
      '&:hover': {
        textDecoration: "underline",
      },
    },
    addButton: {
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    searchContainer: {
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    searchLabel: {
      fontSize: "0.875rem",
      marginRight: theme.spacing(1),
    },
    searchTextField: {
      width: "200px",
      height: "30px", 
      "& .MuiInputBase-root": {
        height: "30px",
        fontSize: "0.75rem",
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Projects Table
        </Typography>

        <Box sx={styles.searchContainer}>
          <Button
            variant="contained"
            sx={styles.addButton}
            component={Link}
            to="/addProject"
          >
            Add Project
          </Button>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={styles.searchLabel}>Search</Typography>
            <TextField
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={styles.searchTextField}
            />
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[3], borderRadius: "5px" }}>
          <Table>
            <TableHead>
              <TableRow sx={styles.tableHeaderRow}>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "no" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "no"}
                    direction={orderBy === "no" ? order : "asc"}
                    onClick={() => handleRequestSort("no")}

                  >
                    No
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "id" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    Project ID
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "name" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Project Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "description" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={orderBy === "description" ? order : "asc"}
                    onClick={() => handleRequestSort("description")}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "creationDate" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "creationDate"}
                    direction={orderBy === "creationDate" ? order : "asc"}
                    onClick={() => handleRequestSort("creationDate")}
                  >
                    Creation Date
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={styles.headerCell}
                  sortDirection={orderBy === "defenseDate" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "defenseDate"}
                    direction={orderBy === "defenseDate" ? order : "asc"}
                    onClick={() => handleRequestSort("defenseDate")}
                  >
                    Defense Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={styles.headerCell}>Settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell sx={styles.tableCell}>{project.no}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.id}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.name}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.description}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.creationDate}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.defenseDate}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    <Box sx={{ display: "flex", gap: theme.spacing(1), alignItems: "center" }}>
                      <MuiLink component={Link} to={`/editProject/${project.id}`} sx={styles.link}>
                        Edit
                      </MuiLink>
                      <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
                      <MuiLink component={Link} to={`/tasks/${project.id}`} sx={styles.link}>
                        Tasks
                      </MuiLink>
                      <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
                      <MuiLink component={Link} to={`/students/${project.id}`} sx={styles.link}>
                        Students
                      </MuiLink>
                      <Box sx={{ width: "1px", height: "1rem", backgroundColor: theme.palette.divider }} />
                      <MuiLink component={Link} to={`/deleteProject/${project.id}`} sx={styles.link}>
                        Delete
                      </MuiLink>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
