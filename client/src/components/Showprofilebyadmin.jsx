import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL
const Showprofilebyadmin = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/showprofilebyadmin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch(err => console.error(err));
  }, [id]);

  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  if (loading) return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center">
      <p className="text-stone-500 text-sm">Loading...</p>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center">
      <p className="text-red-500 text-sm">User not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Back button */}
        <Link
          to="/Admin"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">User profile</h1>
        <p className="text-sm text-stone-400 mb-8">Viewing as admin — read only.</p>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
          <p className="font-semibold text-zinc-900">{name}</p>
        </div>

        <hr className="border-stone-300 mb-6" />

        {/* Fields */}
        {[
          { label: 'Email', value: email },
          { label: 'Name', value: name },
          { label: 'Telephone', value: profile.telephone },
          { label: 'Country', value: profile.country },
          { label: 'City', value: profile.city },
        ].map(({ label, value }) => (
          <div className="mb-5" key={label}>
            <label className="block text-sm font-medium text-zinc-700 mb-1">{label}</label>
            <div className="w-full border border-stone-300 rounded-md px-4 py-2.5 text-sm text-zinc-900 bg-stone-100">
              {value || <span className="text-stone-400">Not set</span>}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Showprofilebyadmin;