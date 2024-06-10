import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Nav from './Components/Nav.jsx'
import Home from './Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import About from './About/About.jsx';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
