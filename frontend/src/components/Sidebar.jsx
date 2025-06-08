import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const llmProviders = [
  { name: "SambaNova", models: ["SN-GPT", "SN-BERT"] },
  { name: "Ollama", models: ["Llama 2", "Mistral"] },
];

const scrapingMethods = ["Selenium", "Crawl4AI"];

function Sidebar({ onStartScraping }) {
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [method, setMethod] = useState("");
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setProvider("");
    setModel("");
    setMethod("");
    setUrl("");
    setQuery("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          model,
          method,
          url,
          query,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        onStartScraping(); // Notify parent component
      } else {
        console.error("Scraping failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 320,
        bgcolor: "#0a101a",
        color: "text.primary",
        p: 3,
        minHeight: "calc(100vh - 64px - 56px)",
        borderRight: "1px solid #232b3e",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Scraper Settings
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel sx={{ color: "#e3e3e3" }}>LLM Provider</InputLabel>
        <Select
          value={provider}
          label="LLM Provider"
          onChange={(e) => {
            setProvider(e.target.value);
            setModel("");
          }}
          sx={{ color: "#fff" }}
        >
          {llmProviders.map((p) => (
            <MenuItem key={p.name} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" disabled={!provider}>
        <InputLabel sx={{ color: "#e3e3e3" }}>LLM Name</InputLabel>
        <Select
          value={model}
          label="LLM Name"
          onChange={(e) => setModel(e.target.value)}
          sx={{ color: "#fff" }}
        >
          {llmProviders
            .find((p) => p.name === provider)
            ?.models.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel sx={{ color: "#e3e3e3" }}>Scraping Method</InputLabel>
        <Select
          value={method}
          label="Scraping Method"
          onChange={(e) => setMethod(e.target.value)}
          sx={{ color: "#fff" }}
        >
          {scrapingMethods.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Website URL"
        variant="outlined"
        size="small"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ input: { color: "#fff" }, label: { color: "#e3e3e3" } }}
        fullWidth
      />
      <TextField
        label="Query"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ input: { color: "#fff" }, label: { color: "#e3e3e3" } }}
        fullWidth
        multiline
        minRows={2}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            flex: 1,
            fontWeight: 600,
            background: "linear-gradient(90deg,#007fff 0%,#0059b2 100%)",
            textTransform: "none",
          }}
          onClick={handleSubmit}
          disabled={loading || !provider || !model || !method || !url || !query}
        >
          {loading ? "Processing..." : "Start Scraping"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            flex: 1,
            borderColor: "#232b3e",
            color: "#e3e3e3",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { borderColor: "#007fff", color: "#fff" },
          }}
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </Button>
      </Stack>
    </Box>
  );
}

export default Sidebar;
