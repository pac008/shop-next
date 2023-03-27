import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { initialData } from "@/database/products";
import { ItemCounter } from "@/components/ui";

interface Props {}

const productsInCart = [
  initialData.products[0],
  initialData.products[5],
  initialData.products[2],
];

interface Props {
  isEditabled?: boolean;
}

export const CartList: FC<Props> = ({ isEditabled }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* llevar a la pagina del producto */}
            <Link href="/product/slug">
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ borderRadius: 5 }}
                  image={`/products/${product.images[0]}`}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>
              {/* condicional */}
              {isEditabled ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">3 items</Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {/* editable */}
            {isEditabled && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
