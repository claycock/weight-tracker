import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Graph from './Graph'


export default function DataTable() {
const [isLoading, setLoading] = useState(true);
const [rows, setRows] = useState();

const [open, setOpen] = React.useState(false);
const [graphOpen, setGraphOpen] = React.useState(false);

const handleGraphOpen = () => {
  setGraphOpen(!graphOpen);
}

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const renderDeleteButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 25 }}
              onClick={handleClickOpen}
          >
          Delete
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Entry"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this entry?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => { 
              axios.post('http://192.168.99.201:4000/weights/delete/' + params.id).then(response => {
                console.log(response.data);
                setLoading(true);
              })
                window.location.reload();
                }} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

      </strong>
  )
}

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'weight_user', headerName: 'Name', width: 65 },
  { field: 'weight_date', headerName: 'Date', width: 90 },
  {
    field: 'weight_lbs',
    headerName: 'Weight',
    type: 'number',
    width: 90,
  },
  {
    field: 'delete',
    headerName: '',
    width: 150,
    renderCell: renderDeleteButton,
},
];


useEffect(() => {
    axios.get('http://192.168.99.201:4000/weights/').then(response => {
      setRows(response.data);
      setLoading(false);
    });
  }, []);

if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  
  return (
    <div style={{ height: 400, width: '100%' }}>

      <Button variant="contained" onClick={handleGraphOpen}>
        Toggle Graph
      </Button>

      <Graph name={'Chris'} open={graphOpen}/>

      <p></p>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'weight_date', sort: 'desc' }],
          },
        }}
        columnVisibilityModel={{
            // Hide columns status and traderName, the other columns will remain visible
            _id: false
          }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(r) => r._id}
        autoHeight={true}
        autoPageSize={true}
      />
    </div>
  );
}
