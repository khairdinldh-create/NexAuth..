import { useState } from "react";
import { Link } from "react-router";
import Axios from "axios" // ✅ import useEffect


import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useContext(GlobalContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});







  const validate = () => {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Min 6 characters";
    return newErrors;
  };







  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setLoading(true);
  try {
    const res = await Axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    });


    localStorage.setItem("token", res.data.token);
    login(res.data.user);

    // check what comes back
    // next step → save user in context
    setErrors({});


    if (res.data.user.role === "admin") {
      navigate("/");
    } else {
      navigate("/");
    }







  } catch (error) {
    setErrors({ general: error.response?.data?.message || "Something went wrong" });
  } finally {
    setLoading(false);
  }
};








  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Title */}
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Sign In</h1>
        <p className="text-sm text-stone-400 mb-8">Good to see you again.</p>







        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              placeholder="ahmed@example.com"
              className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
                ${errors.email ? "border-red-400" : "border-stone-300"}`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>









          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Your password"
                className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
                  ${errors.password ? "border-red-400" : "border-stone-300"}`}
              />





              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 text-xs hover:text-zinc-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>





            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>




                  {errors.general && (
             <p className="text-red-400 text-sm text-center mt-3">{errors.general}</p>
                )}






          {/* Forgot password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-xs text-stone-400 hover:text-zinc-900 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>










          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-zinc-900 cursor-pointer text-white text-sm font-medium rounded-md
              hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>












        {/* Register link */}
        <p className="text-center text-sm text-stone-400 mt-6">
          Don't have an account?{" "}
          <Link to="/Register" className="text-zinc-900 font-medium hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}