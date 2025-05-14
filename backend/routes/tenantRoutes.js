const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");

// GET semua penghuni kost
router.get("/kost", tenantController.getAllTenants);

// GET penghuni kost berdasarkan ID
router.get("/kost/:id", tenantController.getTenantById);

// POST tambah penghuni kost baru
router.post("/kost", tenantController.createTenant);

// PUT update penghuni kost
router.put("/kost/:id", tenantController.updateTenant);

// DELETE hapus penghuni kost
router.delete("/kost/:id", tenantController.deleteTenant);

module.exports = router;