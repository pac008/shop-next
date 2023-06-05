import React, { useContext } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";

interface Props {
  totalProp?: number;
  subTotalProp?: number;
  numberOfItemsProp?: number;
  taxProp?: number;
}
export const OrderSymmary = ({
  totalProp,
  subTotalProp,
  numberOfItemsProp,
  taxProp,
}: Props) => {
  const {
    total: totalContext,
    subTotal: subTotalContext,
    numberOfItems: numberOfItemsContext,
    tax: taxContext,
  } = useContext(CartContext);

  const total = totalProp ? totalProp : totalContext;
  const subTotal = subTotalProp ? subTotalProp : subTotalContext;
  const numberOfItems = numberOfItemsProp
    ? numberOfItemsProp
    : numberOfItemsContext;
  const tax = taxProp ? taxProp : taxContext;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "Productos" : "Producto"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
