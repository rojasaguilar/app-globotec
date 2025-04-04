import React from 'react'
import { UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

function BTN_AgregarUsuario({queAgregar,link}) {
  return (
    <div className='justify-center items-center bg-blue-600 py-1.5 px-4 rounded-md text-white flex w-fit h-fit space-x-2'>
    <UserPlus className='w-5 h-5'/>
    <Link to={link} className='font-medium'> Agregar {queAgregar} </Link>
</div>
  )
}

export default BTN_AgregarUsuario