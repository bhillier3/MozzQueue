import React, { useState } from 'react'
import firebase from '../firebase'

import { doc, updateDoc } from 'firebase/firestore'

const db = firebase.firestore()

const SelectServerBtn = ({ id, name, active }) => {
  const [checked, setChecked] = useState(active)

  const handleClick = async (e) => {
    e.preventDefault()

    setChecked(!checked)

    const serverDocRef = doc(db, 'servers', id)
    try {
      await updateDoc(serverDocRef, {
        active: !checked
      })
    } catch (err) {
      alert(err)
    }
  }

  return(
    <button
      className={`server-btn ${checked && 'checked-btn'}`}
      onClick={handleClick}>
      {name}
    </button>
  )
}

export default SelectServerBtn