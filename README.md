# Soroban Mastermind

CONTEXT

Tôi muốn xây dựng một website luyện Soroban online, tập trung chủ yếu vào:

Luyện biểu diễn số trên bàn tính Soroban.

Luyện ảo tính / mental arithmetic bằng cách nhìn số trong thời gian cực ngắn rồi ghi nhớ và biểu diễn lại trên Soroban.

Có thêm một module luyện tính cộng/trừ, trong đó bài tập được tôi tự biên tập và upload, không tự động sinh công thức.

Tôi đã đính kèm một hình ảnh bàn tính Soroban làm visual reference chính.

Hãy sử dụng hình ảnh đính kèm làm reference về hình dáng, tỷ lệ, bố cục, màu sắc và phong cách của bàn tính.

Mục tiêu là tạo một bàn tính tương tác có hình thức giống hình reference ở mức tối đa có thể, nhưng bàn tính phải được dựng bằng HTML/CSS/React để các hạt thực sự hoạt động, không đặt ảnh làm background.

Không cần sao chép watermark hoặc các thành phần bản quyền của ảnh reference.

TASK

Xây dựng một web app luyện Soroban với 3 chế độ chính:

Chế độ 1 — Biểu diễn số

Người dùng được cho một số và phải dùng bàn tính Soroban để biểu diễn số đó.

Chế độ 2 — Ảo tính

Một số xuất hiện cực nhanh trong khoảng 0.3–2.0 giây, sau đó biến mất.

Người chơi phải ghi nhớ số và biểu diễn lại số đó trên bàn tính.

Chế độ 3 — Tính toán cộng/trừ

Người chơi luyện các bài cộng/trừ do người quản trị/tác giả upload sẵn.

Không tự động tạo công thức toán học cho module này.

1. BÀN TÍNH SOROBAN — VISUAL REFERENCE

Đây là thành phần quan trọng nhất của ứng dụng.

Hãy dùng hình ảnh tôi upload làm reference trực tiếp cho thiết kế.

Bàn tính cần có:

Khung ngoài màu đen/xám đậm.

Các góc khung bo tròn.

Một thanh ngang lớn chạy xuyên suốt bàn tính.

Các thanh dọc màu gỗ.

Hạt bàn tính màu nâu/cam gỗ.

Background sáng.

Phong cách giống bàn tính vật lý thật.

Hạt lớn, rõ ràng.

Tỷ lệ và spacing giữa các cột gần giống hình reference.

Không sử dụng ảnh làm bàn tính chính.

Phải render bàn tính bằng component React/CSS.

Số cột

Bàn tính mặc định có 11 cột, tương ứng với số tối đa 11 chữ số.

Các cột phải được đánh số logic từ hàng đơn vị đến hàng cao hơn nhưng không cần hiển thị số thứ tự trên giao diện.

Mỗi cột có:

1 hạt phía trên.

4 hạt phía dưới.

1 thanh ngang trung tâm.

Logic Soroban:

Hạt trên = 5.

Mỗi hạt dưới = 1.

Tổng mỗi cột từ 0 đến 9.

Ví dụ:

0 → không có hạt active

1 → 1 hạt dưới

2 → 2 hạt dưới

3 → 3 hạt dưới

4 → 4 hạt dưới

5 → hạt trên

6 → hạt trên + 1 hạt dưới

7 → hạt trên + 2 hạt dưới

8 → hạt trên + 3 hạt dưới

9 → hạt trên + 4 hạt dưới

Tương tác

Các hạt phải thực sự có thể thao tác:

Click.

Touch trên điện thoại.

Tap.

Có animation di chuyển ngắn và mượt.

Có trạng thái active/inactive rõ ràng.

Không animation quá dài.

Người chơi phải có cảm giác đang thao tác với một bàn tính thật.

2. MOBILE FIRST

Đây là yêu cầu bắt buộc.

Ứng dụng phải được thiết kế mobile-first.

Ưu tiên trải nghiệm trên:

320px

360px

375px

390px

414px

Sau đó mới mở rộng:

Tablet

Desktop

Trên mobile:

Bàn tính phải chiếm phần lớn chiều rộng màn hình.

Không làm hạt quá nhỏ.

Touch target phải đủ lớn.

Các cột phải đủ khoảng cách để tránh chạm nhầm.

Không cần zoom để thao tác.

Không có horizontal scrolling toàn trang.

Các nút lớn, dễ bấm bằng ngón tay.

Nếu cần, bàn tính có thể có một vùng scroll ngang chỉ dành riêng cho bàn tính, nhưng ưu tiên thiết kế để 11 cột vẫn nhìn và thao tác được trên mobile.

