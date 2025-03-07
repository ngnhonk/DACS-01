# 1. Chọn image cơ sở
FROM node:18

# 2. Thiết lập thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# 4. Copy toàn bộ source code vào container
COPY . .

# 5. Expose cổng chạy ứng dụng
EXPOSE 5000

# 6. Lệnh chạy ứng dụng khi container khởi động
CMD ["nodemon", "server.js"]
