import re

def main():
    with open('d:/calchub/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    links = {
        'Mortgage Payment': 'mortgage-calculator.html',
        'Mortgage': 'mortgage-calculator.html',
        'Compound Interest': 'compound-interest-calculator.html',
        'BMI Calculator': 'bmi-calculator.html',
        'BMI': 'bmi-calculator.html',
        'Percentage Calculator': 'percentage-calculator.html',
        'Percentage': 'percentage-calculator.html',
        'Date Difference': 'date-calculator.html',
        'Loan Calculator': 'loan-calculator.html',
        'Auto Loan Estimate': 'auto-loan-calculator.html',
        'Interest Rate Calc': 'interest-rate-calculator.html',
        'Retirement Planner': 'retirement-calculator.html',
        'Investment Return': 'investment-calculator.html',
        'Income Tax Estimator': 'income-tax-calculator.html',
        'Calorie Deficit': 'calorie-calculator.html',
        'Body Fat %': 'body-fat-calculator.html',
        'BMR Calculator': 'bmr-calculator.html',
        'Ideal Weight': 'ideal-weight-calculator.html',
        'Pregnancy Due Date': 'pregnancy-calculator.html',
        'Ovulation Calendar': 'ovulation-calculator.html',
        'Scientific Calculator': 'scientific-calculator.html',
        'Fraction Calculator': 'fraction-calculator.html',
        'Binary Converter': 'binary-calculator.html',
        'Age Calculator': 'age-calculator.html',
        'GPA Calculator': 'gpa-calculator.html',
        'Time Duration': 'time-calculator.html',
        'Salary Calculator': 'salary-calculator.html'
    }

    # Split the file by '<a '
    parts = html.split('<a ')
    
    for i in range(1, len(parts)):
        part = parts[i]
        if 'href="#"' in part:
            # Check which title is in this part
            for title, url in links.items():
                # We need to ensure we match the exact title, usually inside >Title< or >Title</
                if f">{title}<" in part or f">{title} " in part or f">{title}\n" in part:
                    parts[i] = part.replace('href="#"', f'href="{url}"')
                    break

    new_html = '<a '.join(parts)

    with open('d:/calchub/index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

if __name__ == '__main__':
    main()
