import re

def improve_mortgage():
    path = 'd:/calchub/calculators/mortgage/index.html'
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Premium Inputs
    html = html.replace('bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2.5',
                        'bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus:ring-4 focus:ring-sky-500/20 transition-all duration-300')
    
    html = html.replace('bg-slate-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-600',
                       'bg-slate-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:ring-4 focus:ring-sky-500/20')

    # 2. Add subtle gradients to the large cards
    html = html.replace('class="bg-white dark:bg-slate-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-depth transition-all duration-250 hover:shadow-depth-hover"',
                        'class="bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/40 rounded-xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.16)] relative overflow-hidden"')

    # 3. Enhance Calculate Button
    html = html.replace('bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-250 transform active:scale-[0.99] flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900/50',
                        'bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-500 dark:hover:to-blue-600 text-white font-extrabold text-lg py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(15,23,42,0.5)] dark:shadow-[0_8px_20px_-6px_rgba(14,165,233,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(15,23,42,0.6)] dark:hover:shadow-[0_12px_25px_-6px_rgba(14,165,233,0.6)] hover:-translate-y-0.5 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 focus:outline-none ring-1 ring-white/20')

    # 4. Enhance Main Output Number
    html = html.replace('text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight',
                        'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mt-1 tracking-tighter drop-shadow-sm')
                        
    # 5. Fix "LIVE ESTIMATE" badge
    html = html.replace('text-xs font-bold font-mono text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/30 px-3 py-1.5 rounded-full border border-sky-200 dark:border-sky-800/50',
                        'text-[10px] font-black font-mono text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-500/10 px-3 py-1.5 rounded-full border border-sky-200/50 dark:border-sky-400/20 shadow-[0_2px_10px_-2px_rgba(14,165,233,0.1)] flex items-center gap-2 uppercase tracking-widest')
                        
    html = html.replace('>LIVE\n                             ESTIMATE</span>',
                        '><span class="flex h-1.5 w-1.5 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span></span>LIVE ESTIMATE</span>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)


def improve_homepage():
    path = 'd:/calchub/index.html'
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Hero Gradient Overlay
    html = html.replace('from-blue-100/50 via-background-light to-background-light dark:from-blue-900/20 dark:via-background-dark dark:to-background-dark',
                        'from-sky-300/30 via-purple-300/10 to-transparent dark:from-sky-900/30 dark:via-indigo-900/10 dark:to-transparent animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]')

    # 2. Main Heading - better gradient 
    html = html.replace('text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400',
                        'text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400 drop-shadow-sm')

    # 3. Search Bar Glassmorphism 
    html = html.replace('max-w-3xl mx-auto bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-2xl shadow-black/20 border border-slate-100 dark:border-white/5 ring-1 ring-white/10',
                        'max-w-3xl mx-auto bg-white/80 dark:bg-surface-dark/80 backdrop-blur-2xl rounded-2xl p-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/10 ring-1 ring-slate-900/5 dark:ring-white/5 transition-all hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.15)]')
    
    html = html.replace('h-full px-6 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all shadow-md shadow-blue-500/20',
                        'h-full px-8 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold tracking-wide rounded-xl flex items-center gap-2 transition-all shadow-[0_8px_16px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_20px_-4px_rgba(59,130,246,0.6)] hover:-translate-y-0.5')

    # 4. Premium Cards hover effects
    html = html.replace('hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 group shadow-sm',
                        'hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.25)] hover:border-sky-500/30 dark:hover:border-sky-400/30 hover:-translate-y-1.5 transition-all duration-300 group shadow-sm relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-sky-50/50 dark:hover:from-surface-dark dark:hover:to-surface-dark/90')

    html = html.replace('hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 group',
                        'hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.25)] hover:border-sky-500/30 dark:hover:border-sky-400/30 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-sky-50/50 dark:hover:from-surface-dark dark:hover:to-surface-dark/90')
    
    html = html.replace('hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.25)] hover:border-sky-500/30 dark:hover:border-sky-400/30 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-sky-50/50 dark:hover:from-surface-dark dark:hover:to-surface-dark/90"',
                        'hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.25)] hover:border-sky-500/30 dark:hover:border-sky-400/30 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-sky-50/50 dark:hover:from-surface-dark dark:hover:to-surface-dark/90"')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)

improve_mortgage()
improve_homepage()
