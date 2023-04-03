import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { IProduct } from "@/interfaces";
import { dbProducts } from "@/database";

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
}

export default function SearchPage({ products, query, foundProducts }: Props) {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Encuentra los mejores productos de teslo aqui"
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography
          variant="h2"
          component="h2"
          textTransform="capitalize"
          sx={{ mb: 1 }}
        >
          Término: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant="h2"
            color="secondary"
            textTransform="capitalize"
            sx={{ mb: 1, ml: 1 }}
          >
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };
  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;
  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }
  return {
    props: {
      products,
      query,
      foundProducts,
    },
  };
};
