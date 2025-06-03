import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [nomeDoPet, setNomeDoPet] = useState('')
  const [dataNasc, setDataNasc] = useState('')
  const [dataAdocao, setDataAdocao] = useState('')
  const [pets, setPets] = useState([])
  const url = import.meta.env.VITE_BASE_URL

  const cadastroNovoPet = async () => {
    var novoPet = {
      name: nomeDoPet,
      birthday: dataNasc,
      adoptionDate: dataAdocao
    }

    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPet)
      })

      if(!response.ok){
        console.log('ta dando errro')
      }

      setNomeDoPet('')
      setDataNasc('')
      setDataAdocao('')

      fetchPet()
    }catch(error){}
  }

  const fetchPet = async () => {
    const response = await fetch(url)
    const data = await response.json();
    setPets(data)
    console.log(data)
  }

  useEffect(() => {
   
    fetchPet();
  }, [])

  return (
    <>

    <div className='cadastroPai'>
      <div className='cadastro'>
        <h1> Quem é a fofura? </h1>

        <div className='campo'>
          <p> Nome: </p>
          <input type="text" value={nomeDoPet} onChange={(e) => setNomeDoPet(e.target.value)} />
        </div>

        <div className='campo'>
          <p>Data de nascimento:</p>
          <input type="date" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)}/>
        </div>

        <div className='campo'>
          <p>Data da adoção</p>
          <input type="date" value={dataAdocao} onChange={(e) => setDataAdocao(e.target.value)} />
        </div>
        

        <button onClick={cadastroNovoPet}>Enviar cadastro</button>
      </div>
      <div className='listaPets'>
      {pets.map((pet, index) => (
            <div key={index} className='pets'>
              <p>🐾 Nome: {pet.name}</p>
              <p>🎂 Nascimento: {pet.birthday.slice(0, 10).split('-').reverse().join('/')}</p>
              <p>🏠 Adoção: {pet.adoptionDate.slice(0, 10).split('-').reverse().join('/')}</p>
              <hr />
            </div>
          ))}


      </div>
    </div>
    </>
  )
}

export default App
