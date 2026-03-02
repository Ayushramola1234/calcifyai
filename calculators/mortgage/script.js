/* ── PAGE-SPECIFIC JAVASCRIPT (FINTECH PRO) ── */


    let amortData = [];
    let showingAllAmort = false;

    function calcMortgage() {
      const price = parseFloat($('mg-price').value);
      const down = parseFloat($('mg-down').value) || 0;
      const term = parseInt($('mg-term').value);
      const rate = parseFloat($('mg-rate').value) / 100 / 12;
      const taxYr = parseFloat($('mg-tax').value) || 0;
      const insYr = parseFloat($('mg-ins').value) || 0;
      const pmiPct = parseFloat($('mg-pmi').value) || 0;

      if (!price || !rate) {
        alert('Please enter at least the home price and interest rate.');
        return;
      }

      const loan = price - down;
      const n = term * 12;
      const pi = loan * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      const taxM = taxYr / 12;
      const insM = insYr / 12;
      const pmiM = (pmiPct / 100 * loan) / 12;
      const totalM = pi + taxM + insM + pmiM;

      const totalPaid = pi * n;
      const totalInt = totalPaid - loan;
      const pPct = (loan / totalPaid * 100).toFixed(1);

      $('mg-monthly').textContent = '
</body>

</html> + fmt(totalM);
      $('mg-pi').textContent = '
</body>

</html> + fmt(pi);
      $('mg-taxm').textContent = '
</body>

</html> + fmt(taxM);
      $('mg-insm').textContent = '
</body>

</html> + fmt(insM);
      $('mg-pmim').textContent = pmiPct ? '
</body>

</html> + fmt(pmiM) : 'N/A';
      $('mg-loan').textContent = '
</body>

</html> + fmt(loan);
      $('mg-downr').textContent = '
</body>

</html> + fmt(down) + ' (' + ((down / price) * 100).toFixed(1) + '%)';
      $('mg-tint').textContent = '
</body>

</html> + fmt(totalInt);
      $('mg-tcost').textContent = '
</body>

</html> + fmt(totalPaid + down);
      $('mg-bar-p').style.width = pPct + '%';

      showResult('mg-result');
      buildAmortTable(loan, rate, n, pi);
      $('mg-amort-wrap').style.display = 'block';
    }

    function buildAmortTable(principal, rate, n, payment) {
      amortData = [];
      let balance = principal;
      for (let i = 1; i <= n; i++) {
        const interest = balance * rate;
        const princ = payment - interest;
        balance = Math.max(0, balance - princ);
        amortData.push({ month: i, payment, interest, princ, balance });
      }
      renderAmortTable(24);
    }

    function renderAmortTable(rows) {
      const data = amortData.slice(0, rows);
      let html = `<table>
      <thead><tr>
        <th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th>
      </tr></thead><tbody>`;
      data.forEach(r => {
        html += `<tr>
        <td>${r.month}</td>
        <td>${fmt(r.payment)}</td>
        <td>${fmt(r.princ)}</td>
        <td>${fmt(r.interest)}</td>
        <td>${fmt(r.balance)}</td>
      </tr>`;
      });
      if (rows < amortData.length) {
        html += `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:12px;">
        … ${amortData.length - rows} more months …
      </td></tr>`;
      }
      html += '</tbody></table>';
      $('mg-amort-table').innerHTML = html;
    }

    function toggleAmort() {
      showingAllAmort = !showingAllAmort;
      renderAmortTable(showingAllAmort ? amortData.length : 24);
      $('mg-amort-btn').textContent = showingAllAmort ? 'Show Less' : 'Show All';
      $('mg-amort-table').style.maxHeight = showingAllAmort ? 'none' : '320px';
    }
  
    // CALCULATION LOGIC
    function $(id) { return document.getElementById(id); }
    function fmt(num) { return num.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}); }

    function parseFormat(val) {
        if(!val) return 0;
        return parseFloat(val.toString().replace(/,/g, ''));
    }

    function calcMortgage() {
      const price = parseFormat($('mg-price').value);
      const down = parseFormat($('mg-down').value) || 0;
      const term = parseInt($('mg-term').value);
      const rate = parseFormat($('mg-rate').value) / 100 / 12;
      const taxYr = parseFormat($('mg-tax').value) || 0;
      const insYr = parseFormat($('mg-ins').value) || 0;
      const pmiPct = parseFormat($('mg-pmi').value) || 0;

      if (!price || !rate) {
        alert('Please enter at least the home price and interest rate.');
        return;
      }

      const loan = price - down;
      const n = term * 12;
      const pi = loan * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      
      const taxM = taxYr / 12;
      const insM = insYr / 12;
      
      // Calculate PMI - if downpayment < 20%
      let pmiM = 0;
      if ((down / price) < 0.20) {
          pmiM = (pmiPct / 100 * loan) / 12;
      }
      
      const totalM = pi + taxM + insM + pmiM;

      const totalPaid = pi * n;
      const totalInt = totalPaid - loan;

      $('mg-monthly').textContent = '
</body>

</html> + fmt(totalM);
      $('mg-pi').textContent = '
</body>

</html> + fmt(pi);
      $('mg-taxm').textContent = '
</body>

</html> + fmt(taxM);
      $('mg-insm').textContent = '
</body>

</html> + fmt(insM);
      
      $('mg-tint').textContent = '
</body>

</html> + fmt(totalInt);
      $('mg-tcost').textContent = '
</body>

</html> + fmt(totalPaid + down);
      
      // Update Donut Chart
      if (donutChart) {
          donutChart.data.datasets[0].data = [pi, taxM, insM, pmiM];
          donutChart.update();
      }
      
      // Build Amortization Curve Data
      let bal = loan;
      let amortLabels = [];
      let amortPrincipal = [];
      let amortInterest = [];
      
      // For the Area Chart we only need yearly markers to match the 10 points
      for (let y = 0; y <= term; y++) {
          amortLabels.push(y.toString());
          if (y === 0) {
              amortPrincipal.push(0);
              amortInterest.push(totalInt);
              continue;
          }
          
          let yearPrincipal = 0;
          let yearInterest = 0;
          for (let m = 0; m < 12; m++) {
              let interestForMonth = bal * rate;
              let principalForMonth = pi - interestForMonth;
              bal -= principalForMonth;
              yearPrincipal += principalForMonth;
              yearInterest += interestForMonth;
          }
          // Cumulative
          amortPrincipal.push(amortPrincipal[y-1] + yearPrincipal);
          amortInterest.push(Math.max(0, amortInterest[y-1] - yearPrincipal)); // rough visual representation
      }
      
      if (areaChart) {
          areaChart.data.labels = amortLabels;
          areaChart.data.datasets[0].data = amortPrincipal; // Equity
          areaChart.data.datasets[1].data = amortInterest; // Remaining Interest
          areaChart.update();
      }
      
      // Build Table (first 3 rows for visual fidelity of the snapshot)
      const tbody = document.getElementById('amort-table-body');
      if (tbody) {
          bal = loan;
          let tableHtml = '';
          let d = new Date();
          for(let i=0; i<3; i++) {
              let iForM = bal * rate;
              let pForM = pi - iForM;
              bal -= pForM;
              let monthStr = d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear();
              
              tableHtml += `
                <tr class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-250">
                    <td class="px-6 py-4 font-bold text-slate-900 dark:text-slate-200">${monthStr}</td>
                    <td class="px-6 py-4 text-right font-medium text-slate-600 dark:text-slate-400 tabular-nums">${fmt(totalM)}</td>
                    <td class="px-6 py-4 text-right font-medium text-slate-600 dark:text-slate-400 tabular-nums">${fmt(pForM)}</td>
                    <td class="px-6 py-4 text-right font-medium text-slate-600 dark:text-slate-400 tabular-nums">${fmt(iForM)}</td>
                    <td class="px-6 py-4 text-right font-medium text-slate-600 dark:text-slate-400 tabular-nums">${fmt(totalInt)}</td>
                    <td class="px-6 py-4 text-right font-bold text-slate-800 dark:text-white tabular-nums">${fmt(bal)}</td>
                </tr>
              `;
              d.setMonth(d.getMonth() + 1);
          }
          tbody.innerHTML = tableHtml;
      }
    }
    
    // Chart Configuration
        Chart.defaults.font.family = 'Inter';
        let donutChart, areaChart;
        function getChartColors() {
            const isDark = document.documentElement.classList.contains('dark');
            return {
                text: isDark ? '#94a3b8' : '#64748b', // Slate-400 / Slate-500
                grid: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                donutColors: isDark
                    ? ['#0ea5e9', '#94a3b8', '#475569', '#1e293b'] // Sky-500, Slate-400...
                    : ['#0ea5e9', '#94a3b8', '#64748b', '#cbd5e1'],
                areaPrincipal: '#0ea5e9',
                areaInterest: '#94a3b8'
            };
        }
        function initCharts() {
            const colors = getChartColors();
            // 1. Donut Chart
            const ctxDonut = document.getElementById('paymentDonutChart').getContext('2d');
            donutChart = new Chart(ctxDonut, {
                type: 'doughnut',
                data: {
                    labels: ['Principal', 'Taxes', 'Insurance', 'PMI'],
                    datasets: [{
                        data: [75, 18, 7, 0],
                        backgroundColor: colors.donutColors,
                        borderWidth: 0,
                        hoverOffset: 6
                    }]
                },
                options: {
                    cutout: '82%',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 1000,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#0f172a',
                            titleColor: '#fff',
                            bodyColor: '#e2e8f0',
                            borderColor: '#334155',
                            borderWidth: 1,
                            padding: 16,
                            cornerRadius: 8,
                            displayColors: true,
                            boxPadding: 6,
                            titleFont: { family: 'Inter', size: 14, weight: 'bold' },
                            bodyFont: { family: 'Inter', size: 13 }
                        }
                    }
                }
            });
            // 2. Area Chart (Amortization)
            const ctxArea = document.getElementById('amortizationChart').getContext('2d');
            // Gradient Setup
            const gradientPrincipal = ctxArea.createLinearGradient(0, 0, 0, 400);
            gradientPrincipal.addColorStop(0, 'rgba(14, 165, 233, 0.15)'); // Sky-500 low opacity
            gradientPrincipal.addColorStop(1, 'rgba(14, 165, 233, 0.0)');
            const gradientInterest = ctxArea.createLinearGradient(0, 0, 0, 400);
            gradientInterest.addColorStop(0, 'rgba(148, 163, 184, 0.15)'); // Slate low opacity
            gradientInterest.addColorStop(1, 'rgba(148, 163, 184, 0.0)');
            areaChart = new Chart(ctxArea, {
                type: 'line',
                data: {
                    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                    datasets: [
                        {
                            label: 'Principal',
                            data: [500, 650, 850, 1100, 1350, 1600, 1850, 2000, 2150, 2300, 2500],
                            borderColor: colors.areaPrincipal,
                            backgroundColor: gradientPrincipal,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: colors.areaPrincipal,
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2,
                            borderWidth: 3
                        },
                        {
                            label: 'Interest',
                            data: [2200, 2050, 1850, 1600, 1350, 1100, 950, 800, 650, 500, 350],
                            borderColor: colors.areaInterest,
                            backgroundColor: gradientInterest,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: colors.areaInterest,
                            pointHoverBorderColor: '#fff',
                            pointHoverBorderWidth: 2,
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1200,
                        easing: 'easeOutQuart'
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#0f172a',
                            titleColor: '#fff',
                            bodyColor: '#e2e8f0',
                            borderColor: '#334155',
                            borderWidth: 1,
                            padding: 12,
                            intersect: false,
                            mode: 'index',
                            titleFont: { family: 'Inter', size: 13, weight: 'bold' },
                            bodyFont: { family: 'Inter', size: 12 }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false, drawBorder: false },
                            ticks: {
                                font: { size: 11, family: 'Inter', weight: 500 },
                                color: colors.text
                            }
                        },
                        y: {
                            grid: {
                                color: colors.grid,
                                drawBorder: false,
                                borderDash: [4, 4]
                            },
                            ticks: { display: false }
                        }
                    }
                }
            });
        }
        function updateCharts() {
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
        });