# Gunakan base image Node.js versi 20-alpine yang ringan
FROM node:20-alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi proyek
# Menggunakan --only=production agar devDependencies tidak diinstal di image final
RUN npm install --only=production

# Salin seluruh kode sumber aplikasi
COPY . .

# Ekspos port yang digunakan oleh aplikasi
EXPOSE 5000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD [ "node", "server.js" ]