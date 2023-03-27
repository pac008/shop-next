import { ShopLayout } from "@/components/layouts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vacío"
      pageDescription="No hay articulos en el carrito de compras"
    >
      <Box
        display="flex"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito está vacío</Typography>
          <Link href="/">
            <Typography variant="h4" color="secondary">
              Regresar
            </Typography>
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
