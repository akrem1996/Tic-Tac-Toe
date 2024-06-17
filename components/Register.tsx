"use client"
import React, { useState } from 'react';
import '../app/globals.css';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [error, setError] = useState("")

  const router = useRouter()


  const emailIsValidate = (email:string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return emailRegex.test(email)
  }


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const name = event.target[0].value
    const email = event.target[1].value
    const password = event.target[2].value

    if(!emailIsValidate(email)){
      return
    }

    if (!password){
      return
    }

    try{
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
        
      })
      if(res.status === 400){
        setError("email adress exists already in the databse")
      }

      if(res.status === 200){
        setError("")
        console.log("user Created successfully")
        router.push("/")
      }
    } catch (error) {
        setError("error error error .........")
        console.log("error error error ......... " + error)
    }
    
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="login-button">Register</button>
      </form>
      {/* <Link className="block text-center text-blue-500" href="/login"> Login with an existing account</Link> */}
    </div>
  );
}

export default Register;
