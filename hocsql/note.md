# Bài toán

- Chức năng bình luận cho 2 đối tượng: Products, Posts

Size

- m
- s

Color

- red
- green

m - red
m - green
s - red
s - green

Chức năng comment đa cấp

- id
- title
- content
- parent_id

--> Đệ quy

Chức năng đăng ký tài khoản, admin xem được danh sách users

- id
- name
- email
- password
- provinceId
- wardId

Step 1:

- id
- name
- email
- password

Step 2: User vào upate

- provinceId
- wardId

Buổi sau:

Sub Query, Group by, having

```
users {
    id
    name
    email
    savedBy: []
}
```

## Phân tích case

- Khách hàng: Products -> 5000 sản phẩm
- Database ban đầu: Cột status (0,1,2)

* 0: Sản phẩm mới
* 1: Sản phẩm bán chạy
* 2: Sản phẩm nổi bật
  => Sắp xếp: Nổi bật -> Bán chạy -> mới

- Yêu cầu tính năng mới: Thêm trạng thái "Sắp ra mắt" -> Thêm status = 3
  Sắp xếp: Sản phẩm sắp ra mắt -> Sản phẩm bán chạy -> Sản phẩm nổi bật -> Sản phẩm mới
  => 3 -> 1 -> 2 -> 0

Giải pháp là gì?

## Transaction

Bài toán:

Cần chuỗi các công việc (Có điều kiện): Nếu tất cả thành công -> Thực thi (Commit), ngược lại: Khôi phục lại trạng thái ban đầu (Rollback)

BEGIN;

- Câu lệnh 1;
- Câu lệnh 2;
- Câu lệnh 3;

Quyết định: rollback hay commit;

- Lỗi cú pháp -> try catch -> Gửi rollback
- Lỗi logic

Không có lỗi gì -> Gửi commit

1 số tình huống

- Server backend sập khi lệnh commit, rollback chưa được gọi -> Khi backend kết nối lại -> rollback
- Database sập -> Khi DB Server khởi động lại -> Quét logs -> Rollback
