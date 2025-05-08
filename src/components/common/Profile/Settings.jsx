import React from 'react'

function Settings() {
  return (
    <div className='relative h-full'>
      <div>Settings</div>
      <div className='w-44 flex justify-between absolute bottom-0 right-0'>
        <button className='border border-gray-200 rounded-xl w-20 py-1 font-semibold hover:bg-gray-200 duration-100'>Cancel</button>
        <button className='border border-gray-200 rounded-xl w-20 py-1 font-semibold hover:bg-gray-200 duration-100'>Save</button>
      </div>
    </div>
  )
}

export default Settings