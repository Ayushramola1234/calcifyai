import os
import glob
import shutil

# Rename original home-tailwind to v3
try:
    shutil.copy('d:/calchub/css/home-tailwind.css', 'd:/calchub/css/home-tailwind.v3.css')
except:
    pass

html_files = glob.glob('d:/calchub/*.html')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    modified = False
    
    # 1. Update the link reference for the main CSS to bust the cache and point to the restored original
    if 'css/home-tailwind.v2.css' in content:
        content = content.replace('css/home-tailwind.v2.css', 'css/home-tailwind.v3.css')
        modified = True
    elif 'css/home-tailwind.css' in content:
        content = content.replace('css/home-tailwind.css', 'css/home-tailwind.v3.css')
        modified = True
        
    # 2. If it's the mortgage calculator, inject the new dedicated tailwind file if not present
    if 'mortgage-calculator.html' in f:
        if 'css/mortgage-tailwind.css' not in content:
            target = '<link rel="stylesheet" href="css/styles.css">'
            if target in content:
                content = content.replace(target, target + '\n    <link rel="stylesheet" href="css/mortgage-tailwind.css">')
                modified = True
                
    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
