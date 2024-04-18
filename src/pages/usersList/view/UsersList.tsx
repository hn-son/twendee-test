import React, { CSSProperties } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TableFooter,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import useUsersList from "../hooks/useUsersList";
import { HeadCell, Data, Order } from "../hooks/type";
import ClipLoader from "react-spinners/ClipLoader";

const headCells: readonly HeadCell[] = [
  {
    id: "first",
    label: "Full Name",
  },
  {
    id: "username",
    label: "Username",
  },
  {
    id: "thumbnail",
    label: "Thumbnail Icon",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const UsersList = () => {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    handleIncrePage,
    handleDcrePape,
    handleChangeRowsPerPage,
    handleRequestSort,
    isLoading,
    visibleRows,
  } = useUsersList();

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader
            color={"#a69c9c"}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            loading={isLoading}
          />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows?.map((row: Data, index: number) => (
                  <TableRow hover key={index}>
                    <TableCell
                      component="th"
                      id={`${index}`}
                      scope="row"
                      padding="normal"
                    >
                      {row?.name || ""}
                    </TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">
                      <img src={row.thumbnail} alt="" />
                    </TableCell>
                  </TableRow>
                )) || ""}
              </TableBody>
              <TableFooter>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Rows per page
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={rowsPerPage}
                      label="Rows per page"
                      onChange={handleChangeRowsPerPage}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography>Current page: {page + 1}</Typography>
                  <Button
                    variant="text"
                    onClick={handleDcrePape}
                    disabled={page === 0}
                  >
                    Prev
                  </Button>
                  <Button variant="text" onClick={handleIncrePage}>
                    Next
                  </Button>
                </Box>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default UsersList;
