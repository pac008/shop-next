import { FC } from "react";
import { Typography, Grid, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ShopLayout } from "@/components/layouts";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValueGetterParams } from "@mui/x-data-grid/models";
import Link from "next/link";

const columns: GridColDef<any, any, any>[] = [
  { field: "id", headerName: "id", width: 100 },
  { field: "fullName", headerName: "Nombre completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información si está pagada la orden o no",
    width: 200,
    renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "orden",
    width: 300,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
      <Link style={{textDecoration: 'underline'}} href={`/orders/${params.row.order}`}>
        Ver orden
        
      </Link>
    ),
  },
];
const rows = [
  { id: 1, paid: false, fullName: "Miguel Herrera", order: "1" },
  { id: 2, paid: true, fullName: "Philothée Herrera", order: "2" },
  { id: 3, paid: false, fullName: "May Herrera", order: "3" },
  { id: 4, paid: true, fullName: "Andres Herrera", order: "4" },
  { id: 5, paid: false, fullName: "Juan Herrera", order: "5" },
  { id: 6, paid: false, fullName: "Graxy Herrera", order: "6" },
];

const HistoryPage: FC = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}

            // rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
