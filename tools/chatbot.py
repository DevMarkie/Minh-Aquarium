"""Legacy CLI chatbot helper for quick local experiments.

The production chatbot lives in server/server.js and uses database-backed RAG.
This file stays in tools/ so it does not look like the main application entry.
"""

import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

try:
    import google.generativeai as genai
except ImportError:
    genai = None


SHOP_CONTEXT = """
Bạn là trợ lý tư vấn khách hàng cho Minh Aquarium.
Hãy trả lời bằng tiếng Việt tự nhiên, ngắn gọn và thân thiện.
Chỉ tư vấn trong phạm vi cá cảnh, tép cảnh, cây thủy sinh, đèn, máy lọc,
thức ăn, thuốc/chế phẩm và dịch vụ setup bể.
Nếu thiếu thông tin, hãy hỏi lại kích thước bể, ngân sách, loại cá/tép/cây
khách muốn nuôi hoặc gợi ý gọi hotline 0123456789.
Không bịa giá, tồn kho hoặc chính sách nếu chưa có dữ liệu.
"""


def local_answer(question: str) -> str:
    text = question.lower()

    if any(word in text for word in ["hotline", "liên hệ", "zalo", "nhân viên"]):
        return (
            "Bạn có thể liên hệ Minh Aquarium qua hotline 0123456789. "
            "Bạn cũng có thể mô tả nhu cầu để mình tư vấn trước."
        )

    if any(word in text for word in ["setup", "set up", "lắp bể", "bể thủy sinh"]):
        return (
            "Để setup bể, bạn cho mình biết kích thước bể, ngân sách và muốn nuôi "
            "cá/tép/cây gì nhé. Thông thường cần bể, lọc, đèn, nền, cây thủy sinh "
            "và vi sinh."
        )

    if any(word in text for word in ["betta", "neon", "cá"]):
        return (
            "Shop có các dòng cá cảnh như Betta, Neon, cá đàn nhỏ. "
            "Bạn muốn cá dễ nuôi, màu đẹp hay nuôi theo bể thủy sinh?"
        )

    if any(word in text for word in ["tép", "tep", "shrimp"]):
        return (
            "Nếu nuôi tép, bạn nên chuẩn bị nước ổn định, lọc nhẹ và rêu/cây "
            "để tép trú. Bạn muốn tép màu hay tép dọn rêu?"
        )

    if any(word in text for word in ["đèn", "den", "led"]):
        return (
            "Với đèn thủy sinh, bạn nên chọn theo chiều dài bể và loại cây. "
            "Bể trồng cây cần đèn mạnh và ổn định hơn bể chỉ nuôi cá."
        )

    if any(word in text for word in ["lọc", "loc", "filter"]):
        return (
            "Máy lọc nên chọn theo thể tích bể và loại sinh vật nuôi. "
            "Bể cá/tép nhỏ thường ưu tiên lọc êm, dòng nhẹ và dễ vệ sinh."
        )

    return (
        "Mình có thể tư vấn cá cảnh, tép cảnh, cây thủy sinh, đèn, lọc, thức ăn "
        "và setup bể. Bạn cho mình biết nhu cầu cụ thể hoặc ngân sách dự kiến nhé."
    )


def chat_with_gemini(question: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    if not api_key or genai is None:
        return local_answer(question)

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(f"{SHOP_CONTEXT}\n\nCâu hỏi khách hàng: {question}")
        return (response.text or "").strip() or local_answer(question)
    except Exception:
        return local_answer(question)


if __name__ == "__main__":
    question = " ".join(sys.argv[1:]).strip()
    if not question:
        question = input("Khách hỏi: ").strip()

    print(chat_with_gemini(question))
