// import { Fragment, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axiosInstance from '../../api/axios';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import { connect } from "react-redux";
// import { setCurrentUser } from "../../redux/user/user.actions";
// import { getDeviceId } from "../../DeviceId/deviceId";

// const Login = () => {
//     // State to manage which page is currently active ('signIn' or 'signUp')
//     const [currentPage, setCurrentPage] = useState('signIn');

//     const navigate = useNavigate();

//     const [ inputError, setInputError ] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '',
//         countryCode: ''
//     })

//     const [ showPassword, setShowPassword ] = useState(false);
//     const [ errMsg, setErrMsg ] = useState('');
//     const [ isLoading, setIsLoading ] = useState(false);
//     const [ countries, setCountries ] = useState([]);

//     // State to manage form data for both sign-in and sign-up
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '', // Only used for sign-up
//         countryCode: '36' // Default country code
//     });

//     // Array of common country codes with ID and ISO code
//     const countryCodes = [
//         { id: '+1', iso: 'US', name: 'United States' },
//         { id: '+44', iso: 'GB', name: 'United Kingdom' },
//         { id: '+91', iso: 'IN', name: 'India' },
//         { id: '+61', iso: 'AU', name: 'Australia' },
//         { id: '+81', iso: 'JP', name: 'Japan' },
//         { id: '+49', iso: 'DE', name: 'Germany' },
//         { id: '+33', iso: 'FR', name: 'France' },
//         { id: '+86', iso: 'CN', name: 'China' },
//         { id: '+55', iso: 'BR', name: 'Brazil' },
//         { id: '+7', iso: 'RU', name: 'Russia' },
//         { id: '+27', iso: 'ZA', name: 'South Africa' },
//         { id: '+64', iso: 'NZ', name: 'New Zealand' },
//         { id: '+34', iso: 'ES', name: 'Spain' },
//         { id: '+39', iso: 'IT', name: 'Italy' },
//         { id: '+52', iso: 'MX', name: 'Mexico' },
//         { id: '+1', iso: 'CA', name: 'Canada' },
//         // Add more country codes as needed
//     ];

//     useEffect(() => {
//         async function fetchData () {
//             try {
//                 const response = await axiosInstance.get('/api/v1/users/countries'); 

//                 if (response.data && response.data?.isSuccess) {
//                     setCountries(response.data?.data)
//                 }

//                 else throw new Error("Failed to get countries.");
//             }
//             catch (error) {
//                 // console.log(error);
//                 if (!error?.response) {
//                     setErrMsg("Failed to get countries. Try Again...");
//                 }
//                 else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                     setErrMsg(error.response?.data.message);
//                 }

//                 else if (error.response?.status === 401 || error.response?.status === 404) {
//                     setErrMsg(error.response?.data.message);
//                 }

//                 else {
//                     setErrMsg("Failed...");
//                 }
//             }
//         }

//         fetchData();
//     }, []);

//     // Handle input changes for all form fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     // Handle form submission for Sign In
//     const handleSignInSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password || !formData.countryCode) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     email: formData.email === '' ? true : false,
//                     password: formData.password === '' ? true : false
//                 }
//             });
//             return;
//         }

//         console.log('Sign In Data:', {
//             email: formData.email,
//             password: formData.password,
//             device_id: getDeviceId(),
//             country: formData.countryCode
//         });


//         try {
//             setIsLoading(true);

//             const response = await axiosInstance.post('/api/v1/auth/admin-login',
//                 {
//                     email: formData.email,
//                     password: formData.password,
//                     device_id: getDeviceId(),
//                     country: formData.countryCode
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 }
//             );

//             // console.log(response.data);

//             if (response.data && response.data?.isSuccess) {
//                 setUserInput({
//                     email: '',
//                     password: ''
//                 })

//                 setCurrentUser({
//                     email: userInput.email,
//                     token: response.data.token
//                 });

//                 // After login, navigate to the home page (Netflix-style)
//                 navigate('/home', { replace: true });
//             }

//             else {
//                 setErrMsg(response.data?.message);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         }

//         catch (error) {
//             window.scrollTo({ top: 0, behavior: 'smooth' });

//             // console.log(error);
//             if (!error?.response) {
//                 setErrMsg("Failed to Login In. Try Again...");
//             }
//             else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else if (error.response?.status === 401 || error.response?.status === 404) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else {
//                 setErrMsg("Login Failed...");
//             }
//         }

//         finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle form submission for Sign Up
//     const handleSignUpSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password || !formData.countryCode) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     email: formData.email === '' ? true : false,
//                     password: formData.password === '' ? true : false,
//                     confirmPassword: formData.confirmPassword === '' ? true : false
//                 }
//             });
//             return;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     password: formData.password === '' ? true : false,
//                     confirmPassword: formData.confirmPassword === '' ? true : false
//                 }
//             });
//             console.error("Passwords do not match!");
//             // In a real app, you'd show a user-friendly error message
//             return;
//         }

