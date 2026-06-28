import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://octofit-8000.app.github.dev/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.results || []))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="container py-4">
      <h2>Users</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
