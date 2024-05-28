import React from 'react';
import data from './data.json';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Visibility, ShoppingCart } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
  viewButton: {
    backgroundColor: '#1976d2',
    color: 'white',
  },
  buyButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
  }
});

const Leaderboard = () => {
  const classes = useStyles();

  return (
    <Container>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Strategy Leaderboard</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="leaderboard table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Calmar Ratio</TableCell>
              <TableCell>Overall Profit</TableCell>
              <TableCell>Avg. Daily Profit</TableCell>
              <TableCell>Win % (Day)</TableCell>
              <TableCell>Price (Rs)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.Rank}>
                <TableCell>{row.Rank}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row["Calmar Ratio"]}</TableCell>
                <TableCell>{row["Overall Profit"]}</TableCell>
                <TableCell>{row["Avg. Daily Profit"]}</TableCell>
                <TableCell>{row["Win %(Day)"]}</TableCell>
                <TableCell>{row["Price (Rs)"] ? row["Price (Rs)"] : '-'}</TableCell>
                <TableCell>
                  {row.Action === 'View' ? (
                    <Button
                      className={classes.viewButton}
                      startIcon={<Visibility />}
                      variant="contained"
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      className={classes.buyButton}
                      startIcon={<ShoppingCart />}
                      variant="contained"
                    >
                      Buy
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
