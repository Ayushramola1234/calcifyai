/**
 * CalcHub – common.js
 *
 * Contains ONLY:
 *  1. CALCS registry  – master list of all calculator pages
 *  2. Utility functions – pure math/formatting helpers used by calc pages
 *  3. UNIT_DATA – conversion tables for unit-converter page
 *
 * Does NOT touch the DOM. DOM work lives in:
 *   site-header.js  →  <site-header> web component
 *   site-footer.js  →  <site-footer> web component
 *   page-init.js    →  bootstrap + analytics hooks
 *
 * All exports go onto window.* so they're accessible from
 * inline <script> tags on each calculator page.
 */

/* ══════════════════════════════════════════════════════════
   CALCULATOR REGISTRY
   Add new calculators here — site-header search uses this.
   ══════════════════════════════════════════════════════════ */

window.CALCS = [
  // ── Financial ──────────────────────────────────────────────
  {
    id:   'mortgage',
    name: 'Mortgage Calculator',
    cat:  'Financial',
    icon: '🏠',
    url:  'mortgage-calculator.html',
    tags: ['home', 'house', 'piti', 'amortization', 'monthly payment', 'property tax'],
    desc: 'Monthly payment, total interest, amortization schedule',
  },
  {
    id:   'loan',
    name: 'Loan Calculator',
    cat:  'Financial',
    icon: '🏦',
    url:  'loan-calculator.html',
    tags: ['emi', 'personal loan', 'repayment', 'installment'],
    desc: 'EMI, total interest, principal breakdown',
  },
  {
    id:   'autoloan',
    name: 'Auto Loan Calculator',
    cat:  'Financial',
    icon: '🚗',
    url:  'auto-loan-calculator.html',
    tags: ['car', 'vehicle', 'car payment', 'financing'],
    desc: 'Car loan monthly payment and total cost',
  },
  {
    id:   'interest',
    name: 'Interest Calculator',
    cat:  'Financial',
    icon: '📈',
    url:  'interest-calculator.html',
    tags: ['simple interest', 'compound', 'savings'],
    desc: 'Simple and compound interest',
  },
  {
    id:   'payment',
    name: 'Payment Calculator',
    cat:  'Financial',
    icon: '💳',
    url:  'payment-calculator.html',
    tags: ['monthly payment', 'loan payment'],
    desc: 'Find monthly payment for any loan',
  },
  {
    id:   'retirement',
    name: 'Retirement Calculator',
    cat:  'Financial',
    icon: '👴',
    url:  'retirement-calculator.html',
    tags: ['401k', 'pension', 'savings', 'ira', 'fire'],
    desc: 'Project your retirement savings',
  },
  {
    id:   'amortization',
    name: 'Amortization Calculator',
    cat:  'Financial',
    icon: '📋',
    url:  'amortization-calculator.html',
    tags: ['amortization schedule', 'payment table', 'loan schedule'],
    desc: 'Full monthly payment schedule table',
  },
  {
    id:   'investment',
    name: 'Investment Calculator',
    cat:  'Financial',
    icon: '📊',
    url:  'investment-calculator.html',
    tags: ['roi', 'returns', 'stocks', 'future value', 'portfolio'],
    desc: 'Future value of investments',
  },
  {
    id:   'inflation',
    name: 'Inflation Calculator',
    cat:  'Financial',
    icon: '💸',
    url:  'inflation-calculator.html',
    tags: ['cpi', 'purchasing power', 'real value'],
    desc: 'Purchasing power over time',
  },
  {
    id:   'finance',
    name: 'Finance Calculator',
    cat:  'Financial',
    icon: '🧮',
    url:  'finance-calculator.html',
    tags: ['tvm', 'time value', 'pv', 'fv', 'present value', 'future value'],
    desc: 'PV, FV, rate and payment (TVM) solver',
  },
  {
    id:   'incometax',
    name: 'Income Tax Calculator',
    cat:  'Financial',
    icon: '🧾',
    url:  'income-tax-calculator.html',
    tags: ['federal tax', 'irs', 'tax bracket', 'tax return', 'effective rate'],
    desc: 'US federal income tax estimate',
  },
  {
    id:   'compound',
    name: 'Compound Interest Calculator',
    cat:  'Financial',
    icon: '🌱',
    url:  'compound-interest-calculator.html',
    tags: ['compound', 'interest', 'growth', 'apy', 'apr'],
    desc: 'Investment growth over time',
  },
  {
    id:   'salary',
    name: 'Salary Calculator',
    cat:  'Financial',
    icon: '💼',
    url:  'salary-calculator.html',
    tags: ['hourly wage', 'annual salary', 'monthly pay', 'weekly pay'],
    desc: 'Hourly, daily, monthly, annual salary converter',
  },
  {
    id:   'interestrate',
    name: 'Interest Rate Calculator',
    cat:  'Financial',
    icon: '🔢',
    url:  'interest-rate-calculator.html',
    tags: ['find rate', 'implied rate', 'apr', 'apy'],
    desc: 'Find the implied interest rate',
  },
  {
    id:   'salestax',
    name: 'Sales Tax Calculator',
    cat:  'Financial',
    icon: '🏷️',
    url:  'sales-tax-calculator.html',
    tags: ['vat', 'gst', 'tax rate', 'after tax price'],
    desc: 'Add or remove GST/VAT/sales tax',
  },
  // ── Health & Fitness ──────────────────────────────────────
  {
    id:   'bmi',
    name: 'BMI Calculator',
    cat:  'Health',
    icon: '⚖️',
    url:  'bmi-calculator.html',
    tags: ['body mass index', 'overweight', 'underweight', 'healthy weight', 'obesity'],
    desc: 'Body Mass Index with health category',
  },
  {
    id:   'calorie',
    name: 'Calorie Calculator',
    cat:  'Health',
    icon: '🔥',
    url:  'calorie-calculator.html',
    tags: ['tdee', 'daily calories', 'weight loss', 'diet', 'nutrition', 'maintenance'],
    desc: 'Daily calorie needs (TDEE)',
  },
  {
    id:   'bodyfat',
    name: 'Body Fat Calculator',
    cat:  'Health',
    icon: '📐',
    url:  'body-fat-calculator.html',
    tags: ['body fat percentage', 'navy method', 'lean mass', 'fat mass'],
    desc: 'Estimate body fat percentage (US Navy method)',
  },
  {
    id:   'bmr',
    name: 'BMR Calculator',
    cat:  'Health',
    icon: '💗',
    url:  'bmr-calculator.html',
    tags: ['basal metabolic rate', 'metabolism', 'calories at rest'],
    desc: 'Basal Metabolic Rate',
  },
  {
    id:   'idealweight',
    name: 'Ideal Weight Calculator',
    cat:  'Health',
    icon: '🎯',
    url:  'ideal-weight-calculator.html',
    tags: ['healthy weight', 'target weight', 'robinson', 'devine', 'hamwi'],
    desc: 'Your healthy weight range (4 formulas)',
  },
  {
    id:   'pace',
    name: 'Pace Calculator',
    cat:  'Health',
    icon: '🏃',
    url:  'pace-calculator.html',
    tags: ['running pace', 'min per mile', 'min per km', '5k', '10k', 'marathon'],
    desc: 'Running pace, time, and distance',
  },
  {
    id:   'pregnancy',
    name: 'Pregnancy Calculator',
    cat:  'Health',
    icon: '🤰',
    url:  'pregnancy-calculator.html',
    tags: ['lmp', 'last period', 'due date', 'weeks pregnant', 'trimester'],
    desc: 'Due date and pregnancy milestones from LMP',
  },
  {
    id:   'conception',
    name: 'Pregnancy Conception Calculator',
    cat:  'Health',
    icon: '🌸',
    url:  'pregnancy-conception-calculator.html',
    tags: ['conception date', 'fertile window', 'ovulation'],
    desc: 'Conception date and fertile window',
  },
  {
    id:   'duedate',
    name: 'Due Date Calculator',
    cat:  'Health',
    icon: '📅',
    url:  'due-date-calculator.html',
    tags: ['pregnancy due date', 'edd', 'estimated delivery', 'ultrasound'],
    desc: 'Calculate pregnancy due date 3 ways',
  },
  // ── Math ─────────────────────────────────────────────────
  {
    id:   'scientific',
    name: 'Scientific Calculator',
    cat:  'Math',
    icon: '🔬',
    url:  'scientific-calculator.html',
    tags: ['trig', 'sin', 'cos', 'tan', 'log', 'ln', 'factorial'],
    desc: 'Advanced scientific math functions',
  },
  {
    id:   'fraction',
    name: 'Fraction Calculator',
    cat:  'Math',
    icon: '½',
    url:  'fraction-calculator.html',
    tags: ['add fractions', 'subtract fractions', 'multiply', 'divide', 'simplify'],
    desc: 'Add, subtract, multiply, divide fractions',
  },
  {
    id:   'percentage',
    name: 'Percentage Calculator',
    cat:  'Math',
    icon: '%',
    url:  'percentage-calculator.html',
    tags: ['percent of', 'percentage change', 'what percent', 'increase decrease'],
    desc: 'Three types of percentage calculations',
  },
  {
    id:   'random',
    name: 'Random Number Generator',
    cat:  'Math',
    icon: '🎲',
    url:  'random-number-generator.html',
    tags: ['random', 'dice', 'lottery', 'rng'],
    desc: 'Generate random numbers in any range',
  },
  {
    id:   'triangle',
    name: 'Triangle Calculator',
    cat:  'Math',
    icon: '△',
    url:  'triangle-calculator.html',
    tags: ['sss', 'sas', 'pythagorean', 'area', 'perimeter', 'angles'],
    desc: 'Sides, angles, area, and perimeter',
  },
  {
    id:   'stddev',
    name: 'Standard Deviation Calculator',
    cat:  'Math',
    icon: 'σ',
    url:  'standard-deviation-calculator.html',
    tags: ['std dev', 'variance', 'mean', 'statistics', 'population', 'sample'],
    desc: 'Mean, variance, and standard deviation',
  },
  // ── Other ────────────────────────────────────────────────
  {
    id:   'age',
    name: 'Age Calculator',
    cat:  'Other',
    icon: '🎂',
    url:  'age-calculator.html',
    tags: ['date of birth', 'birthday', 'how old', 'years old', 'exact age'],
    desc: 'Exact age in years, months, and days',
  },
  {
    id:   'date',
    name: 'Date Calculator',
    cat:  'Other',
    icon: '📅',
    url:  'date-calculator.html',
    tags: ['days between dates', 'add days', 'days from date', 'business days'],
    desc: 'Days between dates and date math',
  },
  {
    id:   'time',
    name: 'Time Calculator',
    cat:  'Other',
    icon: '⏰',
    url:  'time-calculator.html',
    tags: ['add time', 'subtract time', 'hours minutes seconds', 'duration'],
    desc: 'Add, subtract, and convert time',
  },
  {
    id:   'hours',
    name: 'Hours Calculator',
    cat:  'Other',
    icon: '⏱️',
    url:  'hours-calculator.html',
    tags: ['work hours', 'time card', 'overtime', 'hourly pay', 'timesheet'],
    desc: 'Work hours, overtime, and pay',
  },
  {
    id:   'gpa',
    name: 'GPA Calculator',
    cat:  'Other',
    icon: '🎓',
    url:  'gpa-calculator.html',
    tags: ['grade point average', 'college gpa', 'semester gpa', 'cumulative'],
    desc: 'Calculate and track GPA',
  },
  {
    id:   'grade',
    name: 'Grade Calculator',
    cat:  'Other',
    icon: '📝',
    url:  'grade-calculator.html',
    tags: ['weighted grade', 'final exam needed', 'letter grade', 'class grade'],
    desc: 'Weighted grade average and needed score',
  },
  {
    id:   'concrete',
    name: 'Concrete Calculator',
    cat:  'Other',
    icon: '🧱',
    url:  'concrete-calculator.html',
    tags: ['concrete bags', 'slab', 'footing', 'cubic yards', 'cement', 'construction'],
    desc: 'Concrete bags for slabs and footings',
  },
  {
    id:   'subnet',
    name: 'Subnet Calculator',
    cat:  'Other',
    icon: '🌐',
    url:  'subnet-calculator.html',
    tags: ['ip', 'cidr', 'network', 'subnet mask', 'host range', 'broadcast'],
    desc: 'IPv4 subnet, mask, and host count',
  },
  {
    id:   'password',
    name: 'Password Generator',
    cat:  'Other',
    icon: '🔒',
    url:  'password-generator.html',
    tags: ['random password', 'strong password', 'secure', 'passphrase'],
    desc: 'Secure random password generator',
  },
  {
    id:   'conversion',
    name: 'Conversion Calculator',
    cat:  'Other',
    icon: '🔄',
    url:  'conversion-calculator.html',
    tags: ['unit converter', 'length', 'weight', 'temperature', 'volume', 'speed', 'metric'],
    desc: '11 unit categories — length, weight, temp, and more',
  },
];

