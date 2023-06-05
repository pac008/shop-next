import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
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
import { CartContext } from "@/context";

const CartPage = () => {
  const {isLoaded, numberOfItems} = useContext(CartContext)
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded  && numberOfItems === 0) {
    return <></>
  }
  
  return (
    <ShopLayout
      title="Carrito - 3"
      pageDescription="carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList isEditabled />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSymmary />

              <Box sx={{ mt: 3 }}>
                <Button 
                  color="secondary" 
                  className="circular-btn" 
                  type="button"
                  href='/checkout/address'
                  fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
