# Mô tả

Back-end cho RegistryTotal

# Cài đặt và chạy local

### 1. Clone

### 2. Cài đặt package

```bash
$ cd registrytotal_server

$ npm i
```

### 3. Tạo file .env và copy nội dung file .env.example vào file .env

```bash
$ cp .env.example .env
```

File ``` .env.example ``` chỉ là file ví dụ, có thể tuỳ chỉnh theo ý muốn

### 4. Chạy app

```bash
# development
$ npm start

# watch mode - nên chạy nếu sửa code liên tục
$ npm run start:dev
```

### 5. Mở danh sách API bằng Swagger

Vào browser truy cập ``` localhost:{port}/swag ```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
