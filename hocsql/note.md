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