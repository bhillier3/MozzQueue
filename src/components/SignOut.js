import React from 'react'

const SignOut = ({ setIsSignedIn }) => {

  const handleSubmit = e => {
    e.preventDefault()

    setIsSignedIn(false)
  }

  return(
    <button className="signout" onClick={handleSubmit}>SignOut</button>
  )
}

export default SignOut