//         console.log('Sign Up Data:', {
//             email: formData.email,
//             password: formData.password,
//             countryCode: formData.countryCode
//         });
        
//         try {
//             setIsLoading(true);

//             const response = await axiosInstance.post('/api/v1/auth/admin-signup',
//                 {
//                     email: formData.email,
//                     password: formData.password,
//                     cpassword: formData.confirmPassword,
//                     device_id: getDeviceId(),
//                     country: formData.countryCode
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 }
//             );

//             // console.log(response.data);

//             if (response.data && response.data?.isSuccess) {
//                 setUserInput({
//                     email: '',
//                     password: ''
//                 })

//                 setCurrentUser({
//                     email: userInput.email,
//                     token: response.data.token
//                 });

//                 // After login, navigate to the home page (Netflix-style)
//                 navigate('/home', { replace: true });
//             }

//             else {
//                 setErrMsg(response.data?.message);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         }

//         catch (error) {
//             window.scrollTo({ top: 0, behavior: 'smooth' });

//             // console.log(error);
//             if (!error?.response) {
//                 setErrMsg("Failed to Login In. Try Again...");
//             }
//             else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else if (error.response?.status === 401 || error.response?.status === 404) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else {
//                 setErrMsg("Login Failed...");
//             }
//         }

//         finally {
//             setIsLoading(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword((prevState) => !prevState);
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center p-5 font-inter"
//              style={{
//                  // Updated custom gradient background with new colors
//                  background: 'radial-gradient(circle at top left, #3a1e4f, transparent), radial-gradient(circle at bottom right, #5a2a6c, transparent), linear-gradient(135deg, #170b2b, #1b0943)',
//                  backgroundSize: '200% 200%',
//                  animation: 'gradientAnimation 15s ease infinite'
//              }}>
//             {/* Define keyframes for gradient animation directly in style or via a global CSS file if preferred */}
//             <style>
//                 {`
//                 @keyframes gradientAnimation {
//                     0% { background-position: 0% 0%; }
//                     50% { background-position: 100% 100%; }
//                     100% { background-position: 0% 0%; }
//                 }

//                 .card-container {
//                     background: rgba(255, 255, 255, 0.05); /* Slightly transparent white for the card background */
//                     backdrop-filter: blur(10px); /* Frosted glass effect */
//                     border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
//                     box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Stronger shadow */
//                 }

//                 .input-field {
//                     background-color: rgba(255, 255, 255, 0.08); /* Darker input background */
//                     border: 1px solid rgba(255, 255, 255, 0.15); /* Input border */
//                     color: #ffffff; /* White text for input */
//                     transition: all 0.2s ease-in-out;
//                 }

//                 .input-field:focus {
//                     outline: none;
//                     border-color: #8a3a7c; /* Highlight on focus */
//                     box-shadow: 0 0 0 2px rgba(138, 58, 124, 0.5);
//                 }

//                 .input-field::placeholder {
//                     color: rgba(255, 255, 255, 0.5); /* Lighter placeholder text */
//                 }

//                 .btn-gradient {
//                     background: linear-gradient(90deg, #8a3a7c, #5a2e6f); /* Button gradient */
//                     transition: all 0.2s ease-in-out;
//                 }

//                 .btn-gradient:hover {
//                     background: linear-gradient(90deg, #9b4b8d, #6b3f80); /* Darker on hover */
//                     box-shadow: 0 4px 15px rgba(138, 58, 124, 0.4);
//                 }

//                 /* Style for the select dropdown */
//                 .select-field {
//                     background-color: rgba(255, 255, 255, 0.08);
//                     border: 1px solid rgba(255, 255, 255, 0.15);
//                     color: #ffffff;
//                     appearance: none; /* Remove default browser arrow */
//                     -webkit-appearance: none;
//                     -moz-appearance: none;
//                     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E"); /* Custom arrow */
//                     background-repeat: no-repeat;
//                     background-position: right 0.75rem center;
//                     background-size: 1.5em 1.5em;
//                 }
//                 .select-field option {
//                     background-color: #2b1a3d; /* Dark background for dropdown options */
//                     color: #ffffff;
//                 }
//                 `}
//             </style>

//             <div className="card-container p-8 md:p-12 rounded-xl w-full max-w-md mx-auto relative z-10">
//                 {isLoading ? (
//                   <div className="relative z-10 flex justify-center items-center h-50 pt-10">
//                     <div className="animate-spin h-12 w-12 border-4 border-blue-800 rounded-full border-t-transparent"></div>
//                   </div>
//                 ) : (
//                     <Fragment>
//                     <div className="text-center mb-8">
//                         <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">ARTIST DASHBOARD</h1>
//                         {/* Conditional greeting based on current page */}
//                         <h2 className="text-white text-2xl font-semibold mb-2">
//                             {currentPage === 'signIn' ? 'Hello, 👋 Welcome back!' : 'Hello, 👋 Join Us!'}
//                         </h2>
//                         <p className="text-gray-300 text-sm">Please enter your details below</p>
//                     </div>

