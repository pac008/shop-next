import React from "react";
import { CreditCardOffOutlined } from "@mui/icons-material";
import { Grid, Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTile = ({icon, subTitle, title}: Props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: "flex" }}>
        <CardContent
          sx={{
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </CardContent>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
