import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h4" color="error">
            Status Code: {state.error.status}
          </Typography>
          <Typography variant="h3" color="error" gutterBottom>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="h4">Stack Trace</Typography>
          <Typography>
            {state.error.detail || "internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => history.push("/catalog")}>Go Back To Store</Button>
    </Container>
  );
}
