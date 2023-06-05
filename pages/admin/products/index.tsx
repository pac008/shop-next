import useSWR from "swr";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdminLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: any) => {
      return (
        <a target="_blank" href={`/product/${row.slug}`}>
          <CardMedia
            component="img"
            className="fadeIn"
            image={row.img}
            alt={row.title}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: any) => {
      return (
        <Link href={`/admin/products/${row.slug}`} passHref>
          {row.title}
        </Link>
      );
    },
  },
  { field: "gender", headerName: "Género Completo" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");
  if (!data && !error) return <></>;
  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));
  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle={"mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display='flex' justifyContent='end' sx={{mb:2}}>
        <Button startIcon={<AddOutlined />} color="secondary" href="/admin/products/new">
          Crear producto
        </Button>
      </Box>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}

            // rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
