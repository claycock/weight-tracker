import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function DataTable(props) {
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState();

  const [identity, setIdentity] = React.useState('Bekah');

  const handleIdentityChange = (event) => {
    setIdentity(event.target.value);
  }

  useEffect(() => {
    axios.get('http://192.168.99.201:4000/weights/name/' + identity).then(response => {
      setRows(response.data);
      setLoading(false);
    });
  }, [identity]);

if (props.open === true) {
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  
  return (
  <div style={{ height: 500, width: '100%' }}>
  <p>Show graph for</p>
  
  <FormControl>
    <RadioGroup
    row
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
    onChange={handleIdentityChange}
    value={identity}
    >
      <FormControlLabel value="Bekah" control={<Radio />} label="Bekah" />
      <FormControlLabel value="Chris" control={<Radio />} label="Chris" />
    </RadioGroup>
  </FormControl>


  <LineChart
  width={380}
  height={380}
  data={rows}
  margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0,
  }}
  >

  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="weight_date" />
  <YAxis domain={['dataMin', 'dataMax']} />
  <Tooltip />
  <Legend />
  <Line
      type="monotone"
      dataKey="weight_lbs"
      stroke="#8884d8"
      fill="#8884d8"
      name="Weight"
  />
  </LineChart>
  <p></p>
  </div>  
  );
} else {
  return (
    <div>

    </div>
  )
}
}
