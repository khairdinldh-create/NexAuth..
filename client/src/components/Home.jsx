import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export default function Home() {
  const { user } = useContext(GlobalContext);

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-stone-200">

      {/* Hero */}
      <div className="max-w-3xl mx-auto pt-20 pb-12 px-6 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-300 text-stone-600 mb-4">
          MERN Stack App
        </span>
        <h1 className="text-4xl font-bold text-stone-800 mb-4">
          Welcome back{user?.name ? ", " + user.name : ""}
        </h1>
        <p className="text-gray-500 text-base mb-8">
          Manage your profile, update your info, and stay in control of your account.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => goTo("/Profile")}
            className="px-6 py-2.5 rounded-lg bg-stone-700 cursor-pointer text-white text-sm font-medium hover:bg-stone-800 transition"
          >
            My Profile
          </button>
         
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-medium text-stone-800 mb-1">Your Profile</h3>
          <p className="text-sm text-gray-400">View and update your personal information anytime.</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-medium text-stone-800 mb-1">Secure Auth</h3>
          <p className="text-sm text-gray-400">JWT-based authentication keeps your account safe.</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-medium text-stone-800 mb-1">Role Based Access</h3>
          <p className="text-sm text-gray-400">Admins and users each have their own protected area.</p>
        </div>
      </div>

    </div>
  );
}