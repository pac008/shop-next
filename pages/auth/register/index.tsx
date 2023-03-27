import { AuthLayout } from "@/components/layouts/authLayout";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <AuthLayout title="Ingresa">
    <Box sx={{ width: 350, padding: "10px 20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1">
            Crear cuenta
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField label="Nombre completo" variant="filled" fullWidth />
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
            Registrarse
          </Button>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='end' mt={1} >
          <Link href="/auth/login" style={{ textDecoration: "underline" }}>
            ¿Ya tienes cuenta?
          </Link>
        </Grid>
      </Grid>
    </Box>
  </AuthLayout>
  )
}

export default RegisterPage