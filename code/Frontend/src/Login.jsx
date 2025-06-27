import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log(data);
      setResponseMsg(JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setResponseMsg('Failed to login');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>

      <p>Server Response: {responseMsg}</p>
    </div>
  );
};

export default Login;
