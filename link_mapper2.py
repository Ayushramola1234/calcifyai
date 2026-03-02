import re

def main():
    with open('d:/calchub/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    links = {
        'Mortgage': 'mortgage-calculator.html',
        'Compound Interest': 'compound-interest-calculator.html',
        'BMI': 'bmi-calculator.html',
        'Percentage': 'percentage-calculator.html',
        'Date Difference': 'date-calculator.html',
        'Currency': '#',
        'Loan Calculator': 'loan-calculator.html',
        'Mortgage Payment': 'mortgage-calculator.html',
        'Auto Loan Estimate': 'auto-loan-calculator.html',
        'Interest Rate Calc': 'interest-rate-calculator.html',
        'Retirement Planner': 'retirement-calculator.html',
        '401(k) Contribution': '#',
        'Investment Return': 'investment-calculator.html',
        'Credit Card Payoff': '#',
        'Income Tax Estimator': 'income-tax-calculator.html',
        'BMI Calculator': 'bmi-calculator.html',
        'Calorie Deficit': 'calorie-calculator.html',
        'Body Fat %': 'body-fat-calculator.html',
        'BMR Calculator': 'bmr-calculator.html',
        'Ideal Weight': 'ideal-weight-calculator.html',
        'Macro Nutrient Split': '#',
        'Pregnancy Due Date': 'pregnancy-calculator.html',
        'Ovulation Calendar': 'ovulation-calculator.html',
        'Water Intake': '#',
        'Scientific Calculator': 'scientific-calculator.html',
        'Percentage Calculator': 'percentage-calculator.html',
        'Fraction Calculator': 'fraction-calculator.html',
        'Binary Converter': 'binary-calculator.html',
        'Age Calculator': 'age-calculator.html',
        'GPA Calculator': 'gpa-calculator.html',
        'Time Duration': 'time-calculator.html',
        'Salary Calculator': 'salary-calculator.html'
    }

    # Since the structure is:
    # <a class="..." href="#">
    #   ...
    #   <h3 class="...">Title</h3>
    # we can split the file by `<a ` and loop over chunks.
    
    chunks = content.split('<a ')
    for i in range(1, len(chunks)):
        chunk = chunks[i]
        
        # Check if the chunk contains an href="#"
        if 'href="#"' in chunk:
            for title, url in links.items():
                if url != '#':
                    # We check if the title is inside this anchor chunk
                    if f">{title}<" in chunk:
                        chunks[i] = chunk.replace('href="#"', f'href="{url}"')
                        break

    new_content = '<a '.join(chunks)

    with open('d:/calchub/index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    main()
