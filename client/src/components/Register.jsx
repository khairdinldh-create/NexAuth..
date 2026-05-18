import { useState } from "react";
import { Link } from "react-router-dom";
const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    )}
  </svg>
);

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const Field = ({ label, name, type = "text", placeholder, showToggle, show, onToggle }) => (
    <div className="mb-6">
      <label className="block text-[10px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showToggle ? (show ? "text" : "password") : type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-transparent border-b pb-2.5 pt-1 text-[15px] text-zinc-900 placeholder-stone-300 outline-none transition-colors duration-200
            ${errors[name] ? "border-red-400" : "border-stone-300 focus:border-zinc-900"}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-zinc-900 transition-colors"
          >
            <EyeIcon open={show} />
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1.5 text-[11px] tracking-wide text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  return (


    <div className="min-h-screen bg-stone-200 border-b border-stone-300 flex items-center justify-center px-4 pt-[50px] pb-[50px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>

      <div className="w-full max-w-[420px] font-dm">

        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-2">
          New Account
        </p>

        {/* Title */}
        <h1 className="font-playfair text-[48px] font-black leading-[1.05] tracking-tight text-zinc-900 mb-1">
          Create<br />
          <span className="font-playfair italic text-stone-400">Account.</span>
        </h1>

        <p className="text-[13px] text-stone-400 mb-10 mt-2">
          Join thousands of professionals worldwide.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Field label="Full Name" name="fullName" placeholder="Ahmed Ben Ali" />
          <Field label="Email Address" name="email" type="email" placeholder="ahmed@example.com" />
          <Field
            label="Password"
            name="password"
            placeholder="Min 6 characters"
            showToggle
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <Field
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Repeat your password"
            showToggle
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-zinc-900 text-[#f0ede8] text-[11px] font-medium tracking-[0.22em] uppercase rounded-sm
              flex items-center justify-center gap-3 transition-all duration-200
              hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
                Creating Account…
              </>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-[10px] tracking-[0.16em] uppercase text-stone-300">or</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Google */}
     

        {/* Sign in */}
        <p className="text-center text-[12px] text-stone-400 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-900 font-medium border-b border-zinc-900 pb-px hover:text-stone-500 hover:border-stone-500 transition-colors">
            Sign in
          </Link>
        </p>

        <p className="text-center text-[10px] text-stone-300 tracking-wide mt-5">
          By registering you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
}