/* ══════════════════════════════════════════════════════════
   UNIT CONVERSION DATA
   ══════════════════════════════════════════════════════════ */

window.UNIT_DATA = {
  length:      { label:'Length',          units:['Meter','Kilometer','Centimeter','Millimeter','Mile','Yard','Foot','Inch','Nautical Mile'], base:[1,1000,0.01,0.001,1609.344,0.9144,0.3048,0.0254,1852] },
  weight:      { label:'Weight / Mass',   units:['Kilogram','Gram','Milligram','Pound','Ounce','Metric Ton','Stone'],                        base:[1,0.001,0.000001,0.453592,0.0283495,1000,6.35029] },
  temperature: { label:'Temperature',     units:['Celsius','Fahrenheit','Kelvin'],                                                           base:null },
  volume:      { label:'Volume',          units:['Liter','Milliliter','Cubic Meter','US Gallon','US Quart','US Pint','US Cup','Fluid Oz'],   base:[1,0.001,1000,3.78541,0.946353,0.473176,0.236588,0.0295735] },
  area:        { label:'Area',            units:['Sq Meter','Sq Kilometer','Sq Centimeter','Sq Foot','Sq Inch','Acre','Hectare'],            base:[1,1e6,0.0001,0.0929,0.000645,4046.86,10000] },
  speed:       { label:'Speed',           units:['m/s','km/h','mph','Knot','ft/s'],                                                          base:[1,0.277778,0.44704,0.514444,0.3048] },
  time:        { label:'Time',            units:['Second','Minute','Hour','Day','Week','Month (avg)','Year'],                                base:[1,60,3600,86400,604800,2628000,31536000] },
  data:        { label:'Digital Storage', units:['Bit','Byte','Kilobyte','Megabyte','Gigabyte','Terabyte','Petabyte'],                       base:[0.125,1,1024,1048576,1073741824,1099511627776,1.126e15] },
  pressure:    { label:'Pressure',        units:['Pascal','Bar','PSI','Atmosphere','mmHg','kPa'],                                            base:[1,100000,6894.76,101325,133.322,1000] },
  energy:      { label:'Energy',          units:['Joule','Kilojoule','Calorie','Kilocalorie','kWh','BTU'],                                   base:[1,1000,4.184,4184,3600000,1055.06] },
};

