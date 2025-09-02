import { useEffect, useState } from 'react';
import '../index.css';

export default function Banner()  {

    const [state, setState] = useState(false)

    useEffect(() => {
        const banner = localStorage.getItem("bannerClose");
        if(banner) return;

        setTimeout(() => {
            setState(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
        }, 1000);
    }, [])

    const handleClose = () => {
        setState(!state);
        localStorage.setItem("bannerClose", true);
    }

    return(
        <>
            <div className={`banner ${state ? 'top-[60%]' : 'top-[200%] '}`}>
                <div className='w-full'>
                    <p className='text-xl text-black break-words'>
                        Aggiungi il sito alla home del tuo telefono per
                        una esperienza migliore.
                        
                        <br></br>
                        <br></br>

                        <span className='font-bold'>Su IPhone: </span><br></br>
                        Clicca "condividi" &gt; "Aggiungi alla schermata Home" &gt; Aggiungi

                        <br></br>
                        <br></br>

                        <span className='font-bold'>Su Android: </span><br></br>
                        Clicca il menu (⋮ in alto a destra) &gt; "Aggiungi a schermata Home"

                    </p>
                </div>
                <button className=' btn2 w-full' onClick={handleClose}>
                    Chiudi
                </button>
            </div>
        </>
    );
}