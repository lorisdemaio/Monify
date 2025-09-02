import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import '../index.css';

// layout components
import Section from '../layout/section';

// components
import ChangePassword from '../components/changePassword';
import Alert from '../layout/alert';

// hook
import { useUserData }  from '../hook/userData';

export default function Account() {

  const navigate = useNavigate();
  const { userData } = useUserData();
  const id = userData?.id;

  // alert state
  const [alertState, setAlertState] = useState();
  const ChangeAlertState = () => {
    setAlertState(!alertState);
  }

  // logout
  const handleLogout = () => {
    toast.info("Logout eseguito con successo.")
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    navigate("/");
  }

  // change password state
  const [ passwordState, setPasswordState ] = useState(false);
  const ChangePasswordState = () => {
    setPasswordState(!passwordState);
  }

  // radar  
  const handleResetRadar = () => {
    fetch(`${import.meta.env.VITE_API_URL}/resetradar`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning"},
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") toast.success(data.mex);
    });
  }

  // elimina account
   const handleEliminaAccount = () => {
    fetch(`${import.meta.env.VITE_API_URL}/deleteaccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") toast.success(data.mex);
    });

    handleLogout();
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
          <div className='content-left'>
            <div className='settings-item' onClick={ChangePasswordState}>
              <span>Modifica password</span>
            </div>

            <div className='settings-item' onClick={handleResetRadar}>
              <span>Reset radar</span>
            </div>

            <div className='settings-item' onClick={handleLogout}>
              <span className='text-red-500'>Log out</span>
            </div>

            <div className='settings-item' onClick={ChangeAlertState}>
              <span className='text-red-500'>Elimina accout</span>
            </div>
          </div>

          <ChangePassword state={passwordState} func={ChangePasswordState} />
          <Alert 
            state={alertState}  
            func={ChangeAlertState}
            mex="Vuoi eliminare il tuo account?" 
            accept={handleEliminaAccount}  
          />
        </Section>
    </>
  )
}