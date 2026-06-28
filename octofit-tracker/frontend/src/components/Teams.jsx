import { useEffect, useState } from 'react'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://octofit-8000.app.github.dev/api/teams')
      .then((response) => response.json())
      .then((data) => setTeams(data.results || []))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team.id} className="list-group-item">
            {team.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
