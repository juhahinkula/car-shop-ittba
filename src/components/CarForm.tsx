import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import type { Car } from "../types"

type CarFormType = {
  car: Car;
  setCar: React.Dispatch<React.SetStateAction<Car>>;
}

export default function CarForm(props: CarFormType) {
  return(
        <DialogContent>
            <TextField
              required
              margin="dense"
              label="Brand"
              value={props.car.brand}
              onChange={e => props.setCar({ ...props.car, brand: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Model"
              value={props.car.model}
              onChange={e => props.setCar({ ...props.car, model: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Color"
              value={props.car.color}
              onChange={e => props.setCar({ ...props.car, color: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Fuel"
              value={props.car.fuel}
              onChange={e => props.setCar({ ...props.car, fuel: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Model Year"
              value={props.car.modelYear}
              onChange={e => props.setCar({ ...props.car, modelYear: parseInt(e.target.value) })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Price"
              value={props.car.price}
              onChange={e => props.setCar({ ...props.car, price: parseFloat(e.target.value) })}
              fullWidth
              variant="standard"
            />
        </DialogContent>
  )
}