Không sử dụng breakpoint tùy chỉnh nếu Tailwind breakpoint chuẩn đã đủ.

3. MÀN HÌNH CHÍNH

Thiết kế giao diện tập trung, không phải dashboard SaaS.

Thứ tự ưu tiên:

Header đơn giản.

Chọn chế độ luyện tập.

Thông tin bài luyện.

Bàn tính Soroban.

Số / đề bài.

Nút điều khiển.

Giao diện cần có cảm giác giống một công cụ luyện Soroban chuyên dụng.

Không thêm các card, biểu đồ hoặc menu không cần thiết.

4. CHẾ ĐỘ "BIỂU DIỄN SỐ"

Tên hiển thị:

Biểu diễn số

Mục tiêu:

Hệ thống đưa ra một số.

Người chơi phải sử dụng bàn tính để biểu diễn chính xác số đó.

Chọn số chữ số

Có một control:

Số chữ số

Cho phép chọn:

1 chữ số

2 chữ số

3 chữ số

4 chữ số

5 chữ số

6 chữ số

7 chữ số

8 chữ số

9 chữ số

10 chữ số

11 chữ số

Ví dụ:

Số chữ số: [ 3 ▼ ]

Nếu chọn 3 chữ số, hệ thống tạo số có đúng 3 chữ số.

Nếu chọn 7 chữ số, hệ thống tạo số có đúng 7 chữ số.

Không tạo số có số 0 ở đầu nếu đang yêu cầu chính xác số chữ số.

5. SỐ LƯỢT CHƠI

Cho phép chọn:

Số câu

5 số

10 số

Ví dụ:

Số câu: [ 5 ▼ ]

Mỗi session sẽ có đúng số lượng câu đã chọn.

Hiển thị tiến trình:

Câu 2 / 5

hoặc:

Câu 7 / 10

6. NÚT "BIỂU DIỄN SỐ"

Có một nút chính:

Biểu diễn số

Khi nhấn:

Hệ thống tạo hoặc lấy số cần luyện.

Hiển thị số lớn, rõ ràng.

Bàn tính ở trạng thái 0.

Người chơi dùng các hạt để biểu diễn số.

Nhấn Kiểm tra.

Hệ thống kiểm tra trạng thái thực tế của 11 cột.

Nếu đúng → báo đúng.

Nếu sai → báo sai và cho phép làm lại.

Không chỉ kiểm tra text input.

Phải so sánh:

giá trị thực tế của 11 cột Soroban

với:

giá trị mục tiêu.

7. TIMER / ĐỒNG HỒ

Có đồng hồ đo thời gian người chơi hoàn thành mỗi câu.

Ví dụ:

00:04.72

Timer bắt đầu khi câu hỏi bắt đầu.

Timer dừng khi người chơi nhấn kiểm tra.

Hiển thị:

Thời gian câu hiện tại.

Thời gian tốt nhất.

Có thể hiển thị thời gian trung bình sau session.

Không để timer chạy khi chưa bắt đầu.

8. CHẾ ĐỘ "ẢO TÍNH"

Đây là tính năng quan trọng.

Tên:

Ảo tính

Mục tiêu:

Người chơi không nhìn số trong suốt thời gian luyện.

Số chỉ xuất hiện trong một khoảng thời gian rất ngắn.

Chọn số chữ số

Sử dụng cùng lựa chọn:

1–11 chữ số

Ví dụ:

Số chữ số: 5

Hệ thống tạo một số có 5 chữ số.

9. TỐC ĐỘ HIỂN THỊ SỐ TRONG ẢO TÍNH

Tạo control:

Thời gian hiển thị

Cho phép chọn từ:

0.3 giây đến 2.0 giây

Ví dụ các giá trị:

0.3s

0.4s

0.5s

0.6s

0.7s

0.8s

0.9s

1.0s

1.2s

1.5s

1.8s

2.0s

Có thể sử dụng slider để người dùng điều chỉnh nhanh.

Hiển thị rõ:

Tốc độ: 0.5 giây

10. LUỒNG HOẠT ĐỘNG ẢO TÍNH

Khi nhấn:

Bắt đầu ảo tính

Thực hiện chính xác flow sau:

Bước 1

Màn hình chuẩn bị:

Sẵn sàng?

Bước 2

Hiển thị số rất lớn ở trung tâm.

Ví dụ:

58327

Bước 3

Giữ số trên màn hình đúng thời gian người dùng đã chọn.

Ví dụ:

0.5 giây

Bước 4

Số biến mất hoàn toàn.

Bước 5

