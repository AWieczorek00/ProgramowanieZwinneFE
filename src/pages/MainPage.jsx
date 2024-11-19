import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useTheme } from "@mui/material";

export default function MainPage() {
  const theme = useTheme();
  
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
      marginTop: "5rem",
    },
  };

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

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Projects Table
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[3] }}>
          <Table>
            <TableHead>
              <TableRow sx={styles.tableHeaderRow}>
                <TableCell sx={styles.headerCell}>No</TableCell>
                <TableCell sx={styles.headerCell}>Project ID</TableCell>
                <TableCell sx={styles.headerCell}>Project Name</TableCell>
                <TableCell sx={styles.headerCell}>Description</TableCell>
                <TableCell sx={styles.headerCell}>Creation Date</TableCell>
                <TableCell sx={styles.headerCell}>Defense Date</TableCell>
                <TableCell sx={styles.headerCell}>Settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exampleProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell sx={styles.tableCell}>{project.no}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.id}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.name}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.description}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.creationDate}</TableCell>
                  <TableCell sx={styles.tableCell}>{project.defenseDate}</TableCell>
                  <TableCell sx={styles.tableCell}>(buttons)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}