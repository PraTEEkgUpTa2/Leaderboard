import React from 'react';
import data from './data.json';
import { Container, Typography, Box, Button } from '@mui/material';
import { VisibilityOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

const StrategyItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[5],
  },
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
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

const Leaderboard = () => {
  return (
    <Container>
      <Typography variant="h3" style={{ color: '#333', marginTop: '20px', marginBottom: '20px' }}>
        Basic Backtest
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2}>
        {data.map((strategy, index) => (
          <StrategyItem key={index}>
            <Typography variant="h6" gutterBottom>
              {strategy.Name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Rank:</strong> {strategy.Rank}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Calmar Ratio:</strong> {strategy["Calmar Ratio"]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Overall Profit:</strong> {strategy["Overall Profit"]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Avg. Daily Profit:</strong> {strategy["Avg. Daily Profit"]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Win % (Day):</strong> {strategy["Win %(Day)"]}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price (Rs):</strong> {strategy["Price (Rs)"] ? strategy["Price (Rs)"] : '-'}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <ViewButton startIcon={<VisibilityOutlined />} variant="contained" sx={{ mr: 1 }}>
                View
              </ViewButton>
              <BuyButton startIcon={<AddShoppingCartOutlined />} variant="contained">
                Buy
              </BuyButton>
            </Box>
          </StrategyItem>
        ))}
      </Box>
    </Container>
  );
};

export default Leaderboard;
