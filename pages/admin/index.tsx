import useSWR from "swr";
import { SummaryTile } from "@/components/admin";
import { AdminLayout } from "@/components/layouts";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { DashboardSummaryResponse } from "@/interfaces";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    { refreshInterval: 30 * 1000 }
  );
  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la info</Typography>;
  }
  const {
    numberOfOrders,
    paidOrders,
    noPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          icon={<CreditCardOutlined sx={{ fontSize: 40 }} color="secondary" />}
          title={numberOfOrders}
          subTitle="Ordenes totales"
        />
        <SummaryTile
          icon={<AttachMoneyOutlined sx={{ fontSize: 40 }} color="success" />}
          title={paidOrders}
          subTitle="Ordenes pagadas"
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          title={noPaidOrders}
          subTitle="Ordenes pendientes"
        />
        <SummaryTile
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          title={numberOfClients}
          subTitle="Clientes"
        />
        <SummaryTile
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          title={numberOfProducts}
          subTitle="Productos"
        />
        <SummaryTile
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
          title={productsWithNoInventory}
          subTitle="Productos sin existencia"
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined
              color="error"
              sx={{ fontSize: 40 }}
            />
          }
          title={lowInventory}
          subTitle="Bajo inventario"
        />
        <SummaryTile
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
          title={refreshIn}
          subTitle="Actualización en: "
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
