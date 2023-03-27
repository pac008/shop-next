import { Box, Button } from "@mui/material";
import { FC, useState } from 'react';
import { ISize } from "../../../interfaces/products";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}
export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
    // const [selectedSize, setSelectedSize] = useState<ISize>()
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
