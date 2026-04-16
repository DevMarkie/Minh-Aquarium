import google.generativeai as genai
import os

# 1. Cấu hình API Key từ biến môi trường
api_key = os.getenv("GEMINI_API_KEY", "")
if not api_key:
    raise RuntimeError("Thiếu GEMINI_API_KEY trong môi trường.")

genai.configure(api_key=api_key)

# 2. Khởi tạo model Gemini 1.5 Flash (nhanh và free nhất)
model = genai.GenerativeModel('gemini-1.5-flash')

def chat_with_gemini(prompt):
    try:
        # 3. Gửi yêu cầu đến AI
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Lỗi rồi Shop ơi: {str(e)}"

# 4. Chạy thử
if __name__ == "__main__":
    user_input = input("Bạn muốn hỏi gì: ")
    print("Gemini đang trả lời...")
    print(chat_with_gemini(user_input))