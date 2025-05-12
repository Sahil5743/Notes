import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-black shadow p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">📝 My Notes App</h1>
        <nav className="flex gap-6 text-yellow-700 font-medium">
          <NavLink to="/" className="hover:text-yellow-600">Home</NavLink>
          <NavLink to="/notes" className="hover:text-yellow-600">Notes</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
