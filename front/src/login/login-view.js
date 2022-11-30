import React, { useState } from 'react'

function LoginView({ Login, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }
  return (
    <form onSubmit={submitHandler} style={{ margin: 'auto' }}>
      <div className="form-inner">
        <h2 style={{ fontSize: 40, marginBottom: 30, fontStyle: 'oblique' }}>Login</h2>
        {/*ERROR*/}
        <div className="form-group">
          <label htmlFor="username" style={{ marginRight: 10 }}>Username:</label>
          <input style={{borderRadius: 10}} type="text" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
        </div>
        <div className="form-group">
          <label htmlFor='password' style={{ marginRight: 15 }}>Password: </label>
          <input style={{borderRadius: 10}} type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
        </div>
        <input style={{borderRadius: 5}} type="submit" value="LOGIN" />
      </div>
    </form>
  )
}

export default LoginView