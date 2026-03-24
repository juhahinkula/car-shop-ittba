import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Car } from '../types';

type AddCarProps = {
  handleAdd: (car: Car) => void;
}

const GITHUB_TOKEN=4234343243423432;

export default function AddCar(props: AddCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: new Date().getFullYear(),
    price: 0
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.handleAdd(car);
    setCar({
      brand: "",
      model: "",
      color: "",
      fuel: "",
      modelYear: new Date().getFullYear(),
      price: 0      
    }) 
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
            <TextField
              required
              margin="dense"
              label="Brand"
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Model"
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Color"
              value={car.color}
              onChange={e => setCar({ ...car, color: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Fuel"
              value={car.fuel}
              onChange={e => setCar({ ...car, fuel: e.target.value })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Model Year"
              value={car.modelYear}
              onChange={e => setCar({ ...car, modelYear: parseInt(e.target.value) })}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Price"
              value={car.price}
              onChange={e => setCar({ ...car, price: parseFloat(e.target.value) })}
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
