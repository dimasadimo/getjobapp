import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import JobDetails from './components/JobDetails';
import JobList from './components/JobList';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <div >
        <NavBar setUser={setUser}/>
        <Routes>
          <Route path='/' element={!user ? <Navigate to="/login"/> : <JobList />}/>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path='/jobs/:id' element={!user ? <Navigate to="/login"/> : <JobDetails />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
