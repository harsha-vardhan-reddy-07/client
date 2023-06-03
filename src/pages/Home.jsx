import React, { useContext} from 'react';
import '../styles/Home.css';
import { AuthContext } from '../context/authContext';


const Home = () => {


  const {logout} = useContext(AuthContext);
  const handleLogOut =(e)=>{
    e.preventDefault();
    logout();
  }



  return (
    <div className='homePage'>
        welcome home
        <button onClick={handleLogOut}>logout</button>
        {/* <h1>User Details</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p> */}

        <div className="createMeetContainer">
          <button>Create new meet</button>
        </div>

    </div>
  )
}

export default Home