import './App.css';
import DataTable from './Components/Table'
import WeightDialog from './Components/AddWeightDialog'
import React from 'react';

function App() {
  return (
    <div className="App">
      <p></p>
      <WeightDialog></WeightDialog>
      <p></p>

      
      <DataTable></DataTable>

    </div>
  );
}

export default App;
