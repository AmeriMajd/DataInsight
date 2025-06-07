import { Box, Typography } from "@mui/material";

const Main = ({ isCleared }) => {
  return (
    <>
      <style>
        {`
          @keyframes hover {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .robot {
            font-size: 50px;
            animation: hover 2s ease-in-out infinite;
            display: inline-block;
          }
        `}
      </style>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          p: 4,
        }}
      >
        {!isCleared ? (
          <>
            <Box sx={{ mb: 4 }}>
              <div className="robot">🤖</div>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Main;
