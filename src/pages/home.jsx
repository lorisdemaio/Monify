import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../index.css';

import logo from '/logo.png';

// layout components
import Section from '../layout/section';

export default function Home() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) 
    {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success")
        {
            const utente = jwtDecode(data.token);
            localStorage.setItem("utente", JSON.stringify(utente));
            localStorage.setItem("token", data.token);
            toast.success(data.mex);
            navigate("/dashboard");
        }
        else toast.error(data.mex);
    });
  }

  return (
    <>
      <Section
        height = "100dvh"
        width = "100%"
        display = "flex"
        flexDirection = "column"
        justifyContent = "center"
        alignItems = "center"
        bg = "#080808"
      >
        <div className='content'>
          <img 
            src={logo}
            alt='logo'
            loading='lazy'
            draggable='false'
            className='size-[150px]'
          />

          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor='email'>Email</label>
              <input 
                type='email' 
                id='email' 
                name='email' 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input 
                type='password' 
                id='password' 
                name='password' 
                placeholder='Enter your password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <p className='text-center' style={{marginTop: '10px'}}>
                <Link to='/' className='text-blue-500 underline'>
                   Hai bisonto di aiuto?
                </Link>
              </p>
            </div>
            <div className='flex flex-col gap-3' style={{marginTop: '10px'}}>
              <button type='submit' className='btn'>
               Accedi
              </button>
              <Link className='btn' to="/register">
                Registrati
              </Link>
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}