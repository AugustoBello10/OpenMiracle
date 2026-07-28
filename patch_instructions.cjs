const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="h-\[85vh\] w-full">\s*<MapViewer language=\{language\} \/>\s*<\/div>/,
  `<div className="h-[85vh] w-full rounded-xl overflow-hidden shadow-2xl border border-medieval-gold/30">
                  <MapViewer language={language} />
                </div>
                <div className="mt-6 bg-zinc-900/80 backdrop-blur-md border border-medieval-gold/20 p-5 rounded-xl shadow-lg">
                  <h3 className="text-medieval-gold font-black mb-3 text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Guia de Navegação do Mapa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex gap-3">
                      <div className="mt-1 text-blue-400"><Search className="w-4 h-4" /></div>
                      <div>
                        <strong className="text-gray-100 block mb-1">Zoom e Visibilidade</strong>
                        Para garantir o melhor desempenho, os ícones de monstros só ficam visíveis quando você aproxima o mapa (zoom in).
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-green-400"><Filter className="w-4 h-4" /></div>
                      <div>
                        <strong className="text-gray-100 block mb-1">Filtros Avançados</strong>
                        Use a barra lateral direita para pesquisar monstros específicos pelo nome ou filtrar por classes (Demônios, Insetos, etc).
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-purple-400"><Layers className="w-4 h-4" /></div>
                      <div>
                        <strong className="text-gray-100 block mb-1">Exploração de Andares</strong>
                        Alterne entre os andares no controle flutuante inferior. O andar 7 geralmente representa a superfície do jogo.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 text-orange-400"><BookOpen className="w-4 h-4" /></div>
                      <div>
                        <strong className="text-gray-100 block mb-1">Integração com Cyclopedia</strong>
                        Clique no ícone de qualquer monstro no mapa para revelar detalhes rápidos e acessar a Cyclopedia completa.
                      </div>
                    </div>
                  </div>
                </div>`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Instructions added.");
