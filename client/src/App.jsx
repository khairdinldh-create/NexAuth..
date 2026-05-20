

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
import Showprofilebyadmin from './components/Showprofilebyadmin'




import { useContext } from 'react'
import { GlobalContext } from './components/GlobalContext'

function App() {

  







  const { user } = useContext(GlobalContext);

  const userInfo = {
  isconnected: user ? true : false,
  role: user ? user.role : null
};


  return (

    
    <div>

    <Navbar user={userInfo} />

    <Routes>

      <Route path='/' element={<Home />} />

    

      
      <Route path='/Register' element={ <ForceRedirect user={userInfo} > <Register /></ForceRedirect>} />
      <Route path='/Login' element={ <ForceRedirect user={userInfo} > <Login /></ForceRedirect>} />



      <Route path='/Profile' element={ <PrivateRouter user={userInfo} > <Profile /></PrivateRouter>} />
     
      
      <Route path='/Admin' element={ <PrivateRouterAdmin user={userInfo} > <Admin /></PrivateRouterAdmin>} />


      <Route path='/admin/profile/user/:id' element={ <PrivateRouterAdmin user={userInfo} > <Showprofilebyadmin user={userInfo} /></PrivateRouterAdmin>} />


      



     

      <Route path='*' element={<h1 className='text-center text-3xl font-bold mt-10'>404 Not Found</h1>} />

      <Route path='/Noaccess' element={<Noaccess />} />


    </Routes>
    
  

    </div>

  
  )
}

export default App
