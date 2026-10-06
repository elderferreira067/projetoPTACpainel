import { useState } from 'react'

function App() {
  const [novaIdeia, setNovaIdeia] = useState('')
  const [erro, setErro] = useState('')
  const [ideias, setIdeias] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    if (novaIdeia.trim() === '') {
      setErro('Digite sua ideia antes de adicionar.')
      return
    }

    const novaIdeiaObj = {
      id: Date.now(),
      texto: novaIdeia.trim(),
      feita: false
    }

    setIdeias([...ideias, novaIdeiaObj])
    setNovaIdeia('')
    setErro('')
  }

  function toggleIdeia(id) {
    setIdeias(
      ideias.map((ideia) =>
        ideia.id === id
          ? { ...ideia, feita: !ideia.feita }
          : ideia
      )
    )
  }

  function removerIdeia(id) {
    setIdeias(
      ideias.filter((ideia) => ideia.id !== id)
    )
  }

  const totalIdeias = ideias.length

  const ideiasConcluidas = ideias.filter(
    (ideia) => ideia.feita
  ).length

  return (
    <div className="container">

      <h1>Painel de Ideias</h1>

      <p className="contador">
        Total: {totalIdeias} | Concluídas: {ideiasConcluidas}
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={novaIdeia}
          onChange={(event) => {
            setNovaIdeia(event.target.value)
            setErro('')
          }}
          placeholder="Digite uma ideia"
        />

        <button type="submit">
          Adicionar
        </button>

      </form>

      {erro && <p>{erro}</p>}

      <div className="lista-ideias">

        {ideias.map((ideia) => (

          <div className="idea" key={ideia.id}>

            <input
              type="checkbox"
              checked={ideia.feita}
              onChange={() => toggleIdeia(ideia.id)}
            />

            <span className={ideia.feita ? 'feita' : ''}>
              {ideia.texto}
            </span>

            <button
              onClick={() => removerIdeia(ideia.id)}
            >
              x
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default App