import { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outer, Navbar } from "../../components";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Home = () => {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Outer>
				<Navbar />

        		<div className="col-span-full flex flex-grow items-center justify-center p-4 sm:p-6 lg:p-8">
					<main className="flex-grow flex items-center justify-center p-5 pt-20"> {/* pt-20 for navbar height */}
			            <div className="card-container p-8 md:p-12 rounded-xl w-full max-w-md mx-auto relative z-10 text-center">
			                <h2 className="text-white text-3xl font-bold mb-4">Welcome to Artist Dashboard!</h2>
			                <p className="text-gray-300 text-md mb-8">
			                    Your creative hub awaits. Manage your projects, track your progress, and connect with your audience.
			                    Everything you need to showcase your talent is right here.
			                </p>
			                <button
			                    onClick={() => console.log('Navigating to Dashboard')} // Replace with actual navigation logic
			                    className="btn-gradient text-white font-semibold py-3 px-8 rounded-lg shadow-md text-lg"
			                >
			                    View Dashboard
			                </button>
			            </div>
			        </main>
			    </div>
			</Outer>
		</Fragment>
	)
}

export default Home;