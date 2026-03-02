import os
import glob
import re

def main():
    html_files = glob.glob('d:/calchub/*.html')
    
    new_fonts_html = """  <link rel="preload"
    href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&family=Inter:wght@400;500;600;700;900&display=swap"
    as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&family=Inter:wght@400;500;600;700;900&display=swap">
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
  </noscript>"""

    for filepath in html_files:
        if os.path.basename(filepath) == 'index.html':
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to locate the old preload and noscript font block
        pattern = re.compile(
            r'<\s*link[^>]*rel=["\']preload["\'][^>]*href=["\'][^"\']*family=Space\+Mono[^"\']*["\'][^>]*>.*?<\s*noscript\s*>.*?<\s*link[^>]*rel=["\']stylesheet["\'][^>]*href=["\'][^"\']*family=Space\+Mono[^"\']*["\'][^>]*>.*?<\s*/noscript\s*>',
            re.IGNORECASE | re.DOTALL
        )
        
        if pattern.search(content):
            content = pattern.sub(new_fonts_html, content, count=1)
            print(f"Updated fonts in {os.path.basename(filepath)}")
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == '__main__':
    main()
