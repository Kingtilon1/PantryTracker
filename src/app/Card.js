import { Container, Typography, Stack } from "@mui/material";

export default function Card (){
    return (
        <div className="card-wrapper">
            <Container className="card">
                <Stack className="flex-containers">
                    <Typography variant="h3">item</Typography>
                    <Typography variant="h3">Quantity</Typography>
                    <Typography variant="h3">Remove</Typography>
                </Stack>
            </Container>
        </div>
    )
}