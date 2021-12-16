import Avatar from "react-avatar";
import { useAuthProvider } from "../context/AuthProvider";

const Navbar = () => {
  const { currentUser, signout } = useAuthProvider();

  return (
    <div className="py-2 bg-light">
      <div className="container d-flex align-items-center justify-content-between">
        <h4 className="m-0 py-2">CloudDrive</h4>
        {currentUser ? (
          <div className="dropdown">
            <div class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="profile-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar name={currentUser?.email} round size="30" textSizeRatio={2} />
              </button>
              <ul class="dropdown-menu" aria-labelledby="profile-dropdown">
                <li>
                  <button class="m-0 dropdown-item" onClick={() => signout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
