import re

html_file = "products.html"

with open(html_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Update counts
text = re.sub(r'Tất cả sản phẩm <span>\(\d+\)</span>', r'Tất cả sản phẩm <span>(99)</span>', text)
text = re.sub(r'Cây thủy sinh <span>\(\d+\)</span>', r'Cây thủy sinh <span>(26)</span>', text)
text = re.sub(r'Lọc hồ cá <span>\(\d+\)</span>', r'Thiết Bị & Lọc <span>(18)</span>', text)

# I also should add a category for soil:
text = text.replace('<li><a href="#">Thiết Bị & Lọc <span>(18)</span></a></li>', 
                    '<li><a href="#">Thiết Bị & Lọc <span>(18)</span></a></li>\n                        <li><a href="#">Phân Nền & Cát <span>(12)</span></a></li>')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated sidebar counts successfully.")
