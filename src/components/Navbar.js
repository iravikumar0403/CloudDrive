import Avatar from 'react-avatar';

const Navbar = () => {

  const currentUser = false;

  return (
      <div className="d-flex align-items-center justify-content-between px-5 py-2 bg-light">
          <h4 className='m-0 py-2'>CloudDrive</h4>
          {
              currentUser ? <Avatar name="Foo Bar" round size='50' textSizeRatio={3}/> : ""
          }
      </div>
  );
};

export default Navbar;
