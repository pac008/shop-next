import { FC, useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Typography, Grid, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from "@mui/x-data-grid/models";
import { ShopLayout } from "@/components/layouts";
import { getSession } from "next-auth/react";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";

const columns: GridColDef<any, any, any>[] = [
  { field: "id", headerName: "id", width: 100 },
  { field: "fullName", headerName: "Nombre completo", width: 300 },
  {
    field: "isPaid",
    headerName: "Pagada",
    description: "Muestra información si está pagada la orden o no",
    width: 200,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => {
      return params.row.isPaid ? (
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
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => (
      <Link
        style={{ textDecoration: "underline" }}
        href={`/orders/${params.row.orderId}`}
      >
        Ver orden
      </Link>
    ),
  },
];
// const rows = [
//   { id: 1, paid: false, fullName: "Miguel Herrera", order: "1" },
//   { id: 2, paid: true, fullName: "Philothée Herrera", order: "2" },
//   { id: 3, paid: false, fullName: "May Herrera", order: "3" },
//   { id: 4, paid: true, fullName: "Andres Herrera", order: "4" },
//   { id: 5, paid: false, fullName: "Juan Herrera", order: "5" },
//   { id: 6, paid: false, fullName: "Graxy Herrera", order: "6" },
// ];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = useMemo(
    () =>
      orders.map(({ isPaid, _id, shippingAddress }, i) => ({
        id: i + 1,
        orderId: _id,
        isPaid,
        fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      })),
    [orders]
  );

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
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
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
