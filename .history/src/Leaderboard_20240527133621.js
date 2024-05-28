import React from 'react';
import data from './data.json';
import { Container, Typography, Box, Button } from '@mui/material';
import { VisibilityOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

const StrategyItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 8px 12px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)`,
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

const Leaderboard = () => {
  return (
    <Container>
      <Typography variant="h3" style={{ color: '#333', marginTop: '20px', marginBottom: '20px' }}>
        Basic Backtest
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
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
            <Box display="flex" justifyContent="center" marginTop="16px">
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
