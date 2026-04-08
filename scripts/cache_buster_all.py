import glob
import re

html_files = glob.glob('../*.html')
for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = re.sub(r'src="script\.js(?:\?v=\d+)?"', 'src="js/script.js?v=12"', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated script version to v=12 in {file}")
    except Exception as e:
        print(f"Error {file}: {e}")
