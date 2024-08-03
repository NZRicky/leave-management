import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home";
import { Route, Routes } from 'react-router-dom';
import Create from './Pages/LeaveRequests/Create';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="leave-requests/create" element={<Create />} />
      </Routes>
    </>
  )
}

export default App
