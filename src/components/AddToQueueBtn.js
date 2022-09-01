import React from 'react'

const AddToQueueBtn = ({ togglePop }) => {

  const handleClick = () => {
    togglePop()
  }

  return (
    <button className='add-btn' onClick={handleClick}>+</button>
  )
}

export default AddToQueueBtn