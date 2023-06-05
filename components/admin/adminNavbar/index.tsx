import React, { useContext } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

import { UiContext } from "@/context";

export const AdminNavbar = () => {
  const { toggleSideMenu, isMenuOpen } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <Link
          href="/"
          passHref
          style={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="h6">Teslo |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>
        <Box flex={1} />
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
