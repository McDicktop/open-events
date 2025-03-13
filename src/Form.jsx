// import { useState } from "react";

// function Form() {
//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//         repeatPassword: "",
//     });

//     const [role, setRole] = useState("user");

//     const handleChange = (e, key) => {
//         setUser((prev) => ({ ...prev, [key]: e.target.value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (user.email && user.password && user.password === user.repeatPassword) {
//             console.log(user, role);
//             return;
//         }
//         console.log('invalid form data')
//     };

//     const handleRadioChange = (value) => {
//         setRole(value);
//     };

//     return (
//         <div className="shadow-lg rounded-xl flex flex-col justify-center items-center gap-4 my-8 border w-[362px] lg:w-[600px] mx-auto py-16 bg-white">
//             <form
//                 className="flex flex-col border rounded-3xl shadow-lg gap-4 p-8 mt-4"
//             // action=""
//             >
//                 <p className="text-3xl font-bold">Sign up</p>

//                 <div className="flex justify-between">
//                     <div className="w-30 p-2 border rounded-full border-gray-200">
//                         <input
//                             className="cursor-pointer"
//                             type="radio"
//                             id="user"
//                             value="user"
//                             checked={role === "user"}
//                             onChange={() => handleRadioChange("user")}
//                             style={{ display: "none" }}
//                         />
//                         <label
//                             htmlFor="user"
//                             className="ml-2 cursor-pointer"
//                         >Participant</label>
//                     </div>

//                     <div className="w-30 p-2 border rounded-full border-gray-200">
//                         <input
//                             className="cursor-pointer"
//                             type="radio"
//                             id="executor"
//                             value="executor"
//                             checked={role === "executor"}
//                             onChange={() => handleRadioChange("executor")}
//                         />
//                         <label
//                             htmlFor="executor"
//                             className="ml-2 cursor-pointer"
//                         >Performer</label>
//                     </div>
//                 </div>

//                 <div className="flex flex-col">
//                     <label className="text-gray-400" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         className="w-64 border border-gray-200 rounded-full px-3 py-1 outline-none"
//                         type="email"
//                         value={user.email}
//                         onChange={(e) => handleChange(e, "email")}
//                     />
//                 </div>

//                 <div className="flex flex-col">
//                     <label className="text-gray-400" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="w-64 border border-gray-200 rounded-full px-3 py-1 outline-none"
//                         type="password"
//                         value={user.password}
//                         autoComplete="true"
//                         onChange={(e) => handleChange(e, "password")}
//                     />
//                 </div>

//                 <div className="flex flex-col">
//                     <label className="text-gray-400" htmlFor="repeat">
//                         Repeat password
//                     </label>
//                     <input
//                         className="w-64 border border-gray-200 rounded-full px-3 py-1 outline-none"
//                         type="password"
//                         autoComplete="true"
//                         value={user.repeat}
//                         onChange={(e) => handleChange(e, "repeatPassword")}
//                     />
//                 </div>

//                 <button
//                     className="w-64 py-2 border rounded-full font-semibold bg-gray-300 text-white hover:opacity-80"
//                     onClick={handleSubmit}
//                 >{`Submit`}</button>
//             </form>
//         </div>
//     );
// }

// export default Form;
