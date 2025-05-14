const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kost_app",
});

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query("CREATE DATABASE IF NOT EXISTS kost_app", (err) => {
    if (err) throw err;
    console.log("Database created or already exists");

    connection.query("USE kost_app", (err) => {
      if (err) throw err;

      const tenantTable = `
        CREATE TABLE IF NOT EXISTS tenants (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          room_number VARCHAR(10) NOT NULL,
          phone VARCHAR(20),
          email VARCHAR(100),
          entry_date DATE NOT NULL,
          payment_status ENUM('paid', 'unpaid') DEFAULT 'unpaid',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      connection.query(tenantTable, (err) => {
        if (err) throw err;
        console.log("Tenants table created or already exists");
      });
    });
  });

  connection.release();
});

module.exports = pool.promise();