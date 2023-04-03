import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface Props {
  currentvalue: number;
  onUpdateQuantity: (quantity: number, index?:number) => void;
  maxValue: number;
  index?: number;
}

export const ItemCounter: FC<Props> = ({
  currentvalue,
  onUpdateQuantity,
  maxValue,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        disabled={currentvalue <= 1}
        onClick={() => onUpdateQuantity(currentvalue-1)}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentvalue}
      </Typography>
      <IconButton
        disabled={currentvalue === maxValue}
        onClick={() => onUpdateQuantity(currentvalue+1)}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
