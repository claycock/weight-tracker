import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from "@mui/material";


export default function DataTable() {
const [isLoading, setLoading] = useState(true);
const [rows, setRows] = useState();

const renderDeleteButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => {
                  console.log(params.id)
                  axios.post('http://192.168.99.201:4000/weights/delete/' + params.id).then(response => {
                    console.log(response.data);
                    setLoading(true);
                  })
                  window.location.reload();
              }}
          >
              Delete Entry
          </Button>
      </strong>
  )
}

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'weight_user', headerName: 'Name', width: 65 },
  { field: 'weight_date', headerName: 'Date', width: 80 },
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
      <DataGrid
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