Bàn tính trở về trạng thái:

00000000000

Tất cả hạt ở trạng thái ban đầu.

Bước 6

Người chơi phải ghi nhớ số vừa nhìn thấy và tự thao tác các hạt để biểu diễn số đó.

Bước 7

Người chơi nhấn:

Kiểm tra

Bước 8

Ứng dụng so sánh giá trị thực tế trên Soroban với số vừa được hiển thị.

Bước 9

Hiển thị:

Đúng!

hoặc:

Sai

Nếu sai, cho phép xem:

Số mục tiêu.

Số người chơi biểu diễn.

Không tự động sửa bàn tính trước khi người chơi xem kết quả.

11. CHẾ ĐỘ ẢO TÍNH — 5 / 10 CÂU

Cho phép chọn:

5 số

hoặc:

10 số

Hiển thị:

Câu 1 / 5

Câu 2 / 5

...

Sau khi hoàn thành:

Hiển thị màn hình kết quả:

Kết quả luyện tập

Số câu đúng

Số câu sai

Tỷ lệ chính xác

Thời gian trung bình

Thời gian nhanh nhất

Số chữ số đã luyện

Tốc độ hiển thị

Có nút:

Luyện lại

12. CHẾ ĐỘ TÍNH TOÁN CỘNG / TRỪ

Tạo chế độ:

Tính toán

Đây là module riêng.

Quan trọng:

Không tự động sinh công thức toán học.

Tôi sẽ tự biên tập các phép tính và upload chúng lên hệ thống.

Ví dụ file tôi upload có thể chứa:

125 + 37 - 18

234 - 56 + 17

521 + 43 - 27

Ứng dụng phải sử dụng chính xác nội dung bài tập tôi upload.

Không tự sửa công thức.

Không tự thay đổi số.

Không tự sinh thêm phép tính nếu chưa được yêu cầu.

13. QUẢN LÝ / UPLOAD BỘ BÀI TẬP

Tạo một khu vực quản lý đơn giản:

Bộ bài tập

Cho phép tôi:

Upload bộ bài tập.

Đặt tên bộ bài tập.

Xem danh sách bộ bài.

Chọn bộ bài để luyện.

Xóa bộ bài.

Có thể upload bộ mới.

Ưu tiên hỗ trợ:

CSV

TXT

Nếu phù hợp, có thể hỗ trợ thêm Excel.

Không cần trình soạn thảo công thức phức tạp trong phiên bản đầu tiên.

14. CẤU TRÚC FILE BÀI TẬP

Thiết kế format đơn giản để tôi dễ biên tập.

Ví dụ CSV:

125 + 37 - 18
234 - 56 + 17
521 + 43 - 27
315 - 27 + 42


Mỗi dòng là một bài.

Hệ thống phải đọc nguyên văn từng dòng.

Chỉ chấp nhận:

số

dấu +

dấu -

khoảng trắng

Nếu file có dòng không hợp lệ:

Không crash.

Báo dòng nào lỗi.

Cho phép tôi sửa file và upload lại.

15. PHÂN LOẠI BÀI TÍNH

Khi luyện tính toán, cho phép lọc:

Số chữ số

2 chữ số

3 chữ số

4 chữ số

Số phép tính

2 phép tính

3 phép tính

Phép tính

Cộng

Trừ

Cộng và trừ

Nhưng việc phân loại phải dựa trên nội dung bài tôi upload.

Không tự tạo công thức mới.

Nếu bộ bài upload có metadata phù hợp, dùng metadata để phân loại.

Nếu không có metadata, có thể phân tích biểu thức để xác định số chữ số và số phép tính chỉ nhằm mục đích lọc/hiển thị, không nhằm sinh lại bài.

16. LUỒNG LUYỆN TÍNH TOÁN

Ví dụ người dùng chọn:

Số chữ số: 3

Số phép tính: 3

Phép tính: Cộng + Trừ

Sau đó chọn một bộ bài đã upload.

Ứng dụng lấy các bài phù hợp từ bộ bài đó.

Hiển thị:

125 + 37 - 18

Người chơi thực hiện phép tính bằng Soroban.

Không cần hiển thị đáp án ngay.

Có nút:

Kiểm tra

Sau khi kiểm tra:

Đúng / Sai.

Đáp án đúng.

Kết quả người chơi.

Thời gian hoàn thành.

17. KIỂM TRA SỐ TRÊN SOROBAN

Tạo một utility duy nhất chịu trách nhiệm:

numberToSoroban()

và:

sorobanToNumber()

Tất cả các chế độ phải dùng chung logic này.

Không tạo ba cách tính Soroban khác nhau.

