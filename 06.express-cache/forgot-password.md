# Forgot Password

1. Gửi request kiểm tra email có tồn tại hay không?

- Nếu không tồn tại -> Bỏ qua
- Nếu tồn tại -> Tạo otp

* Gửi cho user qua email
* Lưu vào redis, expire khoảng 5 phút

Thông báo cho client -> Luôn thông báo thành công

2. Gửi otp lên server + password mới + confirm password mới

- Verify otp với redis -> Lấy userId
- Mã hóa password -> Update vào db
- Xóa otp trên redis
- Gửi email cho user

Ví dụ:

- Request 1: Tạo otp: otp_1234
- Request 2: Tạo otp: otp_1235

Triển khai:

key 1: `otp_{ma-otp}`
key 2: `otp_{userId}_{ma-otp}`
