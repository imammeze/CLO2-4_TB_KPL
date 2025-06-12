// import React, { useState, useEffect } from "react";

// const TenantForm = ({
//   onSave,
//   initialData = { name: "", phone: "", room_number: "" },
//   title,
// }) => {
//   const [formData, setFormData] = useState(initialData);

//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div>
//       <h1 className="title">{title}</h1>
//       <div className="card">
//         <div className="card-content">
//           <form onSubmit={handleSubmit}>
//             <div className="field">
//               <label className="label">Name</label>
//               <div className="control">
//                 <input
//                   type="text"
//                   className="input"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label className="label">Phone</label>
//               <div className="control">
//                 <input
//                   type="text"
//                   className="input"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Phone Number"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field">
//               <label className="label">Room Number</label>
//               <div className="control">
//                 <input
//                   type="text"
//                   className="input"
//                   name="room_number"
//                   value={formData.room_number}
//                   onChange={handleChange}
//                   placeholder="Room Number"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="field mt-5">
//               <button type="submit" className="button is-success">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenantForm;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Fungsi untuk memformat tanggal ke YYYY-MM-DD untuk input type="date"
const formatDateForInput = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toISOString().split("T")[0];
};

const TenantForm = ({ onSave, initialData, title, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    room_number: "",
    email: "",
    entry_date: "",
    payment_status: "unpaid", // default value
  });

  // useEffect untuk mengisi form dengan data awal saat mode edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        room_number: initialData.room_number || "",
        email: initialData.email || "",
        // Format tanggal agar sesuai dengan input date
        entry_date: formatDateForInput(initialData.entry_date),
        payment_status: initialData.payment_status || "unpaid",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-lg mx-auto my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name">
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama penghuni"
              required
            />
          </div>

          {/* Nomor Kamar */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="room_number">
              Nomor Kamar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="room_number"
              type="text"
              name="room_number"
              value={formData.room_number}
              onChange={handleChange}
              placeholder="Masukkan nomor kamar"
              required
            />
          </div>

          {/* Telepon */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone">
              Telepon
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
            />
          </div>

          {/* Tanggal Masuk */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="entry_date">
              Tanggal Masuk
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="entry_date"
              type="date"
              name="entry_date"
              value={formData.entry_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status Pembayaran */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="payment_status">
              Status Pembayaran
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="payment_status"
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}>
              <option value="unpaid">Belum Lunas</option>
              <option value="paid">Lunas</option>
            </select>
          </div>

          {/* Tombol Simpan dan Kembali */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-blue-300"
              type="submit"
              disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                "Simpan"
              )}
            </button>
            <Link
              to="/"
              className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantForm;
