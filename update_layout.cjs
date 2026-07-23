const fs = require('fs');

let code = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// 1. Extract Unified Timer
const timerStart = code.indexOf('{/* Unified Timer / Alarme (Online & Offline) */}');
const equipStart = code.indexOf('{/* Equipments Extra Regen (ONLY Online) */}');
const timerCode = code.substring(timerStart, equipStart);
code = code.substring(0, timerStart) + code.substring(equipStart);

// 2. Wrap timer code in its own motion.div or medieval-card if we move it to the bottom?
const newTimerCode = `
        {/* Timer Panel at the bottom */}
        <div className="w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="medieval-card p-6 sm:p-8"
          >
            ` + timerCode.replace('className="pt-4 border-t border-medieval-gold/20"', 'className=""') + `
          </motion.div>
        </div>
`;

// 3. Swap Análise por BP Panel and Results Panel
const analiseStart = code.indexOf('{/* Análise por BP Panel */}');
const resultsStart = code.indexOf('{/* Results Panel */}');
const lastMotionDivClose = code.lastIndexOf('</motion.div>');

const beforeAnalise = code.substring(0, analiseStart);
const afterAnalise = code.substring(analiseStart, lastMotionDivClose + '</motion.div>'.length);
const veryEnd = code.substring(lastMotionDivClose + '</motion.div>'.length);

const parts = afterAnalise.split('{/* Results Panel */}');
const bpPanel = parts[0];
const resultsPanel = '{/* Results Panel */}' + parts[1];

const finalCode = beforeAnalise + "\n" + resultsPanel + "\n" + bpPanel + "\n" + newTimerCode + "\n" + veryEnd;

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', finalCode);
console.log('Layout updated successfully');
