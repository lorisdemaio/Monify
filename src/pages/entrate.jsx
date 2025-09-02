import { useEffect, useState } from 'react';
import '../index.css';

// layout components
import Section from '../layout/section';

// hook
import { useUserData }  from '../hook/userData';

export default function Entrate() {

    const [entrate, setEntrate] = useState([]);
    const { userData } = useUserData();
    const id = userData?.id;
    
    useEffect(() => {
        if(!id) return;
        fetch(`${import.meta.env.VITE_API_URL}/entrate`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => setEntrate(data.ris));
    }, [id]);

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
            <div className='content-left'>
                {
                    entrate.length > 0 ? 
                    <>
                        {
                            entrate.map((entrata) => (
                                <div className='radar' key={entrata.id}>
                                    <span className='importo text-green-500'>+{entrata.importo}€</span>
                                    <span className='data'>{entrata.data}</span>
                                </div>
                            ))
                        }
                    </> : 
                    <>
                        <span className='text-2xl'>
                            Non hai entrate recenti.
                        </span>
                    </>
                }
            </div>
        </Section>
    </>
  )
}