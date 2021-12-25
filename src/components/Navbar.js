import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";

const Navbar = () => {
  const { currentUser, signout } = useAuthProvider();
  const navigate = useNavigate();

  return (
    <div className="py-2 bg-light">
      <div className="container px-0 d-flex align-items-center justify-content-between">
        <h4 className="m-0 py-2 cursor-pointer" onClick={()=>navigate("/")}>CloudDrive</h4>
        {currentUser ? (
          <div className="dropdown">
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="profile-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar name={currentUser?.email} round size="30" textSizeRatio={2} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
                <li>
                  <button className="m-0 dropdown-item" onClick={() => signout()}>
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
