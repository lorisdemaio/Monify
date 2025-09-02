import { useState, useEffect } from 'react';
import '../index.css';

import logo from '/logo.png';

export default function Load() {
  
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const handleLoad = () => setLoad(false);

    if (document.readyState === "complete") setLoad(false);
    else 
    {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
       <div className={`loading ${load ? 'opacity-[1] z-[1001]' : 'opacity-[0] z-[-1]'}`}>
        <img
          src={logo}
          className='h-40 w-40 animate-pulse'
          alt='loading...'
        />
      </div>
    </>
  )
}