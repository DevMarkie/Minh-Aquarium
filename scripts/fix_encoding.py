import glob

def hybrid_decode(c):
    try:
        # Check if it's one of the problematic C1 control characters that CP1252 left as is
        if ord(c) in [0x81, 0x8d, 0x8f, 0x90, 0x9d]:
            return bytes([ord(c)])
        
        # Otherwise, encode using cp1252
        b = c.encode('cp1252')
        return b
    except UnicodeEncodeError:
        # If it somehow is not cp1252 (e.g. valid utf-8 that was added AFTER the corruption),
        # return None so we know it's a mix
        return None

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Try to convert back to bytes
        raw_bytes = bytearray()
        mix_found = False
        
        for c in content:
            b = hybrid_decode(c)
            if b is not None:
                raw_bytes.extend(b)
            else:
                raw_bytes.extend(c.encode('utf-8'))
                mix_found = True
        
        try:
            fixed_content = raw_bytes.decode('utf-8')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"Fixed {filepath} {'(Mix handling)' if mix_found else ''}")
        except UnicodeDecodeError as edec:
            print(f"Decode error on {filepath}: {edec}")
            
    except Exception as e:
        print(f"Error fixing {filepath}: {e}")

html_files = glob.glob('*.html')
for file in html_files:
    fix_file(file)
