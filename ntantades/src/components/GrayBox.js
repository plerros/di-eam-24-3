import { Box } from "@mui/material";

export default function GrayBox({title, subtitle, actions, children}) {
  if (title || subtitle || actions) {
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
            <h3>{subtitle}</h3>
          </Box>
          {actions}
        </Box>
        {children}
      </Box>
    );
  }

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
      {children}
    </Box>
  );
}