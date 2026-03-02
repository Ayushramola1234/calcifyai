import re
with open('d:/calchub/calculators/mortgage/index.html', 'r', encoding='utf-8') as f:
    text = f.read()
ids_to_check = ['mg-term', 'mg-price', 'mg-down', 'mg-rate', 'mg-tax', 'mg-ins', 'mg-pmi', 'mg-monthly', 'mg-pi', 'mg-taxm', 'mg-insm', 'mg-tint', 'mg-tcost', 'mg-prin-paid', 'mg-eq-gained']
for id in ids_to_check:
    if f'id="{id}"' in text:
        print(f'{id} ok')
    else:
        print(f'{id} missing')

with open('d:/calchub/calculators/mortgage/script.js', 'r', encoding='utf-8') as fs:
    s_text = fs.read()
    
# output where error might be happening from js
ids_req = []
for m in re.finditer(r"\$\(\'([\w\-]+)\'\)", s_text):
    ids_req.append(m.group(1))

print("Script.js requires: ", set(ids_req))
