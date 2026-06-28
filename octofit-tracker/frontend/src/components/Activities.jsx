import { useEffect, useState } from 'react'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://octofit-8000.app.github.dev/api/activities')
      .then((response) => response.json())
      .then((data) => setActivities(data.results || []))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {activities.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
