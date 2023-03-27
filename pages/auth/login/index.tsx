import { AuthLayout } from "@/components/layouts/authLayout";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <AuthLayout title="Ingresa">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesión
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='end' mt={1}>
            <Link href="/auth/register" style={{ textDecoration: "underline" }}>
              ¿No tienes cuenta?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