Ví dụ:

58327

phải được chuyển thành trạng thái của 11 cột.

Ngược lại:

trạng thái 11 cột phải chuyển chính xác thành:

58327

Phải kiểm thử các trường hợp:

0

1

5

9

10

99

100

999

1000

999999

99999999999

18. DESIGN SYSTEM

Phong cách:

Physical Japanese Soroban + modern learning application

Không thiết kế theo phong cách SaaS dashboard.

Màu sắc chủ đạo lấy cảm hứng trực tiếp từ hình reference:

khung đen charcoal

hạt gỗ nâu/cam

thanh gỗ

background trắng/ivory

Bàn tính phải là thành phần thị giác nổi bật nhất.

Các button có thể sử dụng màu accent đỏ Nhật nhưng tiết chế.

Typography:

rõ ràng

lớn

dễ đọc

ưu tiên số

Các con số trong chế độ luyện phải rất lớn.

19. VISUAL MATCH VỚI ẢNH REFERENCE

Đây là yêu cầu quan trọng.

Hãy mở và phân tích hình ảnh reference tôi đã upload trước khi implement UI.

Cố gắng tái tạo:

tỷ lệ khung

độ dày khung

độ bo góc

vị trí thanh ngang

màu khung

màu thanh dọc

hình dáng hạt

kích thước hạt

khoảng cách giữa các cột

khoảng cách giữa hạt trên và hạt dưới

cảm giác 3D nhẹ của hạt

shadow

bố cục tổng thể

Không sử dụng stock image làm bàn tính tương tác.

Hình reference chỉ dùng làm thiết kế tham khảo.

Hãy tạo hạt bằng CSS/HTML/SVG hoặc component tương tác phù hợp.

Hình dáng hạt nên gần với hình reference: dạng hạt gỗ có phần giữa rộng và các cạnh vát.

20. RESPONSIVE SOROBAN

Trên desktop:

Bàn tính có thể lớn, đẹp và chiếm trung tâm.

Trên mobile:

Không làm biến dạng hạt.

Không ép 11 cột quá nhỏ.

Nếu cần, cho phép khu vực bàn tính có horizontal scrolling riêng.

Nhưng:

thanh điều khiển

timer

số mục tiêu

kết quả

menu

phải luôn nằm trong viewport.

Không để toàn bộ trang bị horizontal scrolling.

21. COMPONENT STRUCTURE

Tách component rõ ràng.

Ví dụ:

src/
  components/
    soroban/
      Soroban.tsx
      SorobanColumn.tsx
      SorobanBead.tsx
      SorobanFrame.tsx

    practice/
      NumberRepresentation.tsx
      MentalArithmetic.tsx
      CalculationPractice.tsx
      PracticeTimer.tsx
      PracticeControls.tsx

    exercises/
      ExerciseUploader.tsx
      ExerciseLibrary.tsx
      ExerciseSelector.tsx

  lib/
    soroban/
      numberToSoroban.ts
      sorobanToNumber.ts
      sorobanTypes.ts

    exercises/
      exerciseParser.ts
      exerciseValidator.ts
      exerciseFilter.ts


Có thể thay đổi cấu trúc nếu project cần, nhưng phải giữ logic Soroban độc lập khỏi UI.

22. STATE MANAGEMENT

Không cần authentication ở phiên bản đầu tiên.

Không cần payment.

Không cần profile người dùng.

Không cần social features.

Đối với MVP:

React state cho trạng thái luyện.

Local storage cho các thiết lập cá nhân nếu cần.

Dữ liệu bài tập upload có thể lưu local trong phiên bản prototype.

Nếu cần lưu bộ bài tập lâu dài hoặc dùng trên nhiều thiết bị, hãy thiết kế architecture để sau này có thể chuyển sang Supabase.

Không thêm backend phức tạp nếu chưa cần thiết.

23. ACCESSIBILITY

Đảm bảo:

Button có aria-label.

Touch target đủ lớn.

Keyboard accessible trên desktop.

Focus state rõ ràng.

Contrast tốt.

Không chỉ dùng màu để báo đúng/sai.

Timer có accessible label.

Chế độ luyện có trạng thái rõ ràng.

24. PERFORMANCE

Đây là app luyện tập nên thao tác phải rất nhanh.

Yêu cầu:

Không lag khi click liên tục vào hạt.

Animation ngắn.

Không render lại toàn bộ app khi chỉ một hạt thay đổi nếu có thể tránh.

Timer không gây re-render không cần thiết.

Không dùng thư viện animation nặng nếu CSS transition là đủ.

25. ERROR HANDLING

