from rembg import remove
import sys

def main():
    input_path = "anh.png"
    output_path = "logo_transparent.png"

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
