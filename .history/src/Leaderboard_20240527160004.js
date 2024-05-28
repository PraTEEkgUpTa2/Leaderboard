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

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const getChartData = () => {
    const labels = [];
    const dataValues = [];
    const backgroundColors = [];
    const hoverBackgroundColors = [];
    
    if (selectedRow) {
      for (const [key, value] of Object.entries(selectedRow)) {
        if (key !== 'Rank' && key !== 'Name' && key !== 'Action') {
          labels.push(key);
          dataValues.push(value);
          const color = generateRandomColor();
          backgroundColors.push(color);
          hoverBackgroundColors.push(color);
        }
      }
    }

    return {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
        <Card style={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {selectedRow.Name}
          </Typography>
          <Pie data={getChartData()} options={chartOptions} />
        </Card>
      )}
    </Container>
  );
};

export default Leaderboard;
