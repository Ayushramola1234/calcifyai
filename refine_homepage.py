import re

homepage_path = 'd:/calchub/index.html'
with open(homepage_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Scale down headings
html = html.replace('text-5xl md:text-6xl', 'text-4xl md:text-5xl')
html = html.replace('text-4xl md:text-5xl', 'text-3xl md:text-4xl')
html = html.replace('font-black', 'font-extrabold')

# Reduce padding/size on the search bar
html = html.replace('py-4 pl-12 pr-32 text-lg rounded-xl', 'py-3 pl-12 pr-28 text-base rounded-lg')
html = html.replace('px-6 py-2 rounded-lg text-sm', 'px-5 py-2 rounded-md text-sm')
html = html.replace('right-2 top-2 bottom-2', 'right-1.5 top-1.5 bottom-1.5')

# Reduce section gaps
html = html.replace('py-24', 'py-16')
html = html.replace('gap-8', 'gap-6')
html = html.replace('mb-16', 'mb-12')
html = html.replace('mt-32', 'mt-20')

with open(homepage_path, 'w', encoding='utf-8') as f:
    f.write(html)
