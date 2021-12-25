import React,  {useEffect, useState} from 'react';
import logo from './logo.svg';
import './styles/App.css';

interface UserUI{
  id: string;
  username: string;
  name: string;
  email: string;
}

function App() {
  const [WelcomeMessage, setWelcomeMessage] = useState('');

  const [usersList, setUsersList] = useState<UserUI[]>([]);

  const fetchMessage = async () => {
    const message = await fetch('/api').then(res => res.text());

    setWelcomeMessage(message);
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchUsers = async () => {
    const users = await fetch('/users/all').then(res => res.json())
    setUsersList(users);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> {WelcomeMessage} </p>

        <button onClick={fetchUsers}>Fetch Users</button>

        {usersList.length > 0 && 
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user:UserUI) =>{
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>  
              })}
            </tbody>
          </table>}
      </header>
    </div>
  );
}

export default App;
