import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const Main = ({ scrapedData }) => {
  console.log("Main received data:", scrapedData); // Debug log

  const handleDownload = (format) => {
    if (!scrapedData) return;

    const { csvBlob, jsonBlob, excelBlob } = scrapedData;
    const blobs = {
      csv: csvBlob,
      json: jsonBlob,
      excel: excelBlob,
    };

    const blob = blobs[format];
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scraped-data.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 4 }}>
      {!scrapedData ? (
        // Initial state - showing waiting message
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Can't wait to extract insights for you!
          </Typography>
          <Box sx={{ fontSize: "64px", animation: "bounce 2s infinite" }}>
            🤖
          </Box>
        </Box>
      ) : (
        // Data received - showing preview and download options
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Preview (First 5 Rows)
          </Typography>
          {scrapedData.preview && scrapedData.preview.length > 0 && (
            <TableContainer
              component={Paper}
              sx={{ mb: 4, bgcolor: "#132040" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(scrapedData.preview[0] || {}).map((key) => (
                      <TableCell
                        key={key}
                        sx={{ fontWeight: 600, color: "#fff" }}
                      >
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scrapedData.preview.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((value, i) => (
                        <TableCell key={i} sx={{ color: "#e3e3e3" }}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            {["csv", "json", "excel"].map((format) => (
              <Button
                key={format}
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload(format)}
                sx={{
                  bgcolor: "#132040",
                  "&:hover": { bgcolor: "#1a2b4d" },
                  textTransform: "uppercase",
                }}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Main;
