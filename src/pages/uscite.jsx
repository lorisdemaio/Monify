import { useEffect, useState } from 'react';
import '../index.css';

// layout components
import Section from '../layout/section';

// hook
import { useUserData }  from '../hook/userData';

export default function Uscite() {

    const [uscite, setUscite] = useState([]);
    const { userData } = useUserData();
    const id = userData?.id;
    
    useEffect(() => {
        if (!id) return;
        fetch(`${import.meta.env.VITE_API_URL}/uscite`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => setUscite(data.ris));
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
                    uscite.length > 0 ?
                    <>
                        {
                            uscite.map((uscita) => (
                                <div className='radar' key={uscita.id}>
                                    <span className='importo text-red-500'>-{uscita.importo}€</span>
                                    <span className='text-2xl'>{uscita.titolo}</span>
                                    <span className='data'>{uscita.data}</span>
                                </div>
                            ))
                        }
                    </> :
                    <>
                        <span className='text-2xl'>
                            Non hai spese recenti.
                        </span>
                    </>
                }
            </div>
        </Section>
    </>
  )
}