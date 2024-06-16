import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Nav from './Components/Nav.jsx'
import Home from './Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import About from './About/About.jsx';
import Contact from './Contact/Contact.jsx';
import Profile from './Components/Profile/Profile.jsx';
import PasswordChange from './Components/Password/Password.jsx';
import Rooms from './Components/Rooms/Rooms.jsx';
import RoomList from './Components/roomsPage/roomsPage.jsx';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={< Profile />} />
          <Route path='/changepassword' element={< PasswordChange />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/homelist' element={<RoomList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
