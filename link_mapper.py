import re

def main():
    with open('d:/calchub/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the mapping of card titles to their actual HTML files
    links = {
        'Mortgage': 'mortgage-calculator.html',
        'Compound Interest': 'compound-interest-calculator.html',
        'BMI': 'bmi-calculator.html',
        'Percentage': 'percentage-calculator.html',
        'Date Difference': 'date-calculator.html',
        'Currency': '#', # Not implemented yet?
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

    # Use regex to find `href="#"` followed by some classes and a `<h3>` or `<span>` with the title.
    # The structure looks like:
    # <a class="..." href="#">
    #     ... maybe some divs ...
    #     <h3 class="...">Title</h3>
    # ...
    # OR for the top categories:
    # <a class="..." href="#">
    #    <span ...>icon</span>
    #    <span class="...">Title</span>
    # </a>

    for title, url in links.items():
        if url == '#': continue
        
        # Regex to match the anchor tag and replace href="#" with href="url" if it contains the title
        # It's safer to just iterate through all matches of href="#"
        # Let's do a more robust string replacement by splitting the file into anchor blocks, or regex.
        pattern = re.compile(r'(<a[^>]*href=")("#)("[^>]*>.*?)(<h3[^>]*>|<span[^>]*>)\s*' + re.escape(title) + r'\s*(</h3>|</span>)', re.IGNORECASE | re.DOTALL)
        content = pattern.sub(rf'\g<1>{url}\g<3>\g<4>{title}\g<5>', content)
        
        # for simple spans, the title might have leading/trailing newlines in the regex, handled by \s*

    with open('d:/calchub/index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
