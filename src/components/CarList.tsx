import { useState, useEffect } from "react";
import type { CarData, Car } from "../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddCar from "./AddCar";
import Stack from "@mui/material/Stack";

function CarList() {
  const [cars, setCars] = useState<CarData[]>([]);

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "color", headerName: "Color", width: 100 },
    { field: "fuel", headerName: "Fuel" },
    { field: "modelYear", headerName: "Model year" },
    { field: "price", headerName: "Price (€)" },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Button 
          color="error" 
          size="small" 
          onClick={() => handleDelete(params.id as string)}>
          Delete
        </Button>
    },        
  ]

  const getCars = () => {
    fetch(import.meta.env.VITE_API_URL + "/cars")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching cars.");

      return response.json();
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  } 

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, {
        method: "DELETE"
      })
      .then(response => {
        if (!response.ok)
          throw new Error("Error when deleting a car");

        return response.json();
      })
      .then(() => getCars())
      .catch(err => console.error(err));
    }
  }

  const handleAdd = (car: Car) => {
    fetch(import.meta.env.VITE_API_URL + "/cars", {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a car");

      return response.json();
    })
    .then(() => getCars())
    .catch(err => console.error(err));
  }

  useEffect(() => {
    getCars();
  }, []);

  return(
    <>
      <Stack direction="row" sx={{ mt: 2, mb: 2 }} >
        <AddCar handleAdd={handleAdd} />
      </Stack>
      <div style={{ width: "90%", height: 500 }}>
        <DataGrid 
          rows={cars}
          columns={columns}
          getRowId={row => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>
    </>
  );
}

export default CarList;