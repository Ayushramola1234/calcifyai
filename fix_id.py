with open('d:/calchub/calculators/mortgage/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('id="mg-rate" id="mg-rate"', 'id="mg-rate"')
text = text.replace('id="mg-down" id="mg-down"', 'id="mg-down"')
text = text.replace('id="mg-tax" id="mg-tax"', 'id="mg-tax"')
text = text.replace('id="mg-ins" id="mg-ins"', 'id="mg-ins"')
text = text.replace('<input type="hidden" id="mg-pmi" value="0.5"><input type="hidden" id="mg-pmi" value="0.5">', '<input type="hidden" id="mg-pmi" value="0.5">')

with open('d:/calchub/calculators/mortgage/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
