import { useEffect, useState } from 'react'

const Leaderboard = () => {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://octofit-8000.app.github.dev/api/leaderboard')
      .then((response) => response.json())
      .then((data) => setEntries(data.results || []))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry.id} className="list-group-item">
            {entry.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
