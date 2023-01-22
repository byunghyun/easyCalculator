import { createTheme } from '@material-ui/core/styles';
import { PaletteOptions } from '@mui/material/styles';

const primaryColor = '#8136fe';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: '#fff',
    },
    secondary: {
      main: primaryColor,
      contrastText: '#fff',
    },
  },
});
