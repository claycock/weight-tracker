import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

export default function WeightDialog() {
  const [open, setOpen] = React.useState(false);
  const [identity, setIdentity] = React.useState('');
  const [weight, setWeight] = React.useState(0);

  const handleIdentityChange = (event) => {
    console.log(event.target.value);
    setIdentity(event.target.value);
  }

  const handleWeightChange = (event) => {
    console.log(event.target.value);
    setWeight(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitWeight = (user, weight) => {
    const newWeight = {
      weight_user: user,
      weight_date: (new Date(Date.now())).toJSON(),
      weight_lbs: weight
    }


      axios.post('http://192.168.99.201:4000/weights/add', newWeight)
        .then(res => console.log(res.data));
    setOpen(false);
  }
  

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Weight
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add weight for today</DialogTitle>
        <DialogContent>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Who are you?</FormLabel>
            <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleIdentityChange}
            >
              <FormControlLabel value="bekah" control={<Radio />} label="Bekah" />
              <FormControlLabel value="chris" control={<Radio />} label="Chris" />
            </RadioGroup>
          </FormControl>


          <TextField
            autoFocus
            margin="dense"
            id="weight"
            label="Weight"
            fullWidth
            variant="standard"
            onChange={handleWeightChange}
            inputProps={{ inputMode: 'decimal' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { 
            submitWeight(identity, weight);
            window.location.reload();
            }}>Save Weight</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
