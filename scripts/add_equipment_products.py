import os
import re
import urllib.parse
import random

new_dirs = [
    (r"anh\máy lọc và vật liệu lọc", "Thiết Bị Thủy Sinh"),
    (r"anh\phân nền , cốt nền , cát trải nền", "Phân Nền Thủy Sinh"),
    (r"anh\cây thủy sinh", "Cây Thủy Sinh")
]

price_rules = {
    "lọc thác": [100000, 150000],
    "lọc treo": [250000, 450000],
    "ada": [500000, 800000],
    "cát": [30000, 50000],
    "rêu": [40000, 80000],
    "dương xỉ": [50000, 150000],
    "matrix": [450000, 500000],
    "ráy": [80000, 180000],
    "vẩy ốc": [30000, 40000]
}

def guess_price(filename, cat):
    fname = filename.lower()
    for key, (low, high) in price_rules.items():
        if key in fname:
            p = random.randint(low // 10000, high // 10000) * 10000
            return f"{p:,}".replace(',', '.') + "đ"
    
    # Defaults
    if cat == "Cây Thủy Sinh":
        p = random.randint(3, 8) * 10000
    elif cat == "Phân Nền Thủy Sinh":
        p = random.randint(10, 30) * 10000
    else:
        p = random.randint(5, 50) * 10000
        
    return f"{p:,}".replace(',', '.') + "đ"

html_blocks = []
count = 0

for d, cat_name in new_dirs:
    if os.path.exists(d):
        for f in os.listdir(d):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                name = os.path.splitext(f)[0].title()
                unix_folder = d.replace('\\', '/')
                path = f"{unix_folder}/{f}"
                encoded_path = urllib.parse.quote(path)
                
                price = guess_price(name, cat_name)
                
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

print(f"Prepared {count} new products.")

html_file = "products.html"
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to append
grid_closing_tag_pattern = r'(\s*)(</div>\s*</div>\s*</div>\s*</main>)'
match = re.search(grid_closing_tag_pattern, content)

if match:
    # Append the new blocks right before the closing divs
    new_html = '\n'.join(html_blocks)
    content = content[:match.start()] + '\n' + new_html + '\n' + content[match.start():]
    
    # Update total product count text in subtitle
    # Extract current total
    count_match = re.search(r'Tìm thấy (\d+) sản phẩm', content)
    if count_match:
        old_count = int(count_match.group(1))
        new_count = old_count + count
        content = re.sub(r'Tìm thấy \d+ sản phẩm', f'Tìm thấy {new_count} sản phẩm', content)
        
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected into products.html successfully.")
else:
    print("Could not find insertion point!")
