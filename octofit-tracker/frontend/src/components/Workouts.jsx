import { useEffect, useState } from 'react'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://octofit-8000.app.github.dev/api/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data.results || []))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout.id} className="list-group-item">
            {workout.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
