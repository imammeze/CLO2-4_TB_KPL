import Tenant from "../models/tenantModel.js";

// Service ini akan menangani semua logika bisnis terkait tenant.

class TenantService {
  static async getAllTenants() {
    // Di masa depan, logika kompleks seperti pagination bisa ditambahkan di sini.
    return Tenant.findAll();
  }

  static async getTenantById(id) {
    const tenant = await Tenant.findOne(id);
    if (!tenant) {
      // Melempar error jika tenant tidak ditemukan
      const error = new Error("Tenant not found");
      error.statusCode = 404;
      throw error;
    }
    return tenant;
  }

  static async createTenant(tenantData) {
    // Logika bisnis sebelum menyimpan, misalnya validasi unik, bisa ditambahkan di sini.
    return Tenant.save(tenantData);
  }

  static async updateTenant(id, tenantData) {
    // Pastikan tenant ada sebelum update
    await this.getTenantById(id);
    return Tenant.update(id, tenantData);
  }

  static async deleteTenant(id) {
    // Pastikan tenant ada sebelum dihapus
    await this.getTenantById(id);
    return Tenant.delete(id);
  }
}

export default TenantService;
