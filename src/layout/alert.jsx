import '../index.css';

export default function Alert({ state, func, mex, accept }) {
 
  return (
    <> 
        <div className={`bg-[#000000c4] fixed ${state ? 'flex' : 'hidden' } justify-center items-center top-0 left-0 h-screen w-full`}>
            <div className={`bg-[#080808] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                md:w-[500px] w-[80%] flex flex-col justify-center items-center gap-4 shadow-sm shadow-zinc-900 rounded-xl`} 
                style={{ padding: "16px" }}>
                <p className='text-xl break-words'>
                    {mex}
                </p>
                <div className='flex flex-row gap-4 w-full border-t border-zinc-900' style={{ padding: "16px" }}>
                    <button className='btn w-full' onClick={accept}>
                        Si
                    </button>
                    <button className='btn w-full' onClick={func}>
                        No
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}