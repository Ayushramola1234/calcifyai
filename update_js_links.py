import re
import glob
import os

def clean_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # match 'anyname-calculator.html' and "/anyname-calculator.html" in js context
    content = re.sub(r'\'/?([a-z0-9\-]+)-calculator\.html\'', r"'/calculators/\1/'", content)
    content = re.sub(r'\"/?([a-z0-9\-]+)-calculator\.html\"', r'"/calculators/\1/"', content)

    # Convert generic index.html hrefs in scripts into / if they aren't already
    content = re.sub(r'href=[\'\"]\/?index\.html[\'\"]', 'href="/"', content)
    content = re.sub(r'href=[\'\"]\/?coming-soon\.html[\'\"]', 'href="/coming-soon.html"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

js_files = glob.glob('js/*.js')
for jf in js_files:
    clean_js(jf)

# Also fix the links in the root html files as well, just in case any hrefs were missed
def process_html_files(html_files):
    for hf in html_files:
        with open(hf, 'r', encoding='utf-8') as f:
            html = f.read()
        
        # fix the home links
        html = re.sub(r'href=[\'\"]/?index\.html[\'\"]', 'href="/"', html)
        # fix the coming-soon links
        html = re.sub(r'href=[\'\"]/?coming-soon\.html[\'\"]', 'href="/coming-soon.html"', html)
        # Fix dead / non-existent calculators not caught by earlier glob looping because they don't exist in root
        html = re.sub(r'href=[\'\"]/?([a-z0-9\-]+)-calculator\.html[\'\"]', r'href="/calculators/\1/"', html)
        
        with open(hf, 'w', encoding='utf-8') as f:
            f.write(html)

process_html_files(glob.glob('*.html'))

# Now recursively apply to the calculators/ subdirectory HTML files
calc_html_files = []
for root, dirs, files in os.walk('calculators'):
    for file in files:
        if file.endswith('.html'):
            calc_html_files.append(os.path.join(root, file))
process_html_files(calc_html_files)

print("Updated JS files and root HTML hrefs")
