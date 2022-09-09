import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FormPatients from './components/FormPatients'
import FormRiskFactors from './components/FormRiskFactors'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormPatients />
      
      <br />

      <FormRiskFactors />
    </>
  )
}

export default App
