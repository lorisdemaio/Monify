import { useState } from 'react';
import { toast } from 'react-toastify';

// hook
import { useUserData }  from '../hook/userData';

export default function AddExpense({ state, func }) {

    const { userData, refreshSaldo  } = useUserData();
    const id = userData?.id;
    const saldo = userData?.saldo;
    const [titolo, setTitolo] = useState("");
    const [importo, setImporto] = useState(0);

    const handleAddExpense = (e) => {      

        if(saldo < importo)
        {
            e.preventDefault();
            refreshSaldo();
            toast.error("Saldo insufficiente.");
            return;
        }  
        
        fetch(`${import.meta.env.VITE_API_URL}/addexpense`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
            body: JSON.stringify({ titolo, importo, id })
        })
        .then(res => res.json())
    }

  return (
    <>
        <div className={`bg-[#000000c4] fixed ${state ? 'flex' : 'hidden' } justify-center items-center top-0 left-0 h-screen w-full`}>
            <form className='bg-[#080808] rounded-xl shadow-sm shadow-zinc-900 md:w-[500px] w-[80%]' style={{ padding: '20px' }} onSubmit={handleAddExpense}>
                <div>
                    <label htmlFor='importo' className='text-xl'>Inserisci importo</label>
                    <input 
                        type='number' 
                        id='importo'
                        name='importo' 
                        placeholder='100'
                        value={importo}
                        onChange={(e) => setImporto(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='titolo' className='text-xl'>Titolo</label>
                    <input 
                        type='text' 
                        id='titolo'
                        name='titolo' 
                        placeholder='ES. spesa'
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        required
                    />
                </div>
                <button className='btn' type='submit' onClick={func}>
                    Aggiungi
                </button>
                <div className='btn' onClick={func}>
                    Annulla
                </div>
            </form>
        </div>
    </>
  )
}