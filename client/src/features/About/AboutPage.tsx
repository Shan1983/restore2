import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    function getValidationError() {
        agent.TestErrors.getValidationError()
        .then(() => console.log('not see this'))
        .catch(e => setValidationErrors(e))
    }
    
    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test Bad Request</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error=> console.log(error))}>Test Unauthorized Request</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test Not Found Request</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test Server Error Request</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error Request</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(e => (
                            <ListItem key={e}>
                                <ListItemText>{e}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
} 