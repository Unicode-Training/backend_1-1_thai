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
