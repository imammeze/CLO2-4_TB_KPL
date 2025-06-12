// const Tenant = require("../models/tenantModel");

// const tenantController = {
//   getAllTenants: async (req, res) => {
//     try {
//       const tenants = await Tenant.getAll();
//       res.status(200).json(tenants);
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   },

//   getTenantById: async (req, res) => {
//     try {
//       const tenant = await Tenant.getById(req.params.id);
//       if (!tenant) {
//         return res.status(404).json({ message: "Tenant not found" });
//       }
//       res.status(200).json(tenant);
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   },

//   createTenant: async (req, res) => {
//     try {
//       const { name, room_number, phone, email, entry_date, payment_status } =
//         req.body;

//       if (!name || !room_number || !entry_date) {
//         return res
//           .status(400)
//           .json({ message: "Name, room number, and entry date are required" });
//       }

//       const tenantId = await Tenant.create(req.body);
//       res.status(201).json({ message: "Tenant added successfully", tenantId });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   },

//   updateTenant: async (req, res) => {
//     try {
//       const tenant = await Tenant.getById(req.params.id);
//       if (!tenant) {
//         return res.status(404).json({ message: "Tenant not found" });
//       }

//       const updated = await Tenant.update(req.params.id, req.body);
//       res.status(200).json({ message: "Tenant updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   },

//   deleteTenant: async (req, res) => {
//     try {
//       const tenant = await Tenant.getById(req.params.id);
//       if (!tenant) {
//         return res.status(404).json({ message: "Tenant not found" });
//       }

//       await Tenant.delete(req.params.id);
//       res.status(200).json({ message: "Tenant deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   },
// };

// module.exports = tenantController;

import TenantService from "../models/tenantService.js";

// Wrapper untuk menangani async error secara otomatis
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get All Tenants
export const getTenants = asyncHandler(async (req, res) => {
  const tenants = await TenantService.getAllTenants();
  res.status(200).json(tenants);
});

// Get Tenant By Id
export const getTenantById = asyncHandler(async (req, res) => {
  const tenant = await TenantService.getTenantById(req.params.id);
  res.status(200).json(tenant);
});

// Create New Tenant
export const createTenant = asyncHandler(async (req, res) => {
  const newTenant = await TenantService.createTenant(req.body);
  res.status(201).json({
    message: "Tenant created successfully",
    data: newTenant,
  });
});

// Update Tenant
export const updateTenant = asyncHandler(async (req, res) => {
  await TenantService.updateTenant(req.params.id, req.body);
  res.status(200).json({ message: "Tenant updated successfully" });
});

// Delete Tenant
export const deleteTenant = asyncHandler(async (req, res) => {
  await TenantService.deleteTenant(req.params.id);
  res.status(200).json({ message: "Tenant deleted successfully" });
});

