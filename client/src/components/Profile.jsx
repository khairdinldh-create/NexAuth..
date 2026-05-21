import { useEffect, useState } from "react";
import Axios from "axios";


import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";

export default function Profile() {

  const {user} = useContext(GlobalContext);
 

  const Profilename=user.name;
  

  const [fetching, setFetching] = useState(true);




  

  const [form, setForm] = useState({
    telephone: "",
    country: "",
    city: "",
  });




  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };




  const validate = () => {
  const newErrors = {};

  // 1. Required
  if (!form.telephone.trim()) newErrors.telephone = "Telephone is required";
  if (!form.country.trim()) newErrors.country = "Country is required";
  if (!form.city.trim()) newErrors.city = "City is required";

  if (Object.keys(newErrors).length > 0) return newErrors;

  // 2. Telephone
  const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
  if (!phoneRegex.test(form.telephone.trim())) newErrors.telephone = "Invalid telephone number";

  // 3. Country
  const country = form.country.trim();
  if (country.length < 2) newErrors.country = "Country name is too short";
  else if (country.length > 50) newErrors.country = "Country name is too long";
  else if (!/^[a-zA-Z\s]+$/.test(country)) newErrors.country = "Country must contain letters only";

  // 4. City
  const city = form.city.trim();
  if (city.length < 2) newErrors.city = "City name is too short";
  else if (city.length > 50) newErrors.city = "City name is too long";
  else if (!/^[a-zA-Z\s]+$/.test(city)) newErrors.city = "City must contain letters only";

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
      const token = localStorage.getItem("token");
      const res = await Axios.post(
        "http://localhost:8000/profile",
        {
          telephone: form.telephone,
          country: form.country,
          city: form.city,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    );



      
      setSuccess(true);
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({
        general: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) { setFetching(false); return; }

  Axios.get("http://localhost:8000/profile", {  // ← no /:id
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      setForm({
        telephone: res.data.telephone || "",
        country: res.data.country || "",
        city: res.data.city || "",
      });
    })
    .catch((err) => console.error("Failed to fetch profile:", err))
    .finally(() => setFetching(false));


  axios.get("http://localhost:8000/user", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      
    })
    .catch((err) => console.error("Failed to fetch user:", err))
    .finally(() => setFetching(false));






}, []);



const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");
    await Axios.delete("http://localhost:8000/deleteprofile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Profile deleted successfully!");
    setSuccess(true);
    setForm({
      telephone: "",
      country: "",
      city: "",
    });





  } catch (error) {
    console.error("Failed to delete profile:", error);
  }
};


  const initials = user?.name
  ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  : '?';







  return (




<div className="min-h-screen bg-stone-200 flex items-center justify-center px-4 py-12">
  <div className="w-full max-w-[420px]">

    <h1 className="text-3xl font-bold text-zinc-900 mb-2">Your Profile</h1>
    <p className="text-sm text-stone-400 mb-8">Complete your profile information.</p>

    {/* Avatar + name */}
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium">
        {initials}
      </div>
      <div>
        <p className="font-semibold text-zinc-900">{user?.name}</p>
        <p className="text-sm text-stone-400">{user?.email}</p>
      </div>
    </div>

    <hr className="border-stone-300 mb-6" />

    {success && (
      <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-md">
        <p className="text-green-700 text-sm">
          {form.telephone === ""
            ? "Profile deleted successfully!"
            : "Profile saved successfully!"}
        </p>
      </div>
    )}

    <form onSubmit={handleSubmit}>

      <div className="mb-5">
        <label className="block text-sm font-medium text-zinc-700 mb-1">Telephone</label>
        <input
          type="tel"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="+213 123 456 789"
          className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
            ${errors.telephone ? "border-red-400" : "border-stone-300"}`}
        />
        {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
      </div>

      {/* Country + City horizontal */}
      <div className="flex flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Algeria"
            className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
              ${errors.country ? "border-red-400" : "border-stone-300"}`}
          />
          {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Algiers"
            className={`w-full border rounded-md px-4 py-2.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900
              ${errors.city ? "border-red-400" : "border-stone-300"}`}
          />
          {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3 bg-zinc-900 cursor-pointer text-white text-sm font-medium rounded-md
          hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleDelete}
        className="w-full mt-2 py-3 cursor-pointer bg-red-800 text-white text-sm font-medium rounded-md
          hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Deleting..." : "Delete Profile"}
      </button>

      {errors.general && (
        <p className="text-red-400 text-sm text-center mt-3">{errors.general}</p>
      )}

    </form>
  </div>
</div>
  );
};