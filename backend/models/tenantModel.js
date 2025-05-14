const db = require("../config/db");

const Tenant = {
  getAll: async () => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM tenants ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM tenants WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (tenantData) => {
    try {
      const [result] = await db.query(
        "INSERT INTO tenants (name, room_number, phone, email, entry_date, payment_status) VALUES (?, ?, ?, ?, ?, ?)",
        [
          tenantData.name,
          tenantData.room_number,
          tenantData.phone,
          tenantData.email,
          tenantData.entry_date,
          tenantData.payment_status,
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, tenantData) => {
    try {
      const [result] = await db.query(
        "UPDATE tenants SET name = ?, room_number = ?, phone = ?, email = ?, entry_date = ?, payment_status = ? WHERE id = ?",
        [
          tenantData.name,
          tenantData.room_number,
          tenantData.phone,
          tenantData.email,
          tenantData.entry_date,
          tenantData.payment_status,
          id,
        ]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM tenants WHERE id = ?", [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Tenant;