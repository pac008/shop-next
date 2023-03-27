import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSymmary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$105.33</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$18.43</Typography>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid
        item
        xs={6}
       
        display="flex"
        justifyContent="end"
        sx={{ mt: 2 }}
      >
        <Typography  variant="subtitle1">$188.43</Typography>
      </Grid>
    </Grid>
  );
};
