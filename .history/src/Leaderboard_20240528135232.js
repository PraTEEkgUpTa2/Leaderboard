import React, { useState } from 'react';
import data from './data.json';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Button } from '@mui/material';
import { VisibilityOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TabContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '20px',
}));

const Tab = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
    zIndex: 1,
    position: 'relative',
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

const ChartCard = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  padding: '20px',
  boxShadow: theme.shadows[3],
}));

const Leaderboard = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
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
      <TabContainer>
      <Box flexBasis="10%">
              <Typography variant="h6">Rank</Typography>
            </Box>
            <Box flexBasis="15%">
              <Typography variant="h6">Name</Typography>
            </Box>
        {data.map((row) => (
          <Tab key={row.Rank} onClick={() => handleRowClick(row)}>
            <Box flexBasis="10%">
              <Typography variant="h6">{row.Rank}</Typography>
            </Box>
            <Box flexBasis="15%">
              <Typography variant="h6">{row.Name}</Typography>
            </Box>
            <Box flexBasis="15%">
              <Typography variant="h6">{row["Calmar Ratio"]}</Typography>
            </Box>
            <Box flexBasis="15%">
              <Typography variant="h6">{row["Overall Profit"]}</Typography>
            </Box>
            <Box flexBasis="15%">
              <Typography variant="h6">{row["Avg. Daily Profit"]}</Typography>
            </Box>
            <Box flexBasis="10%">
              <Typography variant="h6">{row["Win %(Day)"]}</Typography>
            </Box>
            <Box flexBasis="10%">
              <Typography variant="h6">{row["Price (Rs)"] ? row["Price (Rs)"] : '-'}</Typography>
            </Box>
            <Box flexBasis="10%">
              {row.Action === 'View' ? (
                <ViewButton startIcon={<VisibilityOutlined />} variant="contained">
                  View
                </ViewButton>
              ) : (
                <BuyButton startIcon={<AddShoppingCartOutlined />} variant="contained">
                  Buy
                </BuyButton>
              )}
            </Box>
          </Tab>
        ))}
      </TabContainer>
      {selectedRow && (
        <ChartCard>
          <Typography variant="h6">{selectedRow.Name}</Typography>
          <Line
            data={{
              labels: ['Calmar Ratio', 'Overall Profit', 'Avg. Daily Profit', 'Win % (Day)', 'Price (Rs)'],
              datasets: [
                {
                  label: selectedRow.Name,
                  data: [
                    selectedRow['Calmar Ratio'],
                    selectedRow['Overall Profit'],
                    selectedRow['Avg. Daily Profit'],
                    selectedRow['Win %(Day)'],
                    selectedRow['Price (Rs)'],
                  ],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF7043'],
                  borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF7043'],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </ChartCard>
      )}
    </Container>
  );
};

export default Leaderboard;
