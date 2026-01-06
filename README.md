[MovieWeb]
Một ứng dụng web xem thông tin phim toàn diện được xây dựng với React.js và Tailwind CSS, tích hợp dữ liệu thời gian thực từ TMDB API.

🚀 Tính năng nổi bật
🎥 Khám phá điện ảnh
Danh sách đa dạng: Xem phim phổ biến (Popular), phim lẻ, phim bộ, xu hướng (Trending), và đánh giá cao (Top-rated).

Bộ lọc thông minh: Lọc phim theo thể loại (Genre), quốc gia (Country) và năm phát hành.

Tìm kiếm mạnh mẽ: Tìm kiếm phim yêu thích với dữ liệu thời gian thực.

🛠 Trải nghiệm người dùng (UX)
Movie Detail: Thông tin chi tiết về phim, tóm tắt nội dung, điểm đánh giá.

Video Trailer: Xem trực tiếp trailer từ YouTube ngay trên ứng dụng.

Review System: Đọc đánh giá từ cộng đồng người xem trên TMDB.

Light/Dark Mode: Giao diện linh hoạt, bảo vệ mắt người dùng với nút chuyển đổi nhanh.

Responsive Design: Tối ưu hóa hiển thị hoàn hảo trên Mobile, Tablet và Desktop.

👤 Cá nhân hóa (State Management)
Yêu thích & Wishlist: Thêm/Xóa phim vào danh sách yêu thích hoặc danh sách chờ xem.

Rating: Đánh giá số sao cho phim.

Profile Page: Hiển thị thông tin cá nhân và quản lý các danh sách đã lưu.

Notifications: Hệ thống thông báo giả lập (Mockup UI) cho các cập nhật mới.

🛠 Công nghệ sử dụng
Frontend: React.js (Hooks, Context API/Redux)

Styling: Tailwind CSS (Responsive, Dark Mode)

Icons: React Icons (FontAwesome, Lucide)

API: TMDB (The Movie Database)

HTTP Client: Axios / Fetch API

Deployment: Vercel / Netlify

📸 Demo hình ảnh
(Mẹo: Bạn nên chụp ảnh màn hình web của mình rồi chèn link ảnh vào đây)

⚙️ Cài đặt dự án
Để chạy dự án này ở môi trường local, hãy làm theo các bước sau:

Clone dự án:

Bash

git clone https://github.com/[username]/[repo-name].git
Cài đặt các thư viện:

Bash

npm install
Tạo file .env ở thư mục gốc và thêm API Key của bạn từ TMDB:

Đoạn mã

REACT_APP_TMDB_KEY=your_api_key_here
Chạy ứng dụng:

Bash

npm start
