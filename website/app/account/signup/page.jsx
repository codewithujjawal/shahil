// "use client";  // Ensure it's a client component

// import Link from "next/link";
// import { useState } from "react";
// import { ToastContainer, toast, Bounce } from 'react-toastify';

// export default function SignUp() {
//     const [name, setName] = useState("");
//     const [userName, setUserName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleChange = (e) => {
//         if (e.target.name === "name") setName(value);
//         else if (e.target.name === "userName") setUserName(value);  // Ensure name matches input
//         else if (e.target.name === "email") setEmail(value);
//         else if (e.target.name === "password") setPassword(value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = { name, userName, email, password };

//         try {
//             let res = await fetch('/api/signup', {  // Use relative API path
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//             });

//             let response = await res.json();

//             if (res.ok && response.success) {
//                 setName('');
//                 setUserName('');
//                 setEmail('');
//                 setPassword('');

//                 toast.success(`${name}, your account is created`, { position: "top-right", autoClose: 3000, theme: "light", transition: Bounce });

//                 setTimeout(() => {
//                     window.location.href = "/";
//                 }, 3000);
//             } else {
//                 toast.error(response.message || 'Oops! Something went wrong', { position: "top-right", autoClose: 5000, theme: "light", transition: Bounce });
//             }
//         } catch (error) {
//             console.error("Error during submission:", error);
//             toast.error('Oops! Something went wrong', { position: "top-right", autoClose: 5000, theme: "light", transition: Bounce });
//         }
//     };

//     return (
//         <section className="bg-white dark:bg-gray-50 min-h-screen flex items-center justify-center">
//             <ToastContainer position="bottom-center" autoClose={5000} theme="light" transition={Bounce} />
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign up to your account</h1>
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
//                         <input
//                             onChange={handleChange}
//                             value={name}
//                             type="text"
//                             name="name"
//                             id="name"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             placeholder="Type your Name"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-700">Create a username</label>
//                         <input
//                             onChange={handleChange}
//                             value={userName}
//                             type="text"
//                             name="userName"
//                             id="userName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             placeholder="Choose a username"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
//                         <input
//                             onChange={handleChange}
//                             value={email}
//                             type="email"
//                             name="email"
//                             id="email"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             placeholder="Type your Email"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             onChange={handleChange}
//                             value={password}
//                             type="password"
//                             name="password"
//                             id="password"
//                             placeholder="••••••••••"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                         Sign up
//                     </button>
//                     <p className="text-sm text-center text-gray-600 mt-4">
//                         Already have an account?{" "}
//                         <Link href="/account/login" className="text-blue-500 hover:underline">Login</Link>
//                     </p>
//                 </form>
//             </div>
//         </section>
//     );
// }
