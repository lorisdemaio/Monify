import { useState, useEffect } from 'react';
import { Link } from 'react-router';

// layout components
import AboutCard from '../layout/aboutCard';

// hook
import { useUserData }  from '../hook/userData';

export default function Goal() {
    
    const [goals, setGoals] = useState([]);
    const { userData } = useUserData();
    const id = userData?.id;

    useEffect(() => {
      if (!id) return;
      fetch(`${import.meta.env.VITE_API_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning" : "ngrok-skip-browser-warning" },
        body: JSON.stringify({ id })
      })
      .then(res => res.json())
      .then(data => setGoals(data.ris));
    }, [id])

    return (
        <div className='goals-cards'>
            {
              goals.length > 0 ?
              <>
                {
                  goals.map((goal) => (
                    <AboutCard
                      key={goal.id}
                      link={goal.id}
                      bg = "#568bfc50"
                      titolo = {goal.titolo}
                      saldo = {goal.saldo}
                      obiettivo = {goal.obiettivi}
                    />
                  ))
                }
              </> :
              <>
                <span className='text-xl'>
                  Non hai obiettivi. <Link to="/goals" className='text-blue-500'>Clicca qui per crearne uno.</Link>
                </span>
              </>
            }
        </div>
    );
}