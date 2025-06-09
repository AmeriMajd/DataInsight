import { Box } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Main from "../components/Main";

function Home() {
  const [scrapedData, setScrapedData] = useState(null);

  const handleStartScraping = (data) => {
    console.log("Home received data:", data); // Debug log
    setScrapedData(data);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar onStartScraping={handleStartScraping} />
        <Box
          component="main"
          sx={{ flex: 1, p: 3, bgcolor: "background.default" }}
        >
          <Main scrapedData={scrapedData} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
