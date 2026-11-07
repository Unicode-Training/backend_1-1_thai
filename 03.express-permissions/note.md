# Setup Express

Dependency:

- express
- dotenv -> Load file .env

Dev Dependency:

- @types/express
- @types/node
- typescript
- tsx

## Setup TypeScript

## SQL

- Hàm thống kê: SUM, MAX, MIN, AVG, COUNT
- Không được select -> Nếu select phải nhóm
- Kết hợp với Group By
- Mệnh đề Having -> Lọc theo group

## Migration

- Lưu lịch sử thay đổi của database (Git của DB)

Ví dụ:

Member A

- Table 1, thêm 2 cột

Member B

- Pull từ git về
- Chạy migration (File đã tồn tại trên git từ Member B push)

Cách hoạt động trong Prisma

- Check schema có thay sự thay đổi -> Tự động ra file migration tương ứng
- Review
- Chạy migrate -> Thay đổi lên DB -> Lưu lại lịch sử migrate vào 1 bảng trong database

```
npx prisma migrate dev --name "abc"
```

Cách hoạt động trên Production

```
npx prisma migrate deploy
```

So sánh các file migration với bảng migration -> Tìm ra file cần chạy -> Áp dụng thay đổi vào database

## Cors

- Chính sách của trình duyệt (Chỉ bị chặn ở trình duyệt)
- Mục đích: Ngăn chặn tình trạng truy cập vào các tài nguyên backend mà backend không rõ nguồn gốc

Ví dụ: Domain A (Frontend) -> Request -> Domain B(Backend)

Phân biệt 2 loại request

1. Simple Request

- Request vẫn gửi lên backend bình thường
- Khi Response trả về -> Trình duyệt kiểm tra response header xem có các thông tin liên quan đến CORS hay không?

* Nếu có => Cho phép truy cập vào response
* Nếu không => Chặn truy cập response

2. Non-Simple Request

- Gửi request preflight (method: OPTIONS, url trùng với request chính) -> Response
- Trình duyệt check response của preflight xem có thông tin cors hay không?

* Nếu có -> Gửi request chính
* Nếu không có -> Chặn gửi request chính

Tình huống: Dùng dịch api bên thứ 3, chặn cors. Muốn gọi từ frontend lên api bên thứ 3

Frontend -> Proxy -> api bên thứ 3
