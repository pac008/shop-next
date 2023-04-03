import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { CartContext, UiContext } from "@/context";

export const Navbar = () => {
  const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);
  const { asPath, push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: "none", sm: "block" } }} className="fadeIn" >
          <Link href="/category/men">
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Hombres
            </Button>
          </Link>

          <Link href="/category/women">
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Mujeres
            </Button>
          </Link>

          <Link href="/category/kid">
            <Button color={asPath === "/category/kid" ? "primary" : "info"}>
              Niños
            </Button>
          </Link>
        </Box>

        <Box flex={1} />
        {/* Big screen */}

        {isSearchVisible ? (
          <Input
            type="text"
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}
        {/* Small screen */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
          className="fadeIn"
        >
          <SearchOutlined />
        </IconButton>
        <Link href="/cart">
          <IconButton>
            <Badge badgeContent={numberOfItems} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
