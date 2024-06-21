"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Errors from './Errors';
import { useRouter } from 'next/navigation';


import '../app/globals.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const [falseEmail,setFalseEmail] = useState(true)
  const [falsePassword,setFalsePassword] = useState(true)

  const router = useRouter()

<<<<<<< HEAD
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value


    try{
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        
      })

      if(res.status === 400){
        setFalseEmail(false)
        setError("email adress don't exists in the databse")
      }

      if(res.status === 401){
        setFalsePassword(false)
        setError("false password")
      }


      if(res.status === 200){
        setError("")
        router.push("/lobby")
      }
    } catch (error) {
        setError("error")
    }
=======
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log({
      username,
      email,
      password,
    });
>>>>>>> d4acec3d11a7ee72b78c298fefe5d6f054a035bd
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
        {!falseEmail && <Errors message={error} />}
        {!falsePassword && <Errors message={error}/>}
      <Link className="block text-center text-blue-500" href="/register"> registrieren?</Link>
    </div>
  );
}

export default Login;
