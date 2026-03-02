import os
import glob
import re
import json

def main():
    calculators = [f for f in glob.glob("*-calculator.html")]
    os.makedirs("calculators", exist_ok=True)

    # Dictionary to keep map of old filename -> new path
    calc_map = {}
    for c in calculators:
        name = c.replace("-calculator.html", "")
        calc_map[c] = f"/calculators/{name}/"
    
    # Also handle some edge cases if any
    
    # Update global css filenames 
    if os.path.exists("css/home-tailwind.v5.css"):
        os.rename("css/home-tailwind.v5.css", "css/global.css")
    if os.path.exists("css/styles.css"):
        os.rename("css/styles.css", "css/variables.css")
        
    def update_links(html):
        # Update CSS links
        html = re.sub(r'(href=["\'])(css/home-tailwind.*?\.css)(["\'])', r'\1/css/global.css\3', html)
        html = re.sub(r'(href=["\'])(css/styles\.css)(["\'])', r'\1/css/variables.css\3', html)
        # Change any relative css/ js/ to absolute /css/ /js/
        html = re.sub(r'(href=["\'])css/', r'\1/css/', html)
        html = re.sub(r'(src=["\'])js/', r'\1/js/', html)
        
        # Change any links to old calculators
        for old_c, new_c in calc_map.items():
            html = re.sub(r'(href=["\'](?:/|\./)?)' + re.escape(old_c) + r'(["\'])', r'\1' + new_c + r'\2', html)
        
        # Also clean up links pointing to absolute paths but without slash
        for old_c, new_c in calc_map.items():
            html = html.replace(f'href="{old_c}"', f'href="{new_c}"')
            
        return html

    # Process each calculator
    for calc_file in calculators:
        name = calc_file.replace("-calculator.html", "")
        folder_path = f"calculators/{name}"
        os.makedirs(folder_path, exist_ok=True)
        
        with open(calc_file, "r", encoding="utf-8") as f:
            html = f.read()
            
        html = update_links(html)
        
        # Extract CSS
        # We will extract all <style> blocks except if they contain nothing.
        # However, some <style> blocks might be better kept if they are small, but the prompt says 
        # "Each calculator folder must contain: index.html, calculator-specific CSS, calculator-specific JS"
        
        styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)
        combined_css = "\n".join(styles)
        if combined_css.strip():
            with open(f"{folder_path}/style.css", "w", encoding="utf-8") as f:
                f.write(combined_css.strip())
            # Remove inline styles
            html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
            # Inject link right before </head>
            html = html.replace("</head>", "  <link rel=\"stylesheet\" href=\"style.css\">\n</head>")
            
        # Extract JS
        # Extract <script> blocks that do not have src attribute
        scripts = re.finditer(r'<script([^>]*)>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
        combined_js = ""
        
        # We want to exclude scripts like JSON-LD which have type="application/ld+json" or dark mode toggles if they belong in global
        # "Shared JS" or inline variables might be extracted.
        # Actually, let's just extract scripts that don't have src=, type="application/ld+json", and try to keep them.
        
        to_remove = []
        for match in scripts:
            attrs = match.group(1)
            content = match.group(2)
            if 'src=' not in attrs and 'application/ld+json' not in attrs:
                # If it's the dark-mode flash preventer, keep it inline
                if 'localStorage.getItem(\'theme\')' in content:
                    continue
                combined_js += content + "\n"
                to_remove.append(match.group(0))
                
        if combined_js.strip():
            with open(f"{folder_path}/script.js", "w", encoding="utf-8") as f:
                f.write(combined_js.strip())
            
            for rm in to_remove:
                html = html.replace(rm, "")
                
            # Inject script tag right before </body>
            html = html.replace("</body>", "  <script src=\"script.js\" defer></script>\n</body>")
            
        # Write to index.html
        with open(f"{folder_path}/index.html", "w", encoding="utf-8") as f:
            f.write(html)
            
        # Delete old file
        os.remove(calc_file)

    # Update all other HTML files (index.html, privacy, terms, coming-soon, etc.)
    other_html = glob.glob("*.html")
    for f_name in other_html:
        with open(f_name, "r", encoding="utf-8") as f:
            html = f.read()
            
        html = update_links(html)
        
        with open(f_name, "w", encoding="utf-8") as f:
            f.write(html)
            
    # Update sitemap
    if os.path.exists("sitemap.xml"):
        with open("sitemap.xml", "r", encoding="utf-8") as f:
            sitemap = f.read()
        for old_c, new_c in calc_map.items():
            sitemap = sitemap.replace(f"/{old_c}", new_c)
        with open("sitemap.xml", "w", encoding="utf-8") as f:
            f.write(sitemap)
            
    # Add firebase.json redirects
    if os.path.exists("firebase.json"):
        with open("firebase.json", "r", encoding="utf-8") as f:
            fb = json.load(f)
            
        redirects = fb.get("hosting", {}).get("redirects", [])
        for old_c, new_c in calc_map.items():
            redirects.append({
                "source": f"/{old_c}",
                "destination": f"{new_c}",
                "type": 301
            })
        
        fb["hosting"]["redirects"] = redirects
        
        with open("firebase.json", "w", encoding="utf-8") as f:
            json.dump(fb, f, indent=2)

if __name__ == "__main__":
    main()
