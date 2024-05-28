import React from 'react';
import data from './data.json';
import { Container, Typography, Box, Card, CardContent, CardHeader, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { VisibilityOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3" style={{ color: '#333' }}>
          Basic Backtest
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
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
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader title={`Rank ${item.Rank}`} />
            <CardContent>
              <Typography variant="body1">Name: {item.Name}</Typography>
              <Typography variant="body1">Calmar Ratio: {item["Calmar Ratio"]}</Typography>
              <Typography variant="body1">Overall Profit: {item["Overall Profit"]}</Typography>
              <Typography variant="body1">Avg. Daily Profit: {item["Avg. Daily Profit"]}</Typography>
              <Typography variant="body1">Win % (Day): {item["Win %(Day)"]}</Typography>
              <Typography variant="body1">Price (Rs): {item["Price (Rs)"] ? item["Price (Rs)"] : '-'}</Typography>
              <Box mt={2}>
                <Button
                  startIcon={item.Action === 'View' ? <VisibilityOutlined /> : <AddShoppingCartOutlined />}
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  {item.Action}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Leaderboard;
