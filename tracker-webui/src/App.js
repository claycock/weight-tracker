import './App.css';
import DataTable from './Components/Table'
import WeightDialog from './Components/AddWeightDialog'
import Graph from './Components/Graph'
import React from 'react';



function App() {

  return (
    <div className="App">
      <p></p>
      <WeightDialog></WeightDialog>

      <p></p>
      <DataTable></DataTable>
      <p></p>
      <span>&nbsp;&nbsp;</span>
    </div>
  );
}

export default App;
