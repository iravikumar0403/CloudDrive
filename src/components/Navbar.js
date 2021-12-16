import Avatar from 'react-avatar';
import { useAuthProvider } from '../context/AuthProvider';

const Navbar = () => {

  const { currentUser, signout } = useAuthProvider();

  return (
      <div className="d-flex align-items-center justify-content-between px-5 py-2 bg-light">
          <h4 className='m-0 py-2'>CloudDrive</h4>
          {
              currentUser ? <div className="dropdown">
              <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="profile-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar name={currentUser?.email} round size='50' textSizeRatio={3}/>
              </button>
              <ul class="dropdown-menu" aria-labelledby="profile-dropdown">
                <li><p class="m-0 dropdown-item" onClick={()=>signout()}>Logout</p></li>
              </ul>
            </div></div> : ""
          }
      </div>
  );
};

export default Navbar;
