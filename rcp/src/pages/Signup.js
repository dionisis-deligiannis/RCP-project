import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid'
import LaodingComponent from "../components/LoadingComponent";
import logo from "../images/logo.png";


export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
    isProducer: false
  });

  const navigate = useNavigate();
  const { name, email, password, error, loading, isProducer } = data;

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isProducer: isProducer,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/login");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  }

  if (loading) {
    return <LaodingComponent />
  }

  return (

    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
          <img src={logo} width={"150px"} className="mx-auto" alt="" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center py-4">

                <input
                  id="isProducer"
                  name="isProducer"
                  type="checkbox"
                  checked={isProducer}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="producer" className="ml-2 block text-sm text-gray-900">
                  Check if you are a producer
                </label>
              </div>
            </div>

            {error
              ?
              <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                {error}
              </div>

              : null}
            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {loading ? "Creating ..." : "Signup"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

/**
 * 
 function Signup_() {
   const [data, setData] = useState({
     name: "",
     email: "",
     password: "",
     error: null,
     loading: false,
     isProducer: false
   });
 
   const navigate = useNavigate();
   const { name, email, password, error, loading, isProducer } = data;
 
   function handleChange(e) {
     setData({
       ...data,
       [e.target.name]:
         e.target.type === "checkbox" ? e.target.checked : e.target.value
     });
   }
 
   async function handleSubmit(e) {
     e.preventDefault();
     setData({ ...data, error: null, loading: true });
     if (!name || !email || !password) {
       setData({ ...data, error: "All fields are required" });
     }
     try {
       const result = await createUserWithEmailAndPassword(
         auth,
         email,
         password
       );
       await setDoc(doc(db, "users", result.user.uid), {
         uid: result.user.uid,
         name,
         email,
         createdAt: Timestamp.fromDate(new Date()),
         isProducer: isProducer,
       });
       setData({
         name: "",
         email: "",
         password: "",
         error: null,
         loading: false,
       });
       navigate("/login");
     } catch (err) {
       setData({ ...data, error: err.message, loading: false });
     }
   }
 
   return (
     <section>
       <h3>Create An Account</h3>
       <form className="form" onSubmit={handleSubmit}>
         <div className="input_container">
           <label htmlFor="name">Name</label>
           <input type="text" name="name" value={name} onChange={handleChange} />
         </div>
         <div className="input_container">
           <label htmlFor="email">Email</label>
           <input
             type="text"
             name="email"
             value={email}
             onChange={handleChange}
           />
         </div>
         <div className="input_container">
           <label htmlFor="password">Password</label>
           <input
             type="password"
             name="password"
             value={password}
             onChange={handleChange}
           />
         </div>
         <div className="input_container">
           <input
             type="checkbox"
             name="isProducer"
             id="isProducer"
             checked={isProducer}
             onChange={handleChange}
           />
           <label htmlFor="producer">Check if you are a producer</label>
         </div>
         {error ? <p className="error">{error}</p> : null}
         <div className="btn_container">
           <button className="btn" disabled={loading}>
             {loading ? "Creating ..." : "Signup"}
           </button>
         </div>
       </form>
     </section>
   );
 }
 *  
 */