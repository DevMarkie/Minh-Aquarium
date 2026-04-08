from PIL import Image
import os

def split_horizontal(path):
    try:
        img = Image.open(path)
        width, height = img.size
        print(f"Kích thước ảnh chính: {width}x{height}")
        
        print("Đang cắt thành 3 lát cắt theo chiều ngang (trên, giữa, dưới)...")
        part_height = height // 3
        
        img1 = img.crop((0, 0, width, part_height))
        img2 = img.crop((0, part_height, width, part_height*2))
        img3 = img.crop((0, part_height*2, width, height))
        
        img1.save(os.path.join("anh", "banner_part1.png"))
        img2.save(os.path.join("anh", "banner_part2.png"))
        img3.save(os.path.join("anh", "banner_part3.png"))
        
        print("Hoàn tất! Đã cắt thành 3 tấm banner dài.")
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")

if __name__ == '__main__':
    split_horizontal(r"anh\banner.png")
