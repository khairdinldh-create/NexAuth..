

import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar'


import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Admin from './components/Admin'
import Home from './components/Home'
import Noaccess from './components/Noaccess'


import PrivateRouter from './Privacy/PrivateRouter'
import PrivateRouterAdmin from './Privacy/PrivateRouterAdmin'
import ForceRedirect from './Privacy/ForceRedirect'
function App() {


  const user = {
    isconnected: false,
    role: 'usr'
  };


  return (


    <div>

    <Navbar user={user} />

    <Routes>

      <Route path='/' element={<Home />} />

    

      
      <Route path='/Register' element={ <ForceRedirect user={user} > <Register /></ForceRedirect>} />
      <Route path='/Login' element={ <ForceRedirect user={user} > <Login /></ForceRedirect>} />



      <Route path='/Profile' element={ <PrivateRouter user={user} > <Profile /></PrivateRouter>} />
     
      
      <Route path='/Admin' element={ <PrivateRouterAdmin user={user} > <Admin /></PrivateRouterAdmin>} />
      



     

      <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 Not Found</h1>} />

      <Route path='/Noaccess' element={<Noaccess />} />


    </Routes>
    
  

    </div>

  
  )
}

export default App
