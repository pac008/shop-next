import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { AdminLayout } from "@/components/layouts";
import { IUser } from "@/interfaces";
import { PeopleOutline } from "@mui/icons-material";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { tesloApi } from "@/apiaxios";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;
  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));
    setUsers(updatedUsers);
    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      console.log(error);
      setUsers(previousUsers);
      alert("No se pudo actualizar el role del usuario");
    }
  };
  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: any) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      icon={<PeopleOutline />}
      title="usuarios"
      subTitle="mantenimiento de usuarios"
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

export default UsersPage;
