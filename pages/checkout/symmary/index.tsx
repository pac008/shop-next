import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSymmary } from "@/components/cart";

const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription="resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Dirección de entrega</Typography>
                <Link
                  href="/checkout/address"
                  style={{ textDecoration: "underline" }}
                  color="secondary"
                >
                  Editar
                </Link>
              </Box>
              
              <Typography>Miguel Herrera</Typography>
              <Typography>24 rue de la mutualite</Typography>
              <Typography>Cholet</Typography>
              <Typography>France</Typography>
              <Typography>+33 06 123 212 22</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <Link
                  href="/cart"
                  style={{ textDecoration: "underline" }}
                  color="secondary"
                >
                  Editar
                </Link>
              </Box>
              <OrderSymmary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
