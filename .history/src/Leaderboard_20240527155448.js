import React, { useState } from 'react';
import data from './data.json';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box, Card } from '@mui/material';
import { VisibilityOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
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

const ViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const BuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    zIndex: 1, // Increase z-index when hovered
    position: 'relative', // Add position: relative
  },
}));

const Leaderboard = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  // Prepare data for the pie chart
  const chartData = {
    labels: selectedRow ? ['Calmar Ratio', 'Overall Profit', 'Avg. Daily Profit', 'Win % (Day)', 'Price (Rs)'] : [],
    datasets: [{
      data: selectedRow ? [selectedRow["Calmar Ratio"], selectedRow["Overall Profit"], selectedRow["Avg. Daily Profit"], selectedRow["Win %(Day)"], selectedRow["Price (Rs)"]] : [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#66BB6A',
        '#FF7043'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#66BB6A',
        '#FF7043'
      ]
    }]
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" style={{ color: '#333', marginTop: '20px' }}>
          Basic Backtest
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="slippage-label">Slippage</InputLabel>
          <Select
            labelId="slippage-label"
            id="slippage-select"
            defaultValue={0}
            label="Slippage"
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={0.5}>0.5</MenuItem>
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
                  {row.Action === 'View' ? (
                    <ViewButton startIcon={<VisibilityOutlined />} variant="contained">
                      View
                    </ViewButton>
                  ) : (
                    <BuyButton startIcon={<AddShoppingCartOutlined />} variant="contained">
                      Buy
                    </BuyButton>
                  )}
                </TableCell>
              </HoverTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <Card style={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h1" gutterBottom>
            {selectedRow.Name}
          </Typography>
          <Pie data={chartData} />
        </Card>
      )}
    </Container>
  );
};

export default Leaderboard;
