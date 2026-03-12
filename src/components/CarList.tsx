import { useState, useEffect } from "react";
import type { CarData } from "../types";
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";

function CarList() {
  const [cars, setCars] = useState<CarData[]>([]);

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "color", headerName: "Color", width: 100 },
    { field: "fuel", headerName: "Fuel" },
    { field: "modelYear", headerName: "Model year" },
    { field: "price", headerName: "Price (€)" },        
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

  useEffect(() => {
    getCars();
  }, []);

  return(
    <>
      <div style={{ width: "90%", height: 500 }}>
        <DataGrid 
          rows={cars}
          columns={columns}
          getRowId={row => row._links.self.href}
          autoPageSize
        />
      </div>
    </>
  );
}

export default CarList;