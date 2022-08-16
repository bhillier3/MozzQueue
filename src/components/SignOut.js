import React from 'react'

const SignOut = ({ setIsSignedIn }) => {

  const handleSubmit = e => {
    e.preventDefault()

    setIsSignedIn(false)
  }

  return(
    <button className="signout" onClick={handleSubmit}>Sign Out</button>
  )
}

export default SignOut