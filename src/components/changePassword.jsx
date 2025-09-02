import { useState } from 'react';
import { toast } from 'react-toastify';
import '../index.css';

// hook
import { useUserData }  from '../hook/userData';

export default function ChangePassword({ state, func }) {
    
    const { userData } = useUserData();
    const id = userData?.id;    
    const [password, setPassword] = useState("");

    const handleAddFunds = (e) => {     
        e.preventDefault();
        
        fetch(`${import.meta.env.VITE_API_URL}/changepassword`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
            body: JSON.stringify({ password, id })
        })
        .then(res => res.json())
        .then(data => {
            toast.info(data.mex);
        })
    }

  return (
    <>
        <div className={`bg-[#000000c4] fixed ${state ? 'flex' : 'hidden' } justify-center items-center top-0 left-0 h-screen w-full`}>
            <form className='bg-[#080808] rounded-xl shadow-sm shadow-zinc-900 md:w-[500px] w-[80%]' style={{ padding: '20px' }} onSubmit={handleAddFunds}>
                <label htmlFor='password' className='text-xl'>Nuova password</label>
                <input 
                    type='password' 
                    id='password'
                    name='password' 
                    placeholder='Nuova password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className='btn' type='submit' onClick={func}>
                    Aggiungi
                </button>
                <button className='btn' onClick={func}>
                    Annulla
                </button>
            </form>
        </div>
    </>
  )
}