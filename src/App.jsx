import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUser] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUser(data))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    fetch("http://localhost:5000/users",{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data]
      setUser(newUsers)

      form.reset();
    })
  }

  return (
    <>
    <h1>User management system</h1>
    <h3>Number of user: {users.length}</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" name='name' />
      <br />
      <input type="email" name='email' />
      <br />
      <input type="submit" />
    </form>
    <div>
      {
        users.map(user => <p key={user.id}>{user.id}. {user.name}</p>)
      }
    </div>
    </>
  )
}

export default App
