from rembg import remove
import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

def main():
    input_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(PROJECT_ROOT, "anh.png")
    output_path = sys.argv[2] if len(sys.argv) > 2 else os.path.join(PROJECT_ROOT, "logo_transparent.png")

    try:
        print("Đang xử lý tách nền...")
        with open(input_path, 'rb') as i:
            input_image = i.read()
            
        output_image = remove(input_image)

        with open(output_path, 'wb') as o:
            o.write(output_image)

        print("Tách nền thành công! Ảnh mới: " + output_path)
    except Exception as e:
        print("Lỗi: ", e)

if __name__ == "__main__":
    main()
