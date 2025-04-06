import React from 'react'
import SearchInput from '../SearchInput'
import { UserPlus} from 'lucide-react'
import { Link } from 'react-router-dom'

function Header() {
  return (
   <div className='flex flex-col gap-4 w-full pt-4 px-8 rounded-lg'>
    {/* Primera columna */}
        <div className='w-full flex justify-between'>
            <div className='flex-col space-y-1'>
            <p className='text-2xl font-semibold'>Cliente</p>
            <p className="className text-sm text-gray-500">Editar Cliente</p>
            </div> 
            <Link to={"/clientes/agregar"} className='flex gap-2 bg-blue-500 items-center h-fit rounded-md px-4 py-1 text-white font-medium'> <UserPlus className='w-5 h-5'/> Agregar Cliente</Link>
        
        </div>
    
   </div>
  )
}

export default Header