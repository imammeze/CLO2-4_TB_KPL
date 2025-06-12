// const db = require("../config/db");

// const Tenant = {
//   getAll: async () => {
//     try {
//       const [rows] = await db.query(
//         "SELECT * FROM tenants ORDER BY created_at DESC"
//       );
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   },

//   getById: async (id) => {
//     try {
//       const [rows] = await db.query("SELECT * FROM tenants WHERE id = ?", [id]);
//       return rows[0];
//     } catch (error) {
//       throw error;
//     }
//   },

//   create: async (tenantData) => {
//     try {
//       const [result] = await db.query(
//         "INSERT INTO tenants (name, room_number, phone, email, entry_date, payment_status) VALUES (?, ?, ?, ?, ?, ?)",
//         [
//           tenantData.name,
//           tenantData.room_number,
//           tenantData.phone,
//           tenantData.email,
//           tenantData.entry_date,
//           tenantData.payment_status,
//         ]
//       );
//       return result.insertId;
//     } catch (error) {
//       throw error;
//     }
//   },

//   update: async (id, tenantData) => {
//     try {
//       const [result] = await db.query(
//         "UPDATE tenants SET name = ?, room_number = ?, phone = ?, email = ?, entry_date = ?, payment_status = ? WHERE id = ?",
//         [
//           tenantData.name,
//           tenantData.room_number,
//           tenantData.phone,
//           tenantData.email,
//           tenantData.entry_date,
//           tenantData.payment_status,
//           id,
//         ]
//       );
//       return result.affectedRows;
//     } catch (error) {
//       throw error;
//     }
//   },

//   delete: async (id) => {
//     try {
//       const [result] = await db.query("DELETE FROM tenants WHERE id = ?", [id]);
//       return result.affectedRows;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = Tenant;

import db from "../config/db.js";

class Tenant {
  // Get All Tenants
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM tenants";
      db.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Get Single Tenant by ID
  static findOne(id) {
    return new Promise((resolve, reject) => {
      // AMAN: Menggunakan parameterized query
      const sql = "SELECT * FROM tenants WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        // result adalah array, ambil elemen pertama
        resolve(result[0]);
      });
    });
  }

  // Create New Tenant
  static save(data) {
    return new Promise((resolve, reject) => {
      // AMAN: Menggunakan parameterized query
      const sql =
        "INSERT INTO tenants (name, phone, room_number, email, entry_date , payment_status) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        data.name,
        data.phone,
        data.room_number,
        data.email,
        data.entry_date,
        data.payment_status,
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve({ id: result.insertId, ...data });
      });
    });
  }

  // Update Tenant
  static update(id, data) {
    return new Promise((resolve, reject) => {
      // AMAN: Menggunakan parameterized query
      const sql =
        "UPDATE tenants SET name = ?, phone = ?, room_number = ?, email = ?, entry_date = ? , payment_status = ? WHERE id = ?";
      const values = [
        data.name,
        data.phone,
        data.room_number,
        data.email,
        data.entry_date,
        data.payment_status,
        id,
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Delete Tenant
  static delete(id) {
    return new Promise((resolve, reject) => {
      // AMAN: Menggunakan parameterized query
      const sql = "DELETE FROM tenants WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

export default Tenant;
