import React from 'react'

const Tabs = ({type,setType}) => {
  return (
    <div className='flex gap-6'>
        <button
          className={`${type === "repos" && "text-teal-400"}`}
          onClick={() => setType("repos")}
        >
          Repositories
        </button>
        <button
          className={`${type === "received_events" && "text-teal-400"}`}
          onClick={() => setType("received_events")}
        >
          Activity
        </button>
        <button
          className={`${type === "followers" && "text-teal-400"}`}
          onClick={() => setType("followers")}
        >
          Followers
        </button>
    </div>
  )
}

export default Tabs