import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "linear-gradient(90deg, #090e1a 0%, #232b3e 100%)",
        background: "linear-gradient(90deg, #090e1a 0%, #232b3e 100%)",
        boxShadow: "0 2px 8px 0 rgba(0,127,255,0.10)",
      }}
      elevation={1}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: "24px", mr: 1 }}>🤖</Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#fff",
              fontFamily: '"Hubot Sans", Roboto, Arial, sans-serif',
              letterSpacing: 1,
            }}
          >
            DataInsight
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{
              color: "#e3e3e3",
              borderColor: "#232b3e",
              background: "rgba(20,30,50,0.6)",
              mr: 1,
              px: 3,
              borderRadius: 2,
              borderWidth: 2,
              borderStyle: "solid",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                background: "#132040",
                borderColor: "#007fff",
                color: "#fff",
              },
            }}
            variant="outlined"
          >
            Login
          </Button>
          <Button
            sx={{
              color: "#fff",
              background: "linear-gradient(90deg,#007fff 0%,#0059b2 100%)",
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 2px 8px 0 rgba(0,127,255,0.15)",
              "&:hover": {
                background: "linear-gradient(90deg,#0059b2 0%,#007fff 100%)",
                boxShadow: "0 4px 16px 0 rgba(0,127,255,0.25)",
              },
            }}
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
