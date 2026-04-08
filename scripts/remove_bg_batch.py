from rembg import remove
import os

images = ["anh/banner_part1.png", "anh/banner_part2.png", "anh/banner_part3.png"]

print("Đang tải AI Model tách nền...")
for img_path in images:
    if os.path.exists(img_path):
        print(f"Bắt đầu tách nền cho: {img_path}")
        try:
            with open(img_path, 'rb') as i:
                input_image = i.read()
            output_image = remove(input_image)
            with open(img_path, 'wb') as o:
                o.write(output_image)
            print(f"-> Đã xóa phông nền thành công cho {img_path}")
        except Exception as e:
            print(f"Lỗi khi xử lý {img_path}: {e}")
    else:
        print(f"Không tìm thấy file: {img_path}")

print("Xong tất cả 3 ảnh!")
