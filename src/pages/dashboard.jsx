import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import '../index.css';

// layout components
import Section from '../layout/section';

// components
import AddFunds from '../components/addFunds';
import AddExpense from '../components/addExpense';
import Goal from '../components/goal';

// hook
import { useUserData }  from '../hook/userData';

export default function Dashboard() {
  
  // add funds state
  const [ addFundsState, setAddFundsState ] = useState(false);
  const ChangeAddFundsState = () => {
    setAddFundsState(!addFundsState);
  }

  // add expense state
  const [ addExpenseState, setAddExpenseState ] = useState(false);
  const ChangeAddExpenseState = () => {
    setAddExpenseState(!addExpenseState);
  }

  // api
  const { userData } = useUserData();
  const id = userData?.id;
  const nome = userData?.nome;
  const saldo = userData?.saldo;
  
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
        <div className='dashboard-wrapper'>
          {/* COL 1 - DASHBOARD INFO */}
          <div className='dashboard-info'>
            <h1 className='text-xl md:text-2xl font-semibold'>
              Ciao, <span className='text-[var(--colore1)]'>{nome}</span>
            </h1>
            <p className='text-xl md:text-3xl font-bold' style={{marginTop: '20px'}}>
              Saldo: <span className='text-[var(--colore1)]'>{saldo}€</span>
            </p>
            <p className='flex items-center gap-2 text-sm md:text-base text-gray-400 cursor-pointer' style={{marginTop: '5px'}}>
              informazioni sul saldo
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#99a1af" className="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
            </p>
            <div className='flex justify-center items-center gap-4 w-full' style={{marginTop: '20px'}}>
              <button className='btn w-full' onClick={ChangeAddFundsState}>
                Aggiungi Saldo
              </button>
              <button className='btn w-full' onClick={ChangeAddExpenseState}>
                Aggiungi Spesa
              </button>
            </div>
          </div>
          
          {/* COL 2 - DASHBOARD RADAR */}
          <div className='radar-wrapper'>
            <Link to="/entrate" className='w-full'>
              <div className='dashboard-radar'>
                <span>Entrate</span>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#214591" className="bi bi-caret-up" viewBox="0 0 16 16">
                    <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to="/uscite" className='w-full'>
              <div className='dashboard-radar'>
                <span>Uscite</span>
                <div className='rotate-180'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-caret-up" viewBox="0 0 16 16">
                    <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* COL 3 - DASHBOARD GOALS */}
          <div className='dashboard-goals'>
            <h2 className='text-xl md:text-3xl font-bold'>
              I tuoi obiettivi
            </h2>
            <Goal />
          </div>
        </div>

        <AddFunds 
          state={addFundsState} 
          func={ChangeAddFundsState} 
          apiUrl="addfunds" 
          method="POST" 
        />
        <AddExpense 
          state={addExpenseState} 
          func={ChangeAddExpenseState} 
        />
      </Section>
    </>
  )
}