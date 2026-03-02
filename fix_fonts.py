import re

with open('d:/calchub/css/variables.css', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("font-family: 'Syne', sans-serif;", "font-family: 'Inter', sans-serif;")
text = text.replace("font-family: 'Space Mono', monospace;", "font-family: 'Space Mono', monospace;") 

with open('d:/calchub/css/variables.css', 'w', encoding='utf-8') as f:
    f.write(text)

# Let's also create down-sizing script for mortgage calculator
html_path = 'd:/calchub/calculators/mortgage/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('text-xl py-3.5', 'text-base py-2.5')
html = html.replace('text-lg py-3.5', 'text-base py-2.5')
html = html.replace('text-lg font-semibold py-2.5', 'text-base font-medium py-2')
html = html.replace('text-lg font-semibold border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2.5', 'text-base font-medium border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2')
html = html.replace('text-lg', 'text-base')
html = html.replace('text-[40px]', 'text-[32px]') # usually not used, but let's see
html = html.replace('text-3xl', 'text-2xl')
html = html.replace('text-4xl', 'text-3xl')

html = html.replace('p-8 border border', 'p-6 border border')
html = html.replace('p-6 border-b', 'p-5 border-b')
html = html.replace('gap-8 mb-8', 'gap-6 mb-6')
html = html.replace('mb-8', 'mb-6')

html = html.replace('pl-8', 'pl-7')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
