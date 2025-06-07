import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#007fff",
    },
    background: {
      default: "#090e1a",
      paper: "#1a2233",
    },
    text: {
      primary: "#fff",
      secondary: "#e3e3e3",
    },
  },
  typography: {
    fontFamily: '"Hubot Sans", Roboto, Arial, sans-serif',
  },
});

export default theme;
