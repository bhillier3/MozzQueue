import React, { useState, useRef } from 'react'

const SignIn = ({ setIsSignedIn }) => {
  const [errorMsg, setErrorMsg] = useState("")

  let unameRef = useRef(null)
  let passRef = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()

    if (unameRef.current.value !== process.env.USERNAME ||
        passRef.current.value !== process.env.PASSWORD) {
      // Invalid login
      setErrorMsg("Invalid login credentials")
    } else {
      // Successful login
      setIsSignedIn(true)
    }

    e.target.reset()
  }

  const renderErrorMsg = () => <div className="error">{errorMsg}</div>

  const renderLoginForm = () => (
    <div className="login-container">
      <h2 className="login-title">Lazia Mozzarella Cart</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="uname">Username:</label>
          <input ref={unameRef} type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input ref={passRef} type="password" name="password" required />
        </div>
        <input id="login-submit" type="submit" value="Login" />
        {renderErrorMsg()}
      </form>
    </div>
  )

  return (
    <div>
      {renderLoginForm()}
    </div>
  )
}

export default SignIn