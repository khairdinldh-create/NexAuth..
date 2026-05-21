import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios" // ✅ import useEffect

import { useNavigate } from "react-router-dom";



export default function Register() {
  const navigate = useNavigate();


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});







  const validate = () => {
    const newErrors = {};
  if (!fullName.trim()) newErrors.fullName = "Full name is required";
  if (!email.includes("@")) newErrors.email = "Enter a valid email";
  if (password.length < 8) newErrors.password = "Min 8 characters";
  if (!/[A-Z]/.test(password)) newErrors.password = "Must include uppercase letter";
  if (!/[0-9]/.test(password)) newErrors.password = "Must include a number";
  if (!/[!@#$%^&*]/.test(password)) newErrors.password = "Must include a symbol";
  if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
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
    const res = await Axios.post("http://localhost:8000/register", {
      name: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: "user"
    });

    
    setErrors({});







    // clear the form
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");


    navigate("/Login"); 


  } catch (error) {
    // show backend error under the form
   console.error(error);
  setErrors({ general: error.response?.data?.message || "Something went wrong" });
  } finally {
    setLoading(false);
  }
};






  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Title */}
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Create Account</h1>
        <p className="text-sm text-stone-400 mb-8">Join thousands of professionals worldwide.</p>






        <form onSubmit={handleSubmit}>





          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors({ ...errors, fullName: "" });
              }}
              placeholder="Ahmed Ben Ali"
              className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
                ${errors.fullName ? "border-red-400" : "border-stone-300"}`}
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            {errors.general && <p className="text-red-400 text-xs mt-1">{errors.general}</p>}
          </div>







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
            {errors.general && <p className="text-red-400 text-xs mt-1">{errors.general}</p>}
          </div>









          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="Min 6 characters"
                className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
                  ${errors.password ? "border-red-400" : "border-stone-300"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs hover:text-zinc-900"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

                  

            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            {errors.general && <p className="text-red-400 text-xs mt-1">{errors.general}</p>}
          </div>






          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                placeholder="Repeat your password"
                className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
                  ${errors.confirmPassword ? "border-red-400" : "border-stone-300"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs hover:text-zinc-900"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            {errors.general && <p className="text-red-400 text-xs mt-1">{errors.general}</p>}
          </div>







          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 cursor-pointer bg-zinc-900 text-white text-sm font-medium rounded-md
              hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>




        {errors.general && <p className="text-red-400 text-sm text-center mt-3">{errors.general}</p>}












        {/* Sign in link */}
        <p className="text-center text-sm text-stone-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-900 cursor-pointer font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}