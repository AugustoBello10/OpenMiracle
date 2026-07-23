const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// The new section ends with </div></div></div></div></div>... wait, 
// I need to add one more </div> at the end to replace the one that was swallowed.
// Actually, let's just add a </div> right before )}
code = code.replace(/                  <\/div>\n                \)}\n              <\/motion\.div>/, 
`                  </div>
</div>
                )}
              </motion.div>`);

fs.writeFileSync('src/App.tsx', code);
