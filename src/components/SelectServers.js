import React from 'react'
import firebase from '../firebase'

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'

const db = firebase.firestore()

const SelectServers = ({ setActiveServers, setIsSelServClicked }) => {

  const serversRef = db.collection('servers')
  const serverQuery = serversRef.orderBy('name')

  const [servers] = useCollectionDataOnce(serverQuery)

  const handleSelectServersSubmit = e => {
    e.preventDefault()

    const checked = e.target.querySelectorAll('[name="active-servers"]:checked')
    const selected = Array.from(checked).map(server => server.value)

    setActiveServers(selected)
    setIsSelServClicked(false)
  }

  return(
    <form className="select-servers" onSubmit={handleSelectServersSubmit}>
      {servers && servers.map(server => (
        <div key={server.name}>
          <input
            type="checkbox"
            id={server.name}
            name="active-servers"
            value={server.name}
          />
          <label htmlFor={server.name}>{server.name}</label>
        </div>
      ))}
      <input type="submit" value="Assign Servers" />
    </form>
  )
}

export default SelectServers