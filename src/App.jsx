import { Route, Routes, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './index.css';

// pages
import Home from './pages/home';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Account from './pages/account';
import Goals from './pages/goals';
import Entrate from './pages/entrate';
import Uscite from './pages/uscite';
import InfoGoal from './pages/infoGoal';

// components
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/protectedRoute'
import Load from './components/load';

// layout components
import Banner from './layout/banner';

// hook
import useTokenExpiration from './hook/tokenExpiration';
import { UserProvider } from './hook/userData';

export default function App() {

  // check token
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("utente"));
  let tokenExpire;

  if(token)
  {
    tokenExpire = token.exp;
  }

  useTokenExpiration(tokenExpire, () => {
    alert("Sessione scaduta. Effettua nuovamente il login.");
    localStorage.clear();
    navigate("/");
  })

  return (
    <>
      <UserProvider>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path='/goals' element={<ProtectedRoute><Goals /></ProtectedRoute>} />
            <Route path='/entrate' element={<ProtectedRoute><Entrate /></ProtectedRoute>} />
            <Route path='/uscite' element={<ProtectedRoute><Uscite /></ProtectedRoute>} />
            <Route path='/infogoal/:id' element={<ProtectedRoute><InfoGoal /></ProtectedRoute>} />
          </Routes>

          <ToastContainer 
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            draggable
            theme="dark"
          />

          <Load />
          <Banner />
        </main>

        <footer>
          <Footer />
        </footer>
      </UserProvider>
    </>
  )
}