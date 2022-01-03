import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography align="center" gutterBottom variant="h3">
        Oops - could not find that product
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Back to catalog
      </Button>
    </Container>
  );
}
