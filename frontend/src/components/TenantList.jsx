// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const TenantList = () => {
//   const [tenants, setTenants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTenants();
//   }, []);

//   const fetchTenants = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/kost");
//       setTenants(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching tenants:", error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (
//       window.confirm("Apakah Anda yakin ingin menghapus data penghuni ini?")
//     ) {
//       try {
//         await axios.delete(`http://localhost:5000/api/kost/${id}`);
//         fetchTenants();
//       } catch (error) {
//         console.error("Error deleting tenant:", error);
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Daftar Penghuni Kost
//         </h2>
//       </div>

//       {tenants.length === 0 ? (
//         <div className="bg-white shadow-md rounded-lg p-6 text-center">
//           <p className="text-gray-600">Belum ada data penghuni</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {tenants.map((tenant) => (
//             <div
//               key={tenant.id}
//               className="bg-white shadow-md rounded-lg overflow-hidden">
//               <div className="bg-blue-500 px-4 py-2">
//                 <h3 className="text-lg font-bold text-white truncate">
//                   {tenant.name}
//                 </h3>
//               </div>
//               <div className="p-4">
//                 <div className="mb-4">
//                   <p className="text-gray-700">
//                     <span className="font-semibold">No. Kamar:</span>{" "}
//                     {tenant.room_number}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Telepon:</span>{" "}
//                     {tenant.phone || "-"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Email:</span>{" "}
//                     {tenant.email || "-"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Tanggal Masuk:</span>{" "}
//                     {formatDate(tenant.entry_date)}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Status Pembayaran:</span>{" "}
//                     <span
//                       className={
//                         tenant.payment_status === "paid"
//                           ? "text-green-600 font-medium"
//                           : "text-red-600 font-medium"
//                       }>
//                       {tenant.payment_status === "paid"
//                         ? "Lunas"
//                         : "Belum Lunas"}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Link
//                     to={`/edit/${tenant.id}`}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(tenant.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
//                     Hapus
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tenantService } from "../services/apiService";

// Helper function untuk format tanggal (karena data tanggal belum ada)
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const TenantList = () => {
  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    try {
      const data = await tenantService.getTenants();
      setTenants(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data penghuni ini?")
    ) {
      try {
        await tenantService.deleteTenant(id);
        fetchTenants(); // Ambil ulang data setelah berhasil hapus
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    // Pastikan Anda telah menginstal Tailwind CSS agar kelas-kelas ini berfungsi
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Daftar Penghuni Kost
        </h2>
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Tambah Baru
        </Link>
      </div>

      {tenants.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">Belum ada data penghuni</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => {
            return (
              <div
                key={tenant.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1">
                <div className="bg-blue-500 px-4 py-2">
                  <h3 className="text-lg font-bold text-white truncate">
                    {tenant.name}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="mb-4 space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">No. Kamar:</span>{" "}
                      {tenant.room_number}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Telepon:</span>{" "}
                      {tenant.phone || "-"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span>{" "}
                      {tenant.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Tanggal Masuk:</span>{" "}
                      {formatDate(tenant.entry_date)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Status Pembayaran:</span>{" "}
                      <span
                        className={
                          tenant.payment_status === "paid"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }>
                        {tenant.payment_status === "paid"
                          ? "Lunas"
                          : "Belum Lunas"}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/edit/${tenant.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(tenant.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TenantList;
