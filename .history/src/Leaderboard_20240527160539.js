import React, { useState } from 'react';
import data from './data.json';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box, Card } from '@mui/material';
import { styled } from '@mui/system';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTableCell-root': {
    color: theme.palette.common.white,
  },
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    zIndex: 1,
    position: 'relative',
  },
}));

const Leaderboard = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const getChartData = () => {
    if (!selectedRow) return null;

    return {
      labels: ['Calmar Ratio', 'Overall Profit', 'Avg. Daily Profit', 'Win % (Day)', 'Price (Rs)'],
      datasets: [{
        data: [
          selectedRow["Calmar Ratio"],
          selectedRow["Overall Profit"],
          selectedRow["Avg. Daily Profit"],
          selectedRow["Win %(Day)"],
          selectedRow["Price (Rs)"]
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#66BB6A',
          '#FF7043',
        ],
      }]
    };
  };

  return (
    <Container>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="leaderboard table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Calmar Ratio</TableCell>
              <TableCell>Overall Profit</TableCell>
              <TableCell>Avg. Daily Profit</TableCell>
              <TableCell>Win % (Day)</TableCell>
              <TableCell>Price (Rs)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((row) => (
              <HoverTableRow key={row.Rank} onClick={() => handleRowClick(row)}>
                <TableCell>{row.Rank}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row["Calmar Ratio"]}</TableCell>
                <TableCell>{row["Overall Profit"]}</TableCell>
                <TableCell>{row["Avg. Daily Profit"]}</TableCell>
                <TableCell>{row["Win %(Day)"]}</TableCell>
                <TableCell>{row["Price (Rs)"] ? row["Price (Rs)"] : '-'}</TableCell>
                <TableCell>
                  <Button variant="contained" disabled>
                    View
                  </Button>
                </TableCell>
              </HoverTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Card style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              {selectedRow.Name}
            </Typography>
            <Pie data={getChartData()} />
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default Leaderboard;
