import re

with open('d:/calchub/calculators/mortgage/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<select\n                                    class="mercury-input', '<select id="mg-term"\n                                    class="mercury-input')
text = text.replace('<button\n                        class="w-full bg-gradient', '<button onclick="calcMortgage()" id="mg-button"\n                        class="w-full bg-gradient')

# Outputs
text = text.replace('<span\n                                class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mt-1 tracking-tighter drop-shadow-sm">$7,488</span>', 
                    '<span id="mg-monthly"\n                                class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mt-1 tracking-tighter drop-shadow-sm">$7,488</span>')

text = text.replace('<span\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$7,145.00</span>', 
                    '<span id="mg-pi"\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$7,145.00</span>')

text = text.replace('<span\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$1,562.50</span>', 
                    '<span id="mg-taxm"\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$1,562.50</span>')
                    
text = text.replace('<span\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$350.00</span>', 
                    '<span id="mg-insm"\n                                    class="text-base font-extrabold text-slate-800 dark:text-white tabular-nums">$350.00</span>')

text = text.replace('<p class="text-lg font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">$582,450\n                            </p>',
                    '<p id="mg-tint" class="text-lg font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">$582,450\n                            </p>')

text = text.replace('<p class="text-lg font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">\n                                $2,082,450</p>',
                    '<p id="mg-tcost" class="text-lg font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">\n                                $2,082,450</p>')

text = text.replace('<p class="text-2xl font-extrabold text-slate-800 dark:text-white tabular-nums">$12,145</p>',
                    '<p id="mg-prin-paid" class="text-2xl font-extrabold text-slate-800 dark:text-white tabular-nums">$12,145</p>')
                    
text = text.replace('<p class="text-2xl font-extrabold text-slate-800 dark:text-white tabular-nums">$342k</p>',
                    '<p id="mg-eq-gained" class="text-2xl font-extrabold text-slate-800 dark:text-white tabular-nums">$342k</p>')

# Need to fix the extra calcMortgage function in script.js (there are two of them!)
with open('d:/calchub/calculators/mortgage/script.js', 'r', encoding='utf-8') as f:
    script_text = f.read()

# I will just remove the first version of calcMortgage which is broken 
first_calc_match = re.search(r'function calcMortgage\(\) \{[\s\S]*?\}\n\s*\n\s*function buildAmortTable', script_text)
if first_calc_match:
    script_text = script_text[:first_calc_match.start()] + "\n\n    function buildAmortTable" + script_text[first_calc_match.end():]

with open('d:/calchub/calculators/mortgage/script.js', 'w', encoding='utf-8') as f:
    f.write(script_text)

with open('d:/calchub/calculators/mortgage/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("done!")
