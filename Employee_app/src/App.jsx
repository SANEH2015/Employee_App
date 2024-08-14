import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './component/login'
import Navigation from './component/navigation'
import Employee from './component/employeelist'
function App() {
  const [count, setCount] = useState(0)
 

  return (
    <>
      <section><Navigation/></section>
      <section><Login/></section>
      <section><Employee/></section>
      
    </>
  )
}

export default App
