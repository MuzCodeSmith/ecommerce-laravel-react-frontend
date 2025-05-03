import React from 'react'

const NoState = ({text='No record found.'}) => {
  return (
    <div className='text-center py-5'>
        <span>{text}</span>
    </div>
  )
}

export default NoState