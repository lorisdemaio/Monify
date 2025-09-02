import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import '../index.css';

import logo from '/logo.png';

// layout components
import Section from '../layout/section';

export default function Register() {
    
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
          body: JSON.stringify({ nome, cognome, email, password })
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === "success")
          {
              navigate("/");
              toast.success(data.mex);
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

          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor='nome'>Nome</label>
              <input 
                type='nome' 
                id='nome' 
                name='nome' 
                placeholder='Enter your name' 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='cognome'>Cognome</label>
              <input 
                type='cognome' 
                id='cognome' 
                name='cognome' 
                placeholder='Enter your last name' 
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
              />
            </div>
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
                   Hai gia un account?
                </Link>
              </p>
            </div>
            <div className='flex flex-col gap-3' style={{marginTop: '10px'}}>
              <button type='submit' className='btn'>
                Registrati
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}