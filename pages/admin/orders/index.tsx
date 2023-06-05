import React from "react";
import useSWR from "swr";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdminLayout } from "@/components/layouts";
import { IOrder, IUser } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Orden ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre Completo", width: 300 },
  { field: "total", headerName: "Monto total", width: 300 },
  {
    field: "isPaid",
    headerName: "pagada",
    width: 300,
    renderCell: ({ row }: any) => {
      return row.isPaid ? (
        <Chip variant="outlined" color="success" label="Pagada" />
      ) : (
        <Chip variant="outlined" color="error" label="Pendiente" />
      );
    },
  },
  { field: "noProducts", headerName: "No. Productos", width: 150 },
  {
    field: "check",
    headerName: "Ver orden",
    width: 300,
    renderCell: ({ row }: any) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank">
          Ver orden
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Creada en", width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  if (!data && !error) return <></>;
  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));
  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
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

export default OrdersPage;
