// theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Background color for the table header
      dark: '#135fa8', // Hover color for primary buttons
    },
    error: {
      main: '#f44336', // Background color for "Buy" button
      dark: '#d32f2f', // Hover color for "Buy" button
    },
    common: {
      white: '#fff', // Text color for table header and buttons
    },
  },
});

export default theme;
