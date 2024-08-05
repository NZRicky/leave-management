
import './App.css'
import Home from "./components/pages/Home";
import { Route, Routes } from 'react-router-dom';
import Create from './components/pages/LeaveRequests/Create';

function App() {
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
