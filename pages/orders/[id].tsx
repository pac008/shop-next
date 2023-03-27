import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSymmary } from "@/components/cart";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

interface Props {}

const OrderPage: FC<Props> = () => {
  return (
    <ShopLayout
      title="Resumen de la orden abc123"
      pageDescription="resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden abc123
      </Typography>
      <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

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
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
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
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
