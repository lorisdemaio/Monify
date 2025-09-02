import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import '../index.css';

// components
import Goal from '../components/goal';

// layout components
import Section from '../layout/section';

// hook
import { useUserData }  from '../hook/userData';

export default function Goals() {

  const navigate = useNavigate();
  const [ importo, setImporto ] = useState(0);
  const [ titolo, setTitolo ] = useState("");

  const { userData } = useUserData();
  const id = userData?.id;

  const handleAddGoal = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/addgoal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
      body: JSON.stringify({ importo, titolo, id })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success")
      {
        toast.success(data.mex);
        navigate("/");
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
          justifyContent = "start"
          alignItems = "center"
          paddingTop = "100"
          paddingBottom = "100"
          bg = "#080808"
        >
          <div className='content'>
            <form style={{ marginBottom: '20px' }} onSubmit={handleAddGoal}>
              <div>
                  <label htmlFor='importo' className='text-xl'>Importo</label>
                  <input
                    type='number'
                    id="importo"
                    name='importo'
                    placeholder='100'
                    value={importo}
                    onChange={(e) => setImporto(e.target.value)}
                    required
                  />
              </div>
              <div>
                  <label htmlFor='nome_obiettivo' className='text-xl'>Nome obiettivo</label>
                  <input
                    type='text'
                    id="nome_obiettivo"
                    name='nome_obiettivo'
                    placeholder='Es. Vacanza'
                    value={titolo}
                    onChange={(e) => setTitolo(e.target.value)}
                    required
                  />
              </div>
              <button className='btn' type='submit'>
                  Crea obiettivo
              </button>
            </form>
            
            <div className='dashboard-goals'>
              <h2 className='text-xl md:text-3xl font-bold'>
                  I tuoi obiettivi
              </h2>
              <Goal />
            </div>
          </div>
        </Section>
    </>
  )
}