window.convertTemp = function (v, from, to) {
  let c;
  switch (from) {
    case 'Celsius':    c = v; break;
    case 'Fahrenheit': c = (v - 32) * 5 / 9; break;
    default:           c = v - 273.15;
  }
  switch (to) {
    case 'Celsius':    return +c.toFixed(8);
    case 'Fahrenheit': return +(c * 9 / 5 + 32).toFixed(8);
    default:           return +(c + 273.15).toFixed(8);
  }
};

/* ══════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   Pure functions — no DOM dependencies.
   ══════════════════════════════════════════════════════════ */

/**
 * Format a number with locale commas and fixed decimal places.
 * @param {number} n
 * @param {number} [d=2] – decimal places
 * @returns {string}
 */
window.fmt = function (n, d = 2) {
  if (!isFinite(n) || isNaN(n)) return '—';
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
};

/** fmt with 0 decimal places */
window.fmtD = n => window.fmt(n, 0);

/** Shorthand for document.getElementById */
window.$ = id => document.getElementById(id);

/** Show a .result-box by adding .show */
window.showResult = function (id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
};

/** Hide a .result-box by removing .show */
window.hideResult = function (id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
};

/** Today as YYYY-MM-DD */
window.today = () => new Date().toISOString().slice(0, 10);

/** Greatest common divisor */
window.gcd = function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); };

