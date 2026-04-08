import re

html_file = "products.html"

with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace sidebar links with proper queries
replacements = {
    'href="#" class="active">Tất cả sản phẩm': 'href="products.html?q=" class="active">Tất cả sản phẩm',
    'href="#">Cá cảnh': 'href="products.html?q=Cá Cảnh">Cá cảnh',
    'href="#">Tép cảnh': 'href="products.html?q=Tép Cảnh">Tép cảnh',
    'href="#">Cây thủy sinh': 'href="products.html?q=Cây Thủy Sinh">Cây thủy sinh',
    'href="#">Thiết Bị & Lọc': 'href="products.html?q=Thiết Bị">Thiết Bị & Lọc',
    'href="#">Phân Nền & Cát': 'href="products.html?q=Nền">Phân Nền & Cát'
}

for old, new in replacements.items():
    text = text.replace(old, new)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated products sidebar links successfully.")
