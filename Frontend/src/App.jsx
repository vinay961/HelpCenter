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
import UserRooms from './Components/UserRoom/UserRoom.jsx';
import EditRoom from './Components/EditRoom/EditRoom.jsx';
import FilteredRooms from './Components/Filter/Filter.jsx';
import Main from './Components/Book/Main.jsx'


function App() {

  return (
    <>
      <Router>
        {/* <Nav /> */}
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
          <Route path='/userRooms' element={<UserRooms />} />
          <Route path='/editroom' element={<EditRoom />} />
          <Route path='/filter/:location' element={< FilteredRooms />} />
          <Route path='/book' element={< Main/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
