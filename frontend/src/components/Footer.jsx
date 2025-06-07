import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#0a101a",
        color: "text.secondary",
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        borderTop: "1px solid #232b3e",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} DataInsight
      </Typography>
      <Link href="https://github.com/" target="_blank" color="inherit">
        <IconButton color="inherit" size="small">
          <GitHubIcon />
        </IconButton>
      </Link>
      <Link href="https://linkedin.com/" target="_blank" color="inherit">
        <IconButton color="inherit" size="small">
          <LinkedInIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

export default Footer;
