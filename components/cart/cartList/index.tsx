import { FC, useState, useContext } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ItemCounter } from "@/components/ui";
import { ICartProduct, IOrderItem } from "@/interfaces";
import { CartContext } from "@/context";
interface Props {
  isEditabled?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ isEditabled, products }) => {
  const { updateCartQuantity, cart, removeProductInCart } = useContext(CartContext);

  const onUpdateQuantity = (
    product: ICartProduct,
    newQuantityValue: number
  ): void => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart
  return (
    <>
      {productsToShow.map((product, i) => (
        <Grid
          container
          spacing={2}
          key={product._id + product.size}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* llevar a la pagina del producto */}
            <Link href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ borderRadius: 5 }}
                  image={product.image}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>
              {/* condicional */}
              {isEditabled ? (
                <ItemCounter
                  currentvalue={product.quantity}
                  maxValue={10}
                  index={i}
                  onUpdateQuantity={(newValue) =>
                    onUpdateQuantity(product as ICartProduct, newValue)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "Productos" : "Producto"}
                </Typography>
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
              <Button variant="text" color="secondary" onClick={() => removeProductInCart(product as ICartProduct)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
