import { useState , useCallback , useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setLength] = useState(8);
  const [number, setnumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)
    const passwordGenerator = useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number){
      str+="01234567"
    }
    if(char){
      str+="@#$%&"
    }
    
    for(let i=1; i<=length;i++){
        let Character=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(Character)
    }

    setPassword(pass)

  },[length,number,char,setPassword])
  const copy = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() =>{
    passwordGenerator()
  },[length,char,number,passwordGenerator])
  

  return (
    <>
      <div className='w-full max-w-md h-[200px] mx-auto my-3 shadow-md rounded-lg px-4 py-3 bg-gray-800 text-cyan-400 my-[150px] '>
        <h1 className='text-white text-center my-3 text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-8'>
          <input 
            type="text"
            value={password}
            placeholder='password'
            readOnly
            className='
            outline-none w-full h-12 py-4 px-3'
            ref={passwordRef}
            />
           <button onClick={copy} className='outline-none bg-green-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 text-base items-center justify-center'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            
            />
            <label >length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={number}
              id='numberinput'
              onChange={() =>{
                setnumber((prev) => !prev)
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={char}
              id='charinput'
              onChange={() =>{
                setChar((prev) => !prev)
              }}
            />
            <label htmlFor="charinput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
