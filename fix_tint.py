import re

with open('d:/calchub/calculators/mortgage/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'(<p class=\"text-[a-z]+ text-[a-z0-9\-]+ uppercase tracking-wide font-bold\">Total Interest</p>\s*)<p class=\"text-[a-z]+ font-[a-z]+ text-[a-z0-9\-]+ dark:text-white mt-1 tabular-nums\">\$582,450\s*</p>', 
              r'\1<p id="mg-tint" class="text-base font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">$582,450</p>', 
              text)

with open('d:/calchub/calculators/mortgage/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