//                     {errMsg && (
//                         <div className="mb-4 px-4 py-2 text-red-600 bg-red-100 border border-red-200 rounded w-full max-w-4xl">
//                           {errMsg}
//                         </div>
//                     )}

//                     {/* Navigation buttons */}
//                     <div className="flex justify-center mb-6 space-x-4">
//                       <button
//                         onClick={() => setCurrentPage('signIn')}
//                         className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
//                           currentPage === 'signIn'
//                             ? 'btn-gradient text-white shadow-md'
//                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         }`}
//                       >Sign In</button>
//                       <button
//                         onClick={() => setCurrentPage('signUp')}
//                         className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
//                           currentPage === 'signUp'
//                             ? 'btn-gradient text-white shadow-md'
//                             : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         }`}
//                       >Sign Up</button>
//                     </div>

//                     {/* Conditional rendering of forms */}
//                     {currentPage === 'signIn' ? (
//                         // Sign In Form
//                         <form onSubmit={handleSignInSubmit} className="space-y-6">
//                             <div>
//                                 <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
//                                 <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         placeholder="artist@gmail.com"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {inputError.email === true && (
//                                     <p className="text-red-500 text-xs">Please enter a valid email address.</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
//                                 <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         placeholder="Please enter your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-emerald-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.password === true && (
//                                     <p className="text-red-600 text-sm mt-1">Please enter your password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
//                                 <div className="relative">
//                                     <select
//                                         id="countryCode"
//                                         name="countryCode"
//                                         className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
//                                         value={formData.countryCode}
//                                         onChange={handleChange}
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={country?.id || index} value={country?.id}>
//                                                 {country?.iso_code}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="pt-4">
//                                 <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full cursor-pointer">
//                                     Sign In
//                                 </button>
//                             </div>
//                         </form>
//                     ) : (
//                         // Sign Up Form
//                         <form onSubmit={handleSignUpSubmit} className="space-y-6">
//                             <div>
//                                 <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
//                                 <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         placeholder="artist@gmail.com"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {inputError.email === true && (
//                                     <p className="text-red-500 text-xs">Please enter a valid email address.</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
//                                 <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         placeholder="Please enter your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-emerald-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.password === true && (
//                                     <p className="text-red-500 text-xs">Please enter your password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
//                                 <div className={`relative ${inputError.confirmPassword === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="confirmPassword"
//                                         name="confirmPassword"
//                                         placeholder="Please confirm your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-emerald-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.confirmPassword === true && (
//                                     <p className="text-red-500 text-xs">Please enter your confirm password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
//                                 <div className="relative">
//                                     <select
//                                         id="countryCode"
//                                         name="countryCode"
//                                         className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
//                                         value={formData.countryCode}
//                                         onChange={handleChange}
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={country?.id || index} value={country?.id}>
//                                                 {country?.iso_code}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="pt-4">
//                                 <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full">
//                                     Sign Up
//                                 </button>
//                             </div>
//                         </form>
//                     )}

//                     <div className="text-center mt-8 text-gray-400 text-xs">
//                         <p>Incase of any query contact our <a href="#" className="text-purple-400 hover:underline">Customer support</a></p>
//                     </div>
//                     </Fragment>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Login;


// dark blue theme

// import { Fragment, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axiosInstance from '../../api/axios';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import { connect } from "react-redux";
// import { setCurrentUser } from "../../redux/user/user.actions";
// import { getDeviceId } from "../../DeviceId/deviceId";

// const Login = () => {
//     // State to manage which page is currently active ('signIn' or 'signUp')
//     const [currentPage, setCurrentPage] = useState('signIn');

//     const navigate = useNavigate();

//     const [ inputError, setInputError ] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '',
//         countryCode: ''
//     })

//     const [ showPassword, setShowPassword ] = useState(false);
//     const [ errMsg, setErrMsg ] = useState('');
//     const [ isLoading, setIsLoading ] = useState(false);
//     const [ countries, setCountries ] = useState([]);

//     // State to manage form data for both sign-in and sign-up
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '', // Only used for sign-up
//         countryCode: '36' // Default country code
//     });

//     useEffect(() => {
//         async function fetchData () {
//             try {
//                 const response = await axiosInstance.get('/api/v1/users/countries'); 

//                 if (response.data && response.data?.isSuccess) {
//                     setCountries(response.data?.data)
//                 }

//                 else throw new Error("Failed to get countries.");
//             }
//             catch (error) {
//                 // console.log(error);
//                 if (!error?.response) {
//                     // setErrMsg("Failed to get countries. Try Again...");
//                 }
//                 else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                     setErrMsg(error.response?.data.message);
//                 }

