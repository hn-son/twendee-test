import { useState, useEffect, useMemo } from "react";
import { getUserApi } from "../../../services/apiServices";
import { Data, Order } from "./type";
import { SelectChangeEvent } from "@mui/material";

const useUsersList = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState("5");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);

  const getUsers = async () => {
    setIsLoading(true);
    const data = await getUserApi(page, rowsPerPage);
    const users = data.map((row: any) => ({
      id: `${row.id.name + row.id.value}`,
      name: `${row.name.title} ${row.name.first} ${row.name.last}`,
      first: row.name.first,
      thumbnail: row.picture.thumbnail,
      username: row.login.username,
    }));
    setData(users);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [page, rowsPerPage]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleIncrePage = () => {
    setPage(page + 1);
  };

  const handleDcrePape = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(event.target.value as string);
    setPage(0);
  };

  const visibleRows = useMemo(() => {
    if (!!data && data.length > 0) {
      let sortData = data.sort((a: any, b: any) => {
        let fa =
            orderBy === "name"
              ? a.first.toLowerCase()
              : a.username.toLowerCase(),
          fb =
            orderBy === "name" ? b.first.toLowerCase() : b.username.toLowerCase();
        if (fa < fb) {
          return order === "asc" ? -1 : 1;
        }
        if (fa > fb) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sortData;
    } else {
      return [] as any;
    }
  }, [data, order, orderBy]);

  return {
    data,
    order,
    orderBy,
    page,
    rowsPerPage,
    handleIncrePage,
    handleDcrePape,
    handleChangeRowsPerPage,
    handleRequestSort,
    isLoading,
    visibleRows,
  };
};

export default useUsersList;
