import React, { useState } from 'react'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import MozzQueue from './components/MozzQueue'

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return(
    <div>
      <MozzQueue />
      {/* {isSignedIn ?
        (
          <div>
            <SignOut setIsSignedIn={setIsSignedIn} />
            <MozzQueue />
          </div>
        ) :
        <SignIn setIsSignedIn={setIsSignedIn}/>
      } */}
    </div>
  )
}

export default App