//                 else if (error.response?.status === 401 || error.response?.status === 404) {
//                     setErrMsg(error.response?.data.message);
//                 }

//                 else {
//                     setErrMsg("Failed...");
//                 }
//             }
//         }

//         fetchData();
//     }, []);

//     // Handle input changes for all form fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     // Handle form submission for Sign In
//     const handleSignInSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password || !formData.countryCode) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     email: formData.email === '' ? true : false,
//                     password: formData.password === '' ? true : false
//                 }
//             });
//             return;
//         }

//         console.log('Sign In Data:', {
//             email: formData.email,
//             password: formData.password,
//             device_id: getDeviceId(),
//             country: formData.countryCode
//         });


//         try {
//             setIsLoading(true);

//             const response = await axiosInstance.post('/api/v1/auth/admin-login',
//                 {
//                     email: formData.email,
//                     password: formData.password,
//                     device_id: getDeviceId(),
//                     country: formData.countryCode
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 }
//             );

//             // console.log(response.data);

//             if (response.data && response.data?.isSuccess) {
//                 // Assuming setUserInput is defined elsewhere or this is a typo and should be setFormData
//                 // setInputError should be used here to clear errors if login is successful
//                 setInputError({
//                     email: '',
//                     password: '',
//                     confirmPassword: '',
//                     countryCode: ''
//                 });

//                 // Assuming setCurrentUser is a prop or defined via context/redux
//                 // For this example, I'll assume it's a Redux action
//                 // You also need to pass the correct data to setCurrentUser based on your Redux setup
//                 // If userInput is not defined, it should be formData.email
//                 // For demonstration, I'll use a placeholder for setCurrentUser if it's not from props
//                 // If setCurrentUser is from Redux, ensure it's mapped correctly in `connect`
//                 if (typeof setCurrentUser === 'function') {
//                     setCurrentUser({
//                         email: formData.email, // Use formData.email instead of userInput.email
//                         token: response.data.token
//                     });
//                 }


//                 // After login, navigate to the home page (Netflix-style)
//                 navigate('/home', { replace: true });
//             }

//             else {
//                 setErrMsg(response.data?.message);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         }

//         catch (error) {
//             window.scrollTo({ top: 0, behavior: 'smooth' });

//             // console.log(error);
//             if (!error?.response) {
//                 setErrMsg("Failed to Login In. Try Again...");
//             }
//             else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else if (error.response?.status === 401 || error.response?.status === 404) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else {
//                 setErrMsg("Login Failed...");
//             }
//         }

//         finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle form submission for Sign Up
//     const handleSignUpSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password || !formData.countryCode || !formData.confirmPassword) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     email: formData.email === '' ? true : false,
//                     password: formData.password === '' ? true : false,
//                     confirmPassword: formData.confirmPassword === '' ? true : false
//                 }
//             });
//             return;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             setInputError((prevState) => {
//                 return {
//                     ...prevState,
//                     password: true, // Indicate password mismatch
//                     confirmPassword: true // Indicate password mismatch
//                 }
//             });
//             setErrMsg("Passwords do not match!");
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//             return;
//         }

//         console.log('Sign Up Data:', {
//             email: formData.email,
//             password: formData.password,
//             countryCode: formData.countryCode
//         });
        
//         try {
//             setIsLoading(true);

//             const response = await axiosInstance.post('/api/v1/auth/admin-signup',
//                 {
//                     email: formData.email,
//                     password: formData.password,
//                     cpassword: formData.confirmPassword,
//                     device_id: getDeviceId(),
//                     country: formData.countryCode
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 }
//             );

//             // console.log(response.data);

//             if (response.data && response.data?.isSuccess) {
//                 setInputError({
//                     email: '',
//                     password: '',
//                     confirmPassword: '',
//                     countryCode: ''
//                 });

//                 if (typeof setCurrentUser === 'function') {
//                     setCurrentUser({
//                         email: formData.email, // Use formData.email instead of userInput.email
//                         token: response.data.token
//                     });
//                 }

//                 // After signup, navigate to the home page (Netflix-style)
//                 navigate('/home', { replace: true });
//             }

//             else {
//                 setErrMsg(response.data?.message);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//             }
//         }

//         catch (error) {
//             window.scrollTo({ top: 0, behavior: 'smooth' });

//             // console.log(error);
//             if (!error?.response) {
//                 setErrMsg("Failed to Sign Up. Try Again...");
//             }
//             else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else if (error.response?.status === 401 || error.response?.status === 404) {
//                 setErrMsg(error.response?.data.message);
//             }

//             else {
//                 setErrMsg("Sign Up Failed...");
//             }
//         }

