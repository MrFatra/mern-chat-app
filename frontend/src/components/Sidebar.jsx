import React, { useState } from 'react'
import People from './People'
import useGetContacts from '../hooks/contact'
import Loading from './Loading'
import { getRandomEmoji } from '../utils/generateEmoji'
import { AiOutlineSearch } from 'react-icons/ai'
import { useLogout } from '../hooks/logout'
import { BiLogOut } from 'react-icons/bi'

const Sidebar = () => {
  const { loading, contacts } = useGetContacts()

  return (
    <div className='flex flex-col overflow-auto'>
      <div className="flex items-center justify-between">
        <p className='text-2xl font-semibold mb-6 mt-3 ml-3'>Contacts</p>
        <Logout />
      </div>
      <Searchbar />
      <div className="flex flex-col gap-2 overflow-y-hidden hover:overflow-y-auto no-scrollbar">
        {
          loading
            ?
            <div className='flex flex-1 items-center justify-center gap-3'>
              <p>Loading Contact</p>
              <Loading />
            </div>
            : contacts.length !== 0 ? contacts.map(contact => (
              <People key={contact._id} contact={contact} emote={getRandomEmoji()} />
            ))
              : <p className='text-center'>No Contacts.</p>
        }
      </div>
    </div>
  )
}

export const Logout = () => {
  const { loading, logout } = useLogout()

  const onLogout = async () => {
    await logout()
  }

  return (
    <>
      <div className="px-[5px] me-2 btn btn-ghost hover:bg-error hover:text-white hover:bg-opacity-70" onClick={() => document.getElementById('logoutModal').showModal()}>
        {
          loading ? <Loading /> : <BiLogOut size={30} />
        }
      </div>
      <dialog id="logoutModal" className="modal backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-error">Warning</h3>
          <div className='divider p-0 m-0'></div>
          <p className="py-4 text-lg  font-medium">Are you sure want to Logout?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-block min-w-20 btn-outline">Close</button>
            </form>
            <button className="btn btn-error text-white min-w-20" onClick={onLogout}>Yes</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

const Searchbar = () => {
  const [search, setSearch] = useState('')
  const { getContacts } = useGetContacts()

  const handleSearch = async (event) => {
    event.preventDefault()
    await getContacts(search)
  }

  const handleOnChange = async (event) => {
    const value = event.target.value
    setSearch(value)
    if (value === '') await getContacts()
  }

  return (
    <form className='flex gap-3 mb-5 mr-3 ml-1' onSubmit={handleSearch}>
      <input onChange={handleOnChange} value={search} type="text" className="input bg-white bg-opacity-5 rounded-full w-full" placeholder='Search contacts' />
      <button type="submit" className='flex items-center justify-center btn btn-primary hover:text-white text-primary hover:border-1 hover:border-primary hover:bg-primary bg-transparent'>Search<AiOutlineSearch size={20} /></button>
    </form>
  )
}

export default Sidebar