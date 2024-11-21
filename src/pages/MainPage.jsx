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
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MainPage() {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const styles = {
    tableCell: { border: "1px solid #ddd" },
    headerCell: { color: theme.palette.primary.contrastText, border: "1px solid #ddd" },
    tableHeaderRow: { backgroundColor: theme.palette.primary.main },
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
    searchContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    paginationContainer: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
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
    tableContainer: {
      boxShadow: theme.shadows[3],
      borderRadius: "5px",
      maxHeight: "400px", // Set maximum height for scroll
      overflowY: "auto", // Enable scrolling
      scrollbarWidth: "none", // Firefox-specific property to hide scrollbar
    },
    // Custom CSS to hide scrollbar in webkit-based browsers
    tableBody: {
      "::-webkit-scrollbar": {
        display: "none", // Hides the scrollbar in webkit browsers (Chrome, Safari, Edge)
      },
    },
  };

  // Sample data for projects table
  const exampleProjects = [
    { no: 1, id: 10, name: "Example project 1", description: "Description 1", creationDate: "2024-11-15", defenseDate: "2025-01-22" },
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

  // Paginate data
  const paginatedProjects = sortedProjects.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // Handle page size change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Handle page navigation - next
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handle page navigation - previous
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Projects Table
        </Typography>

        <Box sx={styles.searchContainer}>
          <Button variant="contained" sx={styles.addButton} component={Link} to="/addProject">
            Add Project
          </Button>

          {/* Search text field */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={styles.searchLabel}>Search</Typography>
            <TextField variant="outlined" value={searchQuery} onChange={handleSearchChange} sx={styles.searchTextField} />
          </Box>

          {/* Table pagination */}
          <Box sx={styles.paginationContainer}>
            <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous
            </Button>
            <Typography variant="body2">
              Page {currentPage + 1} of {Math.ceil(sortedProjects.length / rowsPerPage)}
            </Typography>
            <Button variant="contained" onClick={handleNextPage} disabled={currentPage + 1 >= Math.ceil(sortedProjects.length / rowsPerPage)}>
              Next
            </Button>
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange} size="small">
              {[5, 10, 15].map((size) => (
                <MenuItem key={size} value={size}>
                  {size} rows
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Projects table */}
        <TableContainer component={Paper} sx={styles.tableContainer}>
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
                    ID
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
            <TableBody sx={styles.tableBody}>
              {paginatedProjects.map((project) => (
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
