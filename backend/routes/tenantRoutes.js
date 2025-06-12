// const express = require("express");
// const router = express.Router();
// const tenantController = require("../controllers/tenantController");

// // GET semua penghuni kost
// router.get("/kost", tenantController.getAllTenants);

// // GET penghuni kost berdasarkan ID
// router.get("/kost/:id", tenantController.getTenantById);

// // POST tambah penghuni kost baru
// router.post("/kost", tenantController.createTenant);

// // PUT update penghuni kost
// router.put("/kost/:id", tenantController.updateTenant);

// // DELETE hapus penghuni kost
// router.delete("/kost/:id", tenantController.deleteTenant);

// module.exports = router;

import express from "express";
import {
  getTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../controllers/tenantController.js";
import { tenantValidationRules, validate } from "../middleware/validator.js";

const router = express.Router();

router.get("/", getTenants);
router.get("/:id", getTenantById);
// Terapkan aturan validasi dan middleware pengecekan di sini
router.post("/", tenantValidationRules(), validate, createTenant);
router.patch("/:id", tenantValidationRules(), validate, updateTenant);
router.delete("/:id", deleteTenant);

export default router;
