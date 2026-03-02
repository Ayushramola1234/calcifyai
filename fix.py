import builtins
with open('d:/calchub/mortgage-calculator.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Container fixes
html = html.replace('<div class="relative w-64 h-64 mx-auto mb-10">', '<div class="relative w-[220px] h-[220px] mx-auto mb-8">')
html = html.replace('<div class="w-full min-h-[220px] h-[260px]">', '<div class="relative w-full h-[280px] md:h-[320px]">')

# Function fixes
replacement = '''function updateCharts() {
            if (donutChart) donutChart.destroy();
            if (areaChart) areaChart.destroy();
            initCharts();
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
             clearTimeout(resizeTimer);
             resizeTimer = setTimeout(() => {
                 updateCharts();
                 calcMortgage(); // Trigger recalculation to refill the chart data and adjust canvas size
             }, 250);
        });

        // Initialize strictly after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
             // Let the DOM fully paint before taking layout dimensions
             setTimeout(() => {
                 initCharts();
                 calcMortgage();
             }, 50);
        });'''

start = html.find('function updateCharts() {')
end_marker = 'document.addEventListener(\'DOMContentLoaded\', calcMortgage);'
end = html.find(end_marker) + len(end_marker)

if start != -1 and html.find(end_marker) != -1:
    old_block = html[start:end]
    html = html.replace(old_block, replacement)

# Clean up dangling init
html = html.replace('// Init\n        initCharts();\n    \n      // Automatically calculate on load\n', '')


with open('d:/calchub/mortgage-calculator.html', 'w', encoding='utf-8') as f:
    f.write(html)
