function calcBMI() {
          const h = parseFloat($('bh').value) / 100, w = parseFloat($('bw').value);
          if (!h || !w) return alert('Fill all fields.');
          const bmi = w / (h * h);
          const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal Weight ✓' : bmi < 30 ? 'Overweight' : 'Obese';
          $('r-bmi').textContent = bmi.toFixed(1); $('r-cat').textContent = cat;
          $('r-ideal').textContent = fmt(18.5 * h * h, 1) + ' – ' + fmt(24.9 * h * h, 1) + ' kg';
          showResult('r');
        }