import os
import re
import urllib.parse
import random

target_dir = r"anh\đèn thủy sinh"
cat_name = "Đèn Chiếu Sáng"

html_blocks = []
count = 0

price_rules = {
    "chihiros": [1000000, 3000000],
    "week": [1000000, 2000000],
    "netlea": [1500000, 2500000],
    "sunsun": [200000, 500000],
    "xilong": [100000, 300000],
    "odyssea": [800000, 1200000]
}

if os.path.exists(target_dir):
    for f in os.listdir(target_dir):
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            name = os.path.splitext(f)[0].title()
            unix_folder = target_dir.replace('\\', '/')
            path = f"{unix_folder}/{f}"
            encoded_path = urllib.parse.quote(path)
            
            p = random.randint(5, 10) * 100000
            for k, (low, high) in price_rules.items():
                if k in name.lower():
                    p = random.randint(low // 10000, high // 10000) * 10000
                    break
            
            price = f"{p:,}".replace(',', '.') + "đ"
            
            block = f"""
                    <div class="product-card" style="display: block;">
                        <div class="product-image real-image" style="background-image: url('{encoded_path}'); background-size: cover; background-position: center;">
                            <div class="wishlist-btn"><i class="fa-regular fa-heart"></i></div>
                        </div>
                        <div class="product-info">
                            <div class="product-cat">{cat_name}</div>
                            <h3 class="product-name">{name}</h3>
                            <div class="product-price">
                                <span class="price-current">{price}</span>
                            </div>
                            <button class="btn btn-cart-black btn-add-cart"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ</button>
                        </div>
                    </div>"""
            html_blocks.append(block)
            count += 1

print(f"Prepared {count} light products.")

html_file = "products.html"
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Append items to the grid
match = re.search(r'(\s*)(</div>\s*</div>\s*</div>\s*</main>)', content)
if match:
    new_html = '\n'.join(html_blocks)
    content = content[:match.start()] + '\n' + new_html + '\n' + content[match.start():]

    # Update counts in string
    content = re.sub(r'Tìm thấy 99 sản phẩm', f'Tìm thấy 117 sản phẩm', content)
    content = re.sub(r'Tất cả sản phẩm <span>\(99\)</span>', r'Tất cả sản phẩm <span>(117)</span>', content)

    # Insert new light category to sidebar layout right after Phân nền & Cát
    target = '<li><a href="products.html?q=Nền">Phân Nền & Cát <span>(12)</span></a></li>'
    if target in content:
        content = content.replace(target, target + '\n                        <li><a href="products.html?q=Đèn">Đèn Chiếu Sáng <span>(18)</span></a></li>')

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected lights to products.html successfully.")
else:
    print("Insertion point not found.")
