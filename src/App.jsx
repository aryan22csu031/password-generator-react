import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8);
  const [numAllow, setNum] = useState(false);
  const [charAllow, setChar] = useState(false);
  const [password, setpass] = useState("");
  const passwordref = useRef(null);
  const PassGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "1234567890";
    if (charAllow) str += "!@#$%^&*(){}`\~";

    for (let i = 1; i < length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ch);
    }
    setpass(pass);
  }, [length, numAllow, charAllow, setpass]);
  
  const copyPass = useCallback(()=>{
    passwordref.current?.select();
    //passwordref.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{PassGen()},[length,numAllow,charAllow])

  return (
    <>
      <h1 className='text-4xl text-green-300 font-bold flex justify-center mt-9 mb-[7rem]'>Random Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 text-orange-500 bg-slate-600'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordref} readOnly />
          <button className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0' onClick={copyPass}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => { setlength(e.target.value) }} />
            <label className='font-medium'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} id='numInput' onChange={()=>{setNum((prev)=>!prev)}} />
            <label className='font-medium'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id="charInput" onChange={() => { setChar((prev) => !prev); }} />
            <label className='font-medium'>Special Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
