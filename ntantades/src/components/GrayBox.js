import { Box } from "@mui/material";

export default function GrayBox({title, actions, children}) {
  return (
    <Box
      sx = {{
        display: 'flex',
        bgcolor: '#F0F0F0',
        borderRadius: 1,
        flexDirection: 'column',
        p: 2,
        gap: 2
      }}
    >
      <Box
        sx = {{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Box flexGrow={1}>
          <h1>{title}</h1>
        </Box>
        {actions}
      </Box>
      {children}
    </Box>
  );
}