//         finally {
//             setIsLoading(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword((prevState) => !prevState);
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center p-5 font-inter"
//              style={{
//                  // Updated custom gradient background with dark blue shades
//                  background: 'radial-gradient(circle at top left, #0A1128, transparent), radial-gradient(circle at bottom right, #001F54, transparent), linear-gradient(135deg, #03081E, #050A30)',
//                  backgroundSize: '200% 200%',
//                  animation: 'gradientAnimation 15s ease infinite'
//              }}>
//             {/* Define keyframes for gradient animation directly in style or via a global CSS file if preferred */}
//             <style>
//                 {`
//                 @keyframes gradientAnimation {
//                     0% { background-position: 0% 0%; }
//                     50% { background-position: 100% 100%; }
//                     100% { background-position: 0% 0%; }
//                 }

//                 .card-container {
//                     background: rgba(255, 255, 255, 0.05); /* Slightly transparent white for the card background */
//                     backdrop-filter: blur(10px); /* Frosted glass effect */
//                     border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
//                     box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Stronger shadow */
//                 }

//                 .input-field {
//                     background-color: rgba(255, 255, 255, 0.08); /* Darker input background */
//                     border: 1px solid rgba(255, 255, 255, 0.15); /* Input border */
//                     color: #ffffff; /* White text for input */
//                     transition: all 0.2s ease-in-out;
//                 }

//                 .input-field:focus {
//                     outline: none;
//                     border-color: #1565C0; /* Highlight on focus (a brighter blue) */
//                     box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.5);
//                 }

//                 .input-field::placeholder {
//                     color: rgba(255, 255, 255, 0.5); /* Lighter placeholder text */
//                 }

//                 .btn-gradient {
//                     background: linear-gradient(90deg, #0F4C75, #1B2A49); /* Button gradient (dark blue shades) */
//                     transition: all 0.2s ease-in-out;
//                 }

//                 .btn-gradient:hover {
//                     background: linear-gradient(90deg, #1A5276, #2C3E5B); /* Darker on hover */
//                     box-shadow: 0 4px 15px rgba(15, 76, 117, 0.4);
//                 }

//                 /* Style for the select dropdown */
//                 .select-field {
//                     background-color: rgba(255, 255, 255, 0.08);
//                     border: 1px solid rgba(255, 255, 255, 0.15);
//                     color: #ffffff;
//                     appearance: none; /* Remove default browser arrow */
//                     -webkit-appearance: none;
//                     -moz-appearance: none;
//                     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E"); /* Custom arrow */
//                     background-repeat: no-repeat;
//                     background-position: right 0.75rem center;
//                     background-size: 1.5em 1.5em;
//                 }
//                 .select-field option {
//                     background-color: #0A1128; /* Dark blue background for dropdown options */
//                     color: #ffffff;
//                 }
//                 `}
//             </style>

//             <div className="card-container p-8 md:p-12 rounded-xl w-full max-w-md mx-auto relative z-10">
//                 {isLoading ? (
//                     <div className="relative z-10 flex justify-center items-center h-50 pt-10">
//                         <div className="animate-spin h-12 w-12 border-4 border-blue-800 rounded-full border-t-transparent"></div>
//                     </div>
//                 ) : (
//                     <Fragment>
//                     <div className="text-center mb-8">
//                         <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">CREATOR DASHBOARD</h1>
//                         {/* Conditional greeting based on current page */}
//                         <h2 className="text-white text-2xl font-semibold mb-2">
//                             {currentPage === 'signIn' ? 'Hello, 👋 Welcome back!' : 'Hello, 👋 Join Us!'}
//                         </h2>
//                         <p className="text-gray-300 text-sm">Please enter your details below</p>
//                     </div>

//                     {errMsg && (
//                         <div className="mb-4 px-4 py-2 text-red-600 bg-red-100 border border-red-200 rounded w-full max-w-4xl">
//                             {errMsg}
//                         </div>
//                     )}

//                     {/* Navigation buttons */}
//                     <div className="flex justify-center mb-6 space-x-4">
//                         <button
//                             onClick={() => setCurrentPage('signIn')}
//                             className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
//                                 currentPage === 'signIn'
//                                 ? 'btn-gradient text-white shadow-md'
//                                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                             }`}
//                         >Sign In</button>
//                         <button
//                             onClick={() => setCurrentPage('signUp')}
//                             className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
//                                 currentPage === 'signUp'
//                                 ? 'btn-gradient text-white shadow-md'
//                                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                             }`}
//                         >Sign Up</button>
//                     </div>

