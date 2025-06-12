// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditTenant = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [tenantData, setTenantData] = useState({
//     name: "",
//     room_number: "",
//     phone: "",
//     email: "",
//     entry_date: "",
//     payment_status: "unpaid",
//   });

//   const { name, room_number, phone, email, entry_date, payment_status } =
//     tenantData;

//   useEffect(() => {
//     const fetchTenant = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/kost/${id}`
//         );
//         const tenant = response.data;

//         const formattedDate = tenant.entry_date
//           ? tenant.entry_date.split("T")[0]
//           : "";

//         setTenantData({
//           name: tenant.name,
//           room_number: tenant.room_number,
//           phone: tenant.phone || "",
//           email: tenant.email || "",
//           entry_date: formattedDate,
//           payment_status: tenant.payment_status,
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tenant:", error);
//         setLoading(false);
//         navigate("/");
//       }
//     };

//     fetchTenant();
//   }, [id, navigate]);

//   const onChange = (e) => {
//     setTenantData({ ...tenantData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !room_number || !entry_date) {
//       alert("Nama, Nomor Kamar, dan Tanggal Masuk wajib diisi");
//       return;
//     }

//     setSaving(true);
//     try {
//       await axios.put(`http://localhost:5000/api/kost/${id}`, tenantData);
//       navigate("/");
//     } catch (error) {
//       console.error("Error updating tenant:", error);
//       alert("Gagal mengupdate data penghuni");
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Edit Data Penghuni
//       </h2>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <form onSubmit={onSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="name">
//               Nama
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               name="name"
//               value={name}
//               onChange={onChange}
//               placeholder="Masukkan nama penghuni"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="room_number">
//               Nomor Kamar
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="room_number"
//               type="text"
//               name="room_number"
//               value={room_number}
//               onChange={onChange}
//               placeholder="Masukkan nomor kamar"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="phone">
//               Telepon
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="phone"
//               type="text"
//               name="phone"
//               value={phone}
//               onChange={onChange}
//               placeholder="Masukkan nomor telepon"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               placeholder="Masukkan email"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="entry_date">
//               Tanggal Masuk
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="entry_date"
//               type="date"
//               name="entry_date"
//               value={entry_date}
//               onChange={onChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="payment_status">
//               Status Pembayaran
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="payment_status"
//               name="payment_status"
//               value={payment_status}
//               onChange={onChange}>
//               <option value="unpaid">Belum Lunas</option>
//               <option value="paid">Lunas</option>
//             </select>
//           </div>

//           <div className="flex items-center justify-between space-x-4">
//             <button
//               type="button"
//               className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
//               onClick={() => navigate("/")}>
//               Batal
//             </button>
//             <button
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
//               type="submit"
//               disabled={saving}>
//               {saving ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Menyimpan...
//                 </span>
//               ) : (
//                 "Simpan"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTenant;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import TenantForm from "./TenantForm";
// import { tenantService } from "../services/apiService";

// const EditTenant = () => {
//   const [initialData, setInitialData] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTenant = async () => {
//       try {
//         const data = await tenantService.getTenantById(id);
//         setInitialData(data);
//       } catch (error) {
//         alert(error.message);
//         navigate("/");
//       }
//     };
//     fetchTenant();
//   }, [id, navigate]);

//   const handleSave = async (data) => {
//     try {
//       await tenantService.updateTenant(id, data);
//       navigate("/");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // Tampilkan loading atau form jika data sudah ada
//   if (!initialData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <TenantForm
//       onSave={handleSave}
//       initialData={initialData}
//       title="Edit Tenant"
//     />
//   );
// };

// export default EditTenant;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenantForm from "./TenantForm";
import { tenantService } from "../services/apiService";

const EditTenant = () => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const data = await tenantService.getTenantById(id);
        setInitialData(data);
      } catch (error) {
        alert(error.message);
        navigate("/");
      }
    };
    fetchTenant();
  }, [id, navigate]);

  const handleSave = async (data) => {
    setLoading(true);
    try {
      // NOTE: Backend saat ini hanya akan menyimpan name, phone, room_number.
      // Kolom lain akan diabaikan sampai backend diupdate.
      await tenantService.updateTenant(id, data);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Tampilkan loading jika data belum siap
  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <TenantForm
      onSave={handleSave}
      initialData={initialData}
      title="Edit Data Penghuni"
      loading={loading}
    />
  );
};

export default EditTenant;
