import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import About from './About';

const Navbar = () => {
  const location = useLocation();
  const [aboutSectionVisibility, setAboutSectionVisibility] = React.useState(false);

  const handleAboutClick = () => {
    setAboutSectionVisibility(!aboutSectionVisibility);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 z-50">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-extrabold">
            <a href="/">ZETA FT</a>
          </div>
          <ul className='flex flex-row text-white text-xl font-extrabold space-x-6 pr-5'>
            {location.pathname !== '/dashboard' && (
              <>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
              </>
            )}
            {location.pathname === '/dashboard' && (
              <li><a href="#" onClick={handleAboutClick}>About</a></li>
            )}
          </ul>
        </div>
      </nav>
      {aboutSectionVisibility && <About />}
    </>
  );
};

export default Navbar;
