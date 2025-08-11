import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from 'react-redux';
import { persistor } from '../../redux/store';
import { logoutUser } from "../../redux/user/user.actions";

const Navbar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

  	const toggleSidebar = () => {
    	setSidebarOpen((prev) => !prev);
  	};

  	const navigate = useNavigate();

  	const handleLogout = () => {
	    try {
	      logoutUser();
	      persistor.purge();
	      navigate('/', { replace: true });
	    } catch (error) {
	      console.error("Error during logout:", error);
	    }
  	};

	return (
		<Fragment>
			<nav className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between"
	             style={{ background: 'linear-gradient(135deg, #170b2b, #1b0943)' }}>
	            <div className="text-white text-xl font-bold">INJILI DASHBOARD</div>

	            <button className="text-white text-3xl cursor-pointer" onClick={toggleSidebar}>
	                <GiHamburgerMenu />
	            </button>
	        </nav>

        	<div
                className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ background: 'linear-gradient(135deg, #170b2b, #1b0943)', paddingTop: '64px' }} // Adjust padding to clear navbar
            >
                <div className="p-4 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                    <ul className="space-y-4">
                        <li><a href="#" className="block hover:text-purple-400 transition-colors">Genres</a></li>
                        <li><a href="#" className="block hover:text-purple-400 transition-colors">Watch Age</a></li>
                        <li><a href="#" className="block hover:text-purple-400 transition-colors">Tags</a></li>
                        <li><a href="#" className="block hover:text-purple-400 transition-colors">Plans</a></li>
                        <li><a href="#" className="block hover:text-purple-400 transition-colors">Add Content</a></li>
                    </ul>
                </div>
            </div>

            {/* Overlay to close sidebar when clicking outside */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </Fragment>
	);
}

export default Navbar;