Xử lý:

File upload sai format.

Dòng bài tập không hợp lệ.

Biểu thức có ký tự không được phép.

File rỗng.

Số vượt quá 11 chữ số.

Không có bài phù hợp với bộ lọc.

Người chơi nhấn kiểm tra khi chưa bắt đầu.

Người chơi chưa thao tác bàn tính.

Lỗi đọc file.

Không để app crash.

Hiển thị lỗi bằng thông báo dễ hiểu bằng tiếng Việt.

26. TIẾNG VIỆT

Toàn bộ giao diện mặc định bằng tiếng Việt.

Các text chính:

Biểu diễn số

Ảo tính

Tính toán

Số chữ số

Số câu

Tốc độ hiển thị

Bắt đầu

Kiểm tra

Làm lại

Câu 1 / 5

Đúng

Sai

Đáp án

Thời gian

Bộ bài tập

Upload bài tập

Chọn bộ bài

27. INITIAL HOME SCREEN

Khi mở website, hiển thị 3 lựa chọn lớn:

BIỂU DIỄN SỐ

Luyện đặt số lên bàn tính.

ẢO TÍNH

Nhìn số trong thời gian rất ngắn rồi ghi nhớ và biểu diễn lại.

TÍNH TOÁN

Luyện cộng/trừ từ bộ bài tập do người dùng upload.

Chỉ sau khi chọn mode mới hiển thị các tùy chọn tương ứng.

28. QUY TẮC QUAN TRỌNG

Không thêm những tính năng tôi chưa yêu cầu.

Không thêm:

đăng nhập

thanh toán

chat

leaderboard

social

quảng cáo

dashboard thống kê phức tạp

Tập trung vào Soroban + luyện tập.

Không thay đổi logic Soroban để đơn giản hóa UI.

Không fake tương tác.

Không fake timer.

Không fake kiểm tra.

29. DEVELOPMENT APPROACH

Không cố làm tất cả trong một bước.

Hãy triển khai theo thứ tự:

Phase 1

Xây dựng bàn tính Soroban 11 cột giống visual reference.

Phase 2

Implement logic hạt và chuyển đổi:

number → soroban

soroban → number

Phase 3

Implement chế độ:

Biểu diễn số

Phase 4

Implement:

Ảo tính

bao gồm:

số chữ số

0.3–2 giây

5/10 câu

flash number

hide number

reset Soroban

người chơi biểu diễn

kiểm tra

kết quả

Phase 5

Implement:

Tính toán

Phase 6

Implement upload bộ bài tập.

Phase 7

Implement filter:

2/3/4 chữ số

2/3 phép tính

cộng

trừ

cộng + trừ

Phase 8

Mobile optimization.

Phase 9

Accessibility + performance.

Phase 10

Regression testing.

30. TEST CASE BẮT BUỘC

Sau khi hoàn thành, hãy tự kiểm tra:

Soroban

0

1

5

9

10

15

99

100

999

1000

9999

99999

99999999999

Biểu diễn số

1 chữ số

5 chữ số

11 chữ số

5 câu

10 câu

Ảo tính

0.3 giây

0.5 giây

1 giây

2 giây

1 chữ số

5 chữ số

11 chữ số

5 câu

10 câu

Tính toán

2 chữ số

3 chữ số

4 chữ số

2 phép tính

3 phép tính

cộng

trừ

cộng + trừ

upload file hợp lệ

upload file lỗi

Responsive

Kiểm tra tối thiểu:

320px

375px

390px

414px

768px

desktop

FINAL REQUIREMENT

Trước khi hoàn tất, hãy kiểm tra lại toàn bộ ứng dụng và đảm bảo:

Đây là một ứng dụng luyện Soroban thực sự, không phải mockup.

Bàn tính phải tương tác thật.

Logic hạt phải chính xác.

Chế độ biểu diễn số phải hoạt động thật.

Chế độ ảo tính phải thực sự ẩn số sau 0.3–2 giây.

Người chơi phải tự biểu diễn số trên bàn tính sau khi số biến mất.

Chế độ tính toán phải sử dụng đúng các bài tập tôi upload.

Không tự sinh công thức cho module tính toán.

Giao diện phải ưu tiên mobile.

Bàn tính phải có hình thức gần với hình reference tôi cung cấp nhất có thể.

Hãy bắt đầu bằng việc phân tích visual reference và xây dựng Phase 1: bàn tính Soroban 11 cột tương tác. Sau khi Phase 1 ổn định mới tiếp tục các phase tiếp theo.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://soroban-zen-master.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/510f3c22-ec78-412d-a678-2916195761b3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