/** Parse HH:MM:SS / MM:SS → total seconds */
window.parseTimeStr = function (s) {
  const parts = String(s).trim().split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parseFloat(s) || 0;
};

/** Total seconds → H:MM:SS or M:SS */
window.fmtTime = function (sec) {
  sec = Math.round(sec);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
};

/* ══════════════════════════════════════════════════════════
   SCIENTIFIC CALCULATOR LOGIC (stateful module)
   Consumed by scientific-calculator.html
   ══════════════════════════════════════════════════════════ */

window.Sci = (() => {
  let val = '0', op = null, prev = null, fresh = true, deg = true;

  const update = () => { const d = $('sci-d'); if (d) d.textContent = val; };
  const clean  = v => parseFloat(v.toFixed(10));
  const toRad  = v => deg ? v * Math.PI / 180 : v;

  const compute = (a, b, o) => {
    switch (o) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : Infinity;
      case '^': return Math.pow(a, b);
      default:  return b;
    }
  };

  return {
    digit(n) { val = fresh ? n : (val === '0' ? n : val + n); fresh = false; update(); },
    dot()    { if (fresh) { val = '0.'; fresh = false; } else if (!val.includes('.')) val += '.'; update(); },
    sign()   { val = String(-parseFloat(val)); update(); },
    pct()    { val = String(parseFloat(val) / 100); update(); },
    clear()  { val = '0'; op = null; prev = null; fresh = true; update(); },
    del()    { val = val.length > 1 ? val.slice(0, -1) : '0'; update(); },
    setDeg(d){ deg = d; },
    oper(o)  {
      if (prev !== null && !fresh)
        val = String(clean(compute(parseFloat(prev), parseFloat(val), op)));
      prev = val; op = o; fresh = true; update();
    },
    equals() {
      if (!op) return;
      val = String(clean(compute(parseFloat(prev), parseFloat(val), op)));
      prev = null; op = null; fresh = true; update();
    },
    fn(f) {
      const v = parseFloat(val);
      const map = {
        sin:  () => clean(Math.sin(toRad(v))),
        cos:  () => clean(Math.cos(toRad(v))),
        tan:  () => clean(Math.tan(toRad(v))),
        asin: () => clean(deg ? Math.asin(v)*180/Math.PI : Math.asin(v)),
        acos: () => clean(deg ? Math.acos(v)*180/Math.PI : Math.acos(v)),
        atan: () => clean(deg ? Math.atan(v)*180/Math.PI : Math.atan(v)),
        log:  () => clean(Math.log10(v)),
        ln:   () => clean(Math.log(v)),
        sqrt: () => clean(Math.sqrt(v)),
        abs:  () => Math.abs(v),
        fact: () => { let r = 1; for (let i = 2; i <= Math.round(v); i++) r *= i; return r; },
        pi:   () => Math.PI,
        e:    () => Math.E,
      };
      if (map[f]) { val = String(map[f]()); fresh = true; update(); }
    },
  };
})();
