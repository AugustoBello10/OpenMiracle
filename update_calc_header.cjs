const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `              <motion.div
                key="calculadoras"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Sub-navegação Calculadoras */}`;

const newStr = `              <motion.div
                key="calculadoras"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <header className="text-center mb-12 mt-4">
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" />
                    {language === 'pt' ? 'Calculadoras' : 'Calculators'}
                  </h1>
                  <p className="text-medieval-gold/80 font-mono text-sm">
                    {language === 'pt' ? 'Ferramentas essenciais para calcular seus ganhos e atributos' : 'Essential tools to calculate your gains and attributes'}
                  </p>
                </header>
                {/* Sub-navegação Calculadoras */}`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/App.tsx', content);
