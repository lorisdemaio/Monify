import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router';
import '../index.css';

// layout components
import Section from '../layout/section';
import AboutCard from '../layout/aboutCard';

// components
import AddFunds from '../components/addFunds';
import Alert from '../layout/alert';

// hook
import { useUserData }  from '../hook/userData';

export default function InfoGoal() {

  const navigate = useNavigate();
  const [ goal, setGoal ] = useState([]);
  const { id } = useParams();
  const { userData } = useUserData();
  const id_utente = userData?.id;

  // api
  useEffect(() => {
    if(!id_utente) return;
    fetch(`${import.meta.env.VITE_API_URL}/infogoal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
      body: JSON.stringify({ id, id_utente})
    })
    .then(res => res.json())
    .then(data => setGoal(data.ris));
  }, [id_utente])

  if(!goal) return null;

  // alert state
  const [alertState, setAlertState] = useState();
  const ChangeAlertState = () => {
    setAlertState(!alertState);
  }

  // add funds state
  const [ addFundsState, setAddFundsState ] = useState(false);
  const ChangeAddFundsState = () => {
    setAddFundsState(!addFundsState);
  }

  // elimina goal
  const handleDeleteGoal = () => {
    fetch(`${import.meta.env.VITE_API_URL}/deletegoal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
      body: JSON.stringify({ id, id_utente})
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") 
      {
        toast.success(data.mex);
        setAlertState(!alertState);
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
            {
                goal.map((item) => (
                    <AboutCard
                        key={item.id}
                        bg = "#568bfc50"
                        titolo = {item.titolo}
                        saldo = {item.saldo}
                        obiettivo = {item.obiettivi}
                    />
                ))
            }

            <div className='content-left'>
                <div className='settings-item' onClick={ChangeAddFundsState}>
                    <span>Aggiungi fondi all'obiettivo</span>
                </div>

                <div className='settings-item' onClick={ChangeAlertState}>
                    <span className='text-red-500'>Elimina obiettivo</span>
                </div>
            </div>
          </div>

          <AddFunds 
            state={addFundsState} 
            func={ChangeAddFundsState} 
            apiUrl="addgoalfunds" 
            method="PATCH" 
          />
          <Alert 
            state={alertState}  
            func={ChangeAlertState}
            mex="Vuoi eliminare l'obiettivo" 
            accept={handleDeleteGoal}  
          />
        </Section>
    </>
  )
}