import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Tell from './components/Tell'
import Dashboard from './components/Dashboard'
import Appearance from './components/Appearance'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import Share from './components/Share'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Preview from './components/Preview'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/tell' element={<Tell/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/appearance' element={<Appearance/>}/>
          <Route path='/analytics' element={<Analytics/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/share' element={<Share/>}/>
          <Route path='/preview' element={<Preview/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App