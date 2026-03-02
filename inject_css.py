import os
import glob

def main():
    html_files = glob.glob('d:/calchub/*.html')
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if the file already has home-tailwind.css (index.html does)
        if 'css/home-tailwind.css' in content:
            continue
            
        # We want to inject it right before `<link rel="stylesheet" href="css/styles.css">`
        # Or before `<!-- Shared JS -->` if styles.css isn't found
        target_str = '<link rel="stylesheet" href="css/styles.css">'
        injection = '<link rel="stylesheet" href="css/home-tailwind.css">\n  ' + target_str
        
        if target_str in content:
            content = content.replace(target_str, injection)
            print(f"Updated {os.path.basename(filepath)}")
            
            # Also ensure <body> tag has the dark mode basic classes for the footer/navbar to look right
            # Replacing standard <body> to the Tailwind standard body
            # We don't want to mess up the existing page structure too much, but dark mode bg is needed
            # for the transparent header to look good on black.
            # Actually, the calculators might look weird if we change their body classes.
            # Let's just do the stylesheet first.
            if '<html lang="en">' in content:
                content = content.replace('<html lang="en">', '<html lang="en" class="dark">')
                
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == '__main__':
    main()
