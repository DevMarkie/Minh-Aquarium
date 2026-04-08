import os
import re
import urllib.parse

dirs = [r"anh\cá", r"anh\tép"]
html_file = "products.html"

# Read all image names
images_data = []

for d in dirs:
    cat_name = "Cá Cảnh" if "cá" in d else "Tép Cảnh"
    if os.path.exists(d):
        for f in os.listdir(d):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images_data.append((cat_name, f, d))

# Build HTML blocks
html_blocks = []
for idx, (cat_name, img, folder) in enumerate(images_data):
    # Get product name from filename
    name = os.path.splitext(img)[0].title()
    # Normalize path and encode it properly
    # folder ends up as anh/cá or anh/tép
    unix_folder = folder.replace('\\', '/')
    path = f"{unix_folder}/{img}"
    encoded_path = urllib.parse.quote(path)
    
    # Assign a dummy price
    price = f"{(idx + 1) * 15}.000đ"
    
    block = f"""
                    <div class="product-card">
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

grid_html = '\n'.join(html_blocks)

# Read products.html
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace block
pattern = r'(<div class="product-grid p-grid-3">).*?(</div>\s*</div>\s*</div>\s*</main>)'
new_content = re.sub(pattern, rf'\1{grid_html}\n                \2', content, flags=re.DOTALL)

# Update the count
new_content = re.sub(r'<p class="page-subtitle">Tìm thấy \d+ sản phẩm</p>', 
                     f'<p class="page-subtitle">Tìm thấy {len(images_data)} sản phẩm</p>', 
                     new_content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(images_data)} products to products.html")