//                     {/* Conditional rendering of forms */}
//                     {currentPage === 'signIn' ? (
//                         // Sign In Form
//                         <form onSubmit={handleSignInSubmit} className="space-y-6">
//                             <div>
//                                 <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
//                                 <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         placeholder="artist@gmail.com"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {inputError.email === true && (
//                                     <p className="text-red-500 text-xs">Please enter a valid email address.</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
//                                 <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         placeholder="Please enter your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.password === true && (
//                                     <p className="text-red-600 text-sm mt-1">Please enter your password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
//                                 <div className="relative">
//                                     <select
//                                         id="countryCode"
//                                         name="countryCode"
//                                         className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
//                                         value={formData.countryCode}
//                                         onChange={handleChange}
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={country?.id || index} value={country?.id}>
//                                                 {country?.iso_code}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="pt-4">
//                                 <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full cursor-pointer">
//                                     Sign In
//                                 </button>
//                             </div>
//                         </form>
//                     ) : (
//                         // Sign Up Form
//                         <form onSubmit={handleSignUpSubmit} className="space-y-6">
//                             <div>
//                                 <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
//                                 <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         placeholder="artist@gmail.com"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {inputError.email === true && (
//                                     <p className="text-red-500 text-xs">Please enter a valid email address.</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
//                                 <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         placeholder="Please enter your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.password === true && (
//                                     <p className="text-red-500 text-xs">Please enter your password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
//                                 <div className={`relative ${inputError.confirmPassword === true ? 'border-red-500' : 'border-gray-600'}`}>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="confirmPassword"
//                                         name="confirmPassword"
//                                         placeholder="Please confirm your password"
//                                         className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={togglePasswordVisibility}
//                                         className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </button>
//                                 </div>
//                                 {inputError.confirmPassword === true && (
//                                     <p className="text-red-500 text-xs">Please enter your confirm password</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
//                                 <div className="relative">
//                                     <select
//                                         id="countryCode"
//                                         name="countryCode"
//                                         className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
//                                         value={formData.countryCode}
//                                         onChange={handleChange}
//                                     >
//                                         {countries.map((country, index) => (
//                                             <option key={country?.id || index} value={country?.id}>
//                                                 {country?.iso_code}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="pt-4">
//                                 <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full">
//                                     Sign Up
//                                 </button>
//                             </div>
//                         </form>
//                     )}

//                     <div className="text-center mt-8 text-gray-400 text-xs">
//                         <p>Incase of any query contact our <a href="#" className="text-blue-400 hover:underline">Customer support</a></p>
//                     </div>
//                     </Fragment>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Connect to Redux if setCurrentUser is a Redux action
// const mapDispatchToProps = dispatch => ({
//     setCurrentUser: user => dispatch(setCurrentUser(user))
// });

// export default connect(null, mapDispatchToProps)(Login);

// logo color theme

import { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from '../../api/axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { getDeviceId } from "../../DeviceId/deviceId";

const Login = () => {
    // State to manage which page is currently active ('signIn' or 'signUp')
    const [currentPage, setCurrentPage] = useState('signIn');

    const navigate = useNavigate();

    const [ inputError, setInputError ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: ''
    })

    const [ showPassword, setShowPassword ] = useState(false);
    const [ errMsg, setErrMsg ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ countries, setCountries ] = useState([]);

    // State to manage form data for both sign-in and sign-up
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '', // Only used for sign-up
        countryCode: '36' // Default country code
    });

    // Array of common country codes with ID and ISO code
    const countryCodes = [
        { id: '+1', iso: 'US', name: 'United States' },
        { id: '+44', iso: 'GB', name: 'United Kingdom' },
        { id: '+91', iso: 'IN', name: 'India' },
        { id: '+61', iso: 'AU', name: 'Australia' },
        { id: '+81', iso: 'JP', name: 'Japan' },
        { id: '+49', iso: 'DE', name: 'Germany' },
        { id: '+33', iso: 'FR', name: 'France' },
        { id: '+86', iso: 'CN', name: 'China' },
        { id: '+55', iso: 'BR', name: 'Brazil' },
        { id: '+7', iso: 'RU', name: 'Russia' },
        { id: '+27', iso: 'ZA', name: 'South Africa' },
        { id: '+64', iso: 'NZ', name: 'New Zealand' },
        { id: '+34', iso: 'ES', name: 'Spain' },
        { id: '+39', iso: 'IT', name: 'Italy' },
        { id: '+52', iso: 'MX', name: 'Mexico' },
        { id: '+1', iso: 'CA', name: 'Canada' },
        // Add more country codes as needed
    ];

    useEffect(() => {
        async function fetchData () {
            try {
                const response = await axiosInstance.get('/api/v1/users/countries'); 

                if (response.data && response.data?.isSuccess) {
                    setCountries(response.data?.data)
                }

                else throw new Error("Failed to get countries.");
            }
            catch (error) {
                // console.log(error);
                if (!error?.response) {
                    // setErrMsg("Failed to get countries. Try Again...");
                }
                else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
                    setErrMsg(error.response?.data.message);
                }

                else if (error.response?.status === 401 || error.response?.status === 404) {
                    setErrMsg(error.response?.data.message);
                }

                else {
                    setErrMsg("Failed...");
                }
            }
        }

        fetchData();
    }, []);

    // Handle input changes for all form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission for Sign In
    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.countryCode) {
            setInputError((prevState) => {
                return {
                    ...prevState,
                    email: formData.email === '' ? true : false,
                    password: formData.password === '' ? true : false
                }
            });
            return;
        }

        console.log('Sign In Data:', {
            email: formData.email,
            password: formData.password,
            device_id: getDeviceId(),
            country: formData.countryCode
        });


        try {
            setIsLoading(true);

            const response = await axiosInstance.post('/api/v1/auth/admin-login',
                {
                    email: formData.email,
                    password: formData.password,
                    device_id: getDeviceId(),
                    country: formData.countryCode
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // console.log(response.data);

            if (response.data && response.data?.isSuccess) {
                // Assuming setUserInput is defined elsewhere or this is a typo and should be setFormData
                // setInputError should be used here to clear errors if login is successful
                setInputError({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    countryCode: ''
                });

                // Assuming setCurrentUser is a prop or defined via context/redux
                // For this example, I'll assume it's a Redux action
                // You also need to pass the correct data to setCurrentUser based on your Redux setup
                // If userInput is not defined, it should be formData.email
                // For demonstration, I'll use a placeholder for setCurrentUser if it's not from props
                // If setCurrentUser is from Redux, ensure it's mapped correctly in `connect`
                if (typeof setCurrentUser === 'function') {
                    setCurrentUser({
                        email: formData.email, // Use formData.email instead of userInput.email
                        token: response.data.token
                    });
                }


                // After login, navigate to the home page (Netflix-style)
                navigate('/home', { replace: true });
            }

            else {
                setErrMsg(response.data?.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        catch (error) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // console.log(error);
            if (!error?.response) {
                setErrMsg("Failed to Login In. Try Again...");
            }
            else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
                setErrMsg(error.response?.data.message);
            }

            else if (error.response?.status === 401 || error.response?.status === 404) {
                setErrMsg(error.response?.data.message);
            }

            else {
                setErrMsg("Login Failed...");
            }
        }

        finally {
            setIsLoading(false);
        }
    };

    // Handle form submission for Sign Up
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.countryCode || !formData.confirmPassword) {
            setInputError((prevState) => {
                return {
                    ...prevState,
                    email: formData.email === '' ? true : false,
                    password: formData.password === '' ? true : false,
                    confirmPassword: formData.confirmPassword === '' ? true : false
                }
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setInputError((prevState) => {
                return {
                    ...prevState,
                    password: true, // Indicate password mismatch
                    confirmPassword: true // Indicate password mismatch
                }
            });
            setErrMsg("Passwords do not match!");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        console.log('Sign Up Data:', {
            email: formData.email,
            password: formData.password,
            countryCode: formData.countryCode
        });
        
        try {
            setIsLoading(true);

            const response = await axiosInstance.post('/api/v1/auth/admin-signup',
                {
                    email: formData.email,
                    password: formData.password,
                    cpassword: formData.confirmPassword,
                    device_id: getDeviceId(),
                    country: formData.countryCode
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // console.log(response.data);

            if (response.data && response.data?.isSuccess) {
                setInputError({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    countryCode: ''
                });

                if (typeof setCurrentUser === 'function') {
                    setCurrentUser({
                        email: formData.email, // Use formData.email instead of userInput.email
                        token: response.data.token
                    });
                }

                // After signup, navigate to the home page (Netflix-style)
                navigate('/home', { replace: true });
            }

            else {
                setErrMsg(response.data?.message);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        catch (error) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // console.log(error);
            if (!error?.response) {
                setErrMsg("Failed to Sign Up. Try Again...");
            }
            else if (error.response?.status === 400 && !error.response.data?.isSuccess) {
                setErrMsg(error.response?.data.message);
            }

            else if (error.response?.status === 401 || error.response?.status === 404) {
                setErrMsg(error.response?.data.message);
            }

            else {
                setErrMsg("Sign Up Failed...");
            }
        }

        finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-5 font-inter"
             style={{
                 // Updated custom gradient background with #1fd9e8 and a darker blue to compliment
                 background: 'radial-gradient(circle at top left, #1fd9e8, transparent), radial-gradient(circle at bottom right, #001F54, transparent), linear-gradient(135deg, #1fd9e8, #050A30)',
                 backgroundSize: '200% 200%',
                 animation: 'gradientAnimation 15s ease infinite'
             }}>
            {/* Define keyframes for gradient animation directly in style or via a global CSS file if preferred */}
            <style>
                {`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                    100% { background-position: 0% 0%; }
                }

                .card-container {
                    background: rgba(255, 255, 255, 0.05); /* Slightly transparent white for the card background */
                    backdrop-filter: blur(10px); /* Frosted glass effect */
                    border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Stronger shadow */
                }

                .input-field {
                    background-color: rgba(255, 255, 255, 0.08); /* Darker input background */
                    border: 1px solid rgba(255, 255, 255, 0.15); /* Input border */
                    color: #ffffff; /* White text for input */
                    transition: all 0.2s ease-in-out;
                }

                .input-field:focus {
                    outline: none;
                    border-color: #1565C0; /* Highlight on focus (a brighter blue) */
                    box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.5);
                }

                .input-field::placeholder {
                    color: rgba(255, 255, 255, 0.5); /* Lighter placeholder text */
                }

                .btn-gradient {
                    background: linear-gradient(90deg, #1fd9e8, #001F54); /* Button gradient with new color and darker blue */
                    transition: all 0.2s ease-in-out;
                }

                .btn-gradient:hover {
                    background: linear-gradient(90deg, #37e1ef, #01286b); /* Darker on hover */
                    box-shadow: 0 4px 15px rgba(31, 217, 232, 0.4);
                }

                /* Style for the select dropdown */
                .select-field {
                    background-color: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #ffffff;
                    appearance: none; /* Remove default browser arrow */
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E"); /* Custom arrow */
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1.5em 1.5em;
                }
                .select-field option {
                    background-color: #0A1128; /* Dark blue background for dropdown options */
                    color: #ffffff;
                }
                `}
            </style>

            <div className="card-container p-8 md:p-12 rounded-xl w-full max-w-md mx-auto relative z-10">
                {isLoading ? (
                    <div className="relative z-10 flex justify-center items-center h-50 pt-10">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-800 rounded-full border-t-transparent"></div>
                    </div>
                ) : (
                    <Fragment>
                    <div className="text-center mb-8">
                        <h1 className="text-white text-3xl font-bold mb-2 tracking-wide">ARTIST DASHBOARD</h1>
                        {/* Conditional greeting based on current page */}
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            {currentPage === 'signIn' ? 'Hello, 👋 Welcome back!' : 'Hello, 👋 Join Us!'}
                        </h2>
                        <p className="text-gray-300 text-sm">Please enter your details below</p>
                    </div>

                    {errMsg && (
                        <div className="mb-4 px-4 py-2 text-red-600 bg-red-100 border border-red-200 rounded w-full max-w-4xl">
                            {errMsg}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-center mb-6 space-x-4">
                        <button
                            onClick={() => setCurrentPage('signIn')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
                                currentPage === 'signIn'
                                ? 'btn-gradient text-white shadow-md'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >Sign In</button>
                        <button
                            onClick={() => setCurrentPage('signUp')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap duration-200 ${
                                currentPage === 'signUp'
                                ? 'btn-gradient text-white shadow-md'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >Sign Up</button>
                    </div>

                    {/* Conditional rendering of forms */}
                    {currentPage === 'signIn' ? (
                        // Sign In Form
                        <form onSubmit={handleSignInSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                                <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="artist@gmail.com"
                                        className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {inputError.email === true && (
                                    <p className="text-red-500 text-xs">Please enter a valid email address.</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
                                <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Please enter your password"
                                        className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {inputError.password === true && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your password</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
                                <div className="relative">
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country, index) => (
                                            <option key={country?.id || index} value={country?.id}>
                                                {country?.iso_code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full cursor-pointer">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Sign Up Form
                        <form onSubmit={handleSignUpSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                                <div className={`relative ${inputError.email === true ? 'border-red-500' : 'border-gray-600'}`}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="artist@gmail.com"
                                        className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {inputError.email === true && (
                                    <p className="text-red-500 text-xs">Please enter a valid email address.</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">Password</label>
                                <div className={`relative ${inputError.password === true ? 'border-red-500' : 'border-gray-600'}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Please enter your password"
                                        className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {inputError.password === true && (
                                    <p className="text-red-500 text-xs">Please enter your password</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
                                <div className={`relative ${inputError.confirmPassword === true ? 'border-red-500' : 'border-gray-600'}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Please confirm your password"
                                        className="input-field w-full px-4 py-3 rounded-lg focus:ring-0"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-1 top-5 cursor-pointer text-gray-400 pr-3 hover:text-blue-500 transition duration-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {inputError.confirmPassword === true && (
                                    <p className="text-red-500 text-xs">Please enter your confirm password</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="countryCode" className="block text-gray-300 text-sm font-medium mb-1">Country Code</label>
                                <div className="relative">
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        className="select-field w-full px-4 py-3 rounded-lg focus:ring-0 pr-10"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                    >
                                        {countries.map((country, index) => (
                                            <option key={country?.id || index} value={country?.id}>
                                                {country?.iso_code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="btn-gradient text-white font-semibold py-3 rounded-lg shadow-md w-full">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="text-center mt-8 text-gray-400 text-xs">
                        <p>Incase of any query contact our <a href="#" className="text-blue-400 hover:underline">Customer support</a></p>
                    </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

// Connect to Redux if setCurrentUser is a Redux action
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Login);