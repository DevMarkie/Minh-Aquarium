import re

html_file = "products.html"

# Typical VN market prices mapped by substrings
price_map = {
    "Betta Fancy": "90.000đ",
    "Betta Galaxy": "150.000đ",
    "Betta Half Moon": "80.000đ",
    "Bác Sĩ Panda": "35.000đ",
    "Bống Panda": "40.000đ",
    "Bống Tê Giác": "50.000đ",
    "Chuột Cafe": "15.000đ",
    "Chuột Gold Laser": "120.000đ",
    "Chuột Panda": "45.000đ",
    "Chuột Pygmy": "25.000đ",
    "Chuột Sao": "60.000đ",
    "Cá Trâm": "5.000đ",
    "Cầu Vồng Chấm Bi": "30.000đ",
    "Diếc Anh Đào": "12.000đ",
    "Ember Tetra": "15.000đ",
    "Kili": "40.000đ",
    "Logfin": "35.000đ",
    "Neon Abino": "15.000đ",
    "Neon Chỉ Đỏ": "20.000đ",
    "Neon Hoàng Đế": "25.000đ",
    "Neon Kim Cương": "30.000đ",
    "Neon Vua": "18.000đ",
    "Neon Xanh": "10.000đ",
    "Neon Đen": "12.000đ",
    "Otto": "40.000đ",
    "Sóc Đầu Đỏ": "15.000đ",
    "Tam Giác Vương": "20.000đ",
    "Tam Giác": "12.000đ",
    "Trâm Galaxy": "35.000đ",
    "Trạch Culi": "20.000đ",
    "Bule Fream": "30.000đ", # typo in filename handling
    "Blue Dream": "30.000đ",
    "Fire Red": "15.000đ",
    "Loạn Màu": "5.000đ",
    "Mũi Đỏ": "15.000đ",
    "Pure Red Line": "150.000đ",
    "Red Pinto": "250.000đ",
    "Sula": "80.000đ",
    "Vàng Đài": "20.000đ",
    "Yamto": "40.000đ",
    "Yellow Cheek": "150.000đ"
}

with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern finds product name, then looks ahead to update the price-current span
# <h3 class="product-name">Betta Fancy</h3>\s*<div class="product-price">\s*<span class="price-current">...</span>

for name, price in price_map.items():
    # Regex to match the block and replace the price
    pattern = r'(<h3 class="product-name">(?:.*?)?' + re.escape(name) + r'(?:.*?)?</h3>\s*<div class="product-price">\s*<span class="price-current">).*?(</span>)'
    text = re.sub(pattern, rf'\g<1>{price}\g<2>', text, flags=re.IGNORECASE)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated prices successfully.")
