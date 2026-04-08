import glob
import re

html_files = glob.glob('*.html')
for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace the src attribute specifically to be safe
        new_content = re.sub(r'src="logo_transparent\.png"', 'src="anh/logo_transparent.png"', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed logo path in {file}")
    except Exception as e:
        print(f"Error {file}: {e}")
