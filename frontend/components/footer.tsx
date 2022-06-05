import { Box, Container, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box bgcolor="primary.main" sx={{ p: 1 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" display="block" style={{ color: "white" }} gutterBottom>
            @ {new Date().getFullYear()} osaguild.com
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}