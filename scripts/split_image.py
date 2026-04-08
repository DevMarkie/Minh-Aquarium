from PIL import Image
import os

def split_image(path):
    try:
        img = Image.open(path)
        width, height = img.size
        print(f"Kích thước ảnh chính: {width}x{height}")
        
        # Determine split direction
        if width >= height:
            print("Đang tách ảnh theo chiều ngang làm 3 phần...")
            part_width = width // 3
            
            img1 = img.crop((0, 0, part_width, height))
            img2 = img.crop((part_width, 0, part_width*2, height))
            img3 = img.crop((part_width*2, 0, width, height))
            
            img1.save(os.path.join("anh", "banner_part1.png"))
            img2.save(os.path.join("anh", "banner_part2.png"))
            img3.save(os.path.join("anh", "banner_part3.png"))
        else:
            print("Đang tách ảnh theo chiều dọc làm 3 phần...")
            part_height = height // 3
            
            img1 = img.crop((0, 0, width, part_height))
            img2 = img.crop((0, part_height, width, part_height*2))
            img3 = img.crop((0, part_height*2, width, height))
            
            img1.save(os.path.join("anh", "banner_part1.png"))
            img2.save(os.path.join("anh", "banner_part2.png"))
            img3.save(os.path.join("anh", "banner_part3.png"))
            
        print("Hoàn tất! Đã lưu thành 3 ảnh: banner_part1.png, banner_part2.png, banner_part3.png trong thư mục 'anh'.")
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")

if __name__ == '__main__':
    split_image(r"anh\banner.png")
