import React, { useState, useRef, useEffect } from 'react'
import firebase from '../firebase'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
const db = firebase.firestore()

/*
  Notes (maybe button for preselecting bday and anniversary?)
*/

const MozzForm = ({ togglePop, servers }) => {
  const [selectedServer, setSelectedServer] = useState('')
  const tableRef = useRef('')
  const notesRef = useRef('')
  const servTitleRef = useRef()
  const tableTitleRef = useRef()

  useEffect(() => {
    servTitleRef.current.textContent = 'Select Server'
    tableTitleRef.current.textContent = 'Table #'
  }, [])


  const handleClick = () => {
    togglePop()
  }

  const handleSumbit = async(e) => {
    e.preventDefault()

    servTitleRef.current.textContent = 'Select Server'
    servTitleRef.current.style.color = '#5c7e87'
    tableTitleRef.current.textContent = 'Table #'
    tableTitleRef.current.style.color = '#5c7e87'

    // ERROR CHECKS
    if (selectedServer == '' || tableRef.current.value == '') {
      if (selectedServer == '') {
        servTitleRef.current.textContent = 'Must Select A Server'
        servTitleRef.current.style.color = '#89111a'
      }
      if (tableRef.current.value == '') {
        tableTitleRef.current.textContent = 'Must Input A Table #'
        tableTitleRef.current.style.color = '#89111a'
        tableTitleRef.current.style.textAlign = 'center'
      }
    } else {
      // SUBMIT STATES
      const docEntryRef = await addDoc(collection(db, 'mozzqueue'), {
        entry_time: Timestamp.now(),
        finish_time: Timestamp.now(),
        isComplete: false,
        isStarted: false,
        notes: notesRef.current.value,
        server: selectedServer,
        start_time: Timestamp.now(),
        table: tableRef.current.value
      })
      console.log('Document written with ID: ', docEntryRef.id)

      togglePop()
    }
  }


  return (
    <div className='popped-modal'>
      <div className='mozzform-container'>
        <span className='closeIcon' onClick={handleClick}>x</span>
        <h3 className='form-title'>Mozzarella Sign Up</h3>
        <div className='form-grid'>
          <div className='form-servers'>
            <h4 className='form-heading' ref={servTitleRef}></h4>
            <div className='form-servers-box'>
            {servers.map(server =>
              <FormServerSelectBtn
                key={server.id}
                server={server.data.name}
                selectedServer={selectedServer}
                setSelectedServer={setSelectedServer}
              />
            )}
            </div>
          </div>
          <div className='form-tablenum'>
            <h4 ref={tableTitleRef}></h4>
            <input className='table' type="number" ref={tableRef} />
          </div>
          <div className='form-notes'>
            <h4>Notes</h4>
            <textarea className='notes' ref={notesRef}></textarea>
          </div>
          <button className='form-submit' onClick={handleSumbit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

const FormServerSelectBtn = ({ server, selectedServer, setSelectedServer }) => {

  const handleClick = () => {
    setSelectedServer(server)
  }

  return (
    <button
      className={`server-btn ${selectedServer === server && 'selected-btn'}`}
      id='form-btn'
      onClick={handleClick}>
      {server}
    </button>
  )
}

export default MozzForm