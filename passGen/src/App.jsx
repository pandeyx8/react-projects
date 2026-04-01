import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(password)

  const generatePassword = useCallback( ()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i = 1; i<length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [numberAllowed, charAllowed, length])

  useEffect(() => {
    generatePassword()
  }, [generatePassword, length, numberAllowed, charAllowed])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <>
      <div className='min-h-screen w-full flex flex-col items-center justify-start pt-14 px-4 bg-[#0f172a]'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-white mb-5'>Password Generator</h1>

        <div className='w-full max-w-xl flex shadow-lg rounded-lg overflow-hidden'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-2.5 px-4 text-slate-900'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          >
          </input>

          <button className='outline-none bg-blue-700 hover:bg-blue-800 transition-colors text-white px-4 py-2.5 shrink-0 font-medium' onClick={copyToClipboard}>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>

            <input
              type='range'
              min={6}
              max={18}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
              name=""
              id="">
            </input>
            <label htmlFor='length' className='text-white'>Length: {length}</label>


          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              id=""
              name=""
            ></input>
            <label htmlFor="number" className='text-orange-50'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              id=""
              name=""
            ></input>
            <label htmlFor="charInput" className='text-orange-50'>Char</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
