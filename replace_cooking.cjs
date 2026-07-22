const fs = require('fs');
let content = fs.readFileSync('src/components/ProfessionsGuideView.tsx', 'utf8');

const newCookingCase = `      case 'cooking':
        const cookingRecipesList = [
          {
            name: "Fishburger",
            effect: "Health Regen +1/6 seconds",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Fish", desc: "(Fishing)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "White Fishburger",
            effect: "Sword, Axe and Club +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x White Fish", desc: "(Fishing - Icy Islands)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "Swamp Fishburger",
            effect: "Distance +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Swamp Fish", desc: "(Fishing - Venore)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "Sand Fishburger",
            effect: "Shielding +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Sand Fish", desc: "(Fishing)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          }
        ];

        const prevRecipe = () => {
          setCookingRecipeIndex((prev) => (prev > 0 ? prev - 1 : cookingRecipesList.length - 1));
        };
        const nextRecipe = () => {
          setCookingRecipeIndex((prev) => (prev < cookingRecipesList.length - 1 ? prev + 1 : 0));
        };

        const currentCookingRecipe = cookingRecipesList[cookingRecipeIndex];

        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="cooking-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('cooking-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir', 'How to Acquire')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-bread')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Fazendo Pão', 'Baking Bread')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-special')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Comidas Especiais', 'Special Foods')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-recipes')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Receitas', 'Recipes')}</button></li>
              </ul>
            </div>

            <p>
              {t('A profissão de culinária (Cooking) permite criar alimentos que oferecem bônus especiais aos personagens. Além disso, cozinheiros evoluem sua skill de culinária mais rapidamente. Introduzimos o avanço do skill ao criar pães e hambúrgueres.', 'The cooking profession allows you to create foods that provide special bonuses to characters. In addition, cooks level up their cooking skill faster. We introduced the advancement of the skill when baking bread and burgers.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4 flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 space-y-4">
                <p>
                  {t('Para se tornar um cozinheiro, adquirir os benefícios da profissão e suas primeiras receitas, converse com o NPC Bjorn:', 'To become a cook, acquire the profession benefits and your first recipes, talk to the NPC Bjorn:')}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li><strong className="text-medieval-gold">{t('NPC:', 'NPC:')}</strong> <span className="text-blue-400 font-bold">Bjorn</span></li>
                  <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('Thais Castle (Castelo de Thais).', 'Thais Castle.')}</li>
                  <li><strong className="text-medieval-gold">{t('Custo:', 'Cost:')}</strong> {t('20.000 Gold Coins.', '20,000 Gold Coins.')}</li>
                </ul>
                <p className="text-sm text-stone-400">
                  {t('Ele também vende Cookbooks (livros de receitas) que podem ser usados para verificar todas as receitas que você já aprendeu.', 'He also sells Cookbooks that can be used to check all the recipes you have learned so far.')}
                </p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <a href="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746380/localizacaoNPCcooking.png" target="_blank" rel="noopener noreferrer" className="block w-full border border-medieval-gold/30 rounded overflow-hidden hover:border-medieval-gold transition-colors">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746380/localizacaoNPCcooking.png" alt="Localização NPC Bjorn" className="w-full h-auto object-cover" />
                </a>
                <span className="text-xs text-stone-500 mt-2">{t('Clique para ampliar', 'Click to enlarge')}</span>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-bread">{t('Fazendo Pão (Upando Cooking)', 'Baking Bread (Leveling Cooking)')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Fazer pão é a forma mais simples e barata de subir o nível de Cooking.', 'Baking bread is the simplest and cheapest way to level up Cooking.')}
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 py-6 overflow-x-auto min-w-max md:min-w-0">
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/scythe.gif" alt="Scythe" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Scythe</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Wheat.gif" alt="Wheat" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Wheat</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Bunch_of_Wheat.gif" alt="Bunch of Wheat" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1 text-center max-w-[50px] leading-tight">Bunch of Wheat</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Millstone.gif" alt="Millstone" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Millstone</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Flour.gif" alt="Flour" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Flour</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746572/water.png" alt="Water" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Water</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746567/Lump_of_Dough.gif" alt="Lump of Dough" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1 text-center max-w-[50px] leading-tight">Lump of Dough</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Oven.gif" alt="Oven" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Oven</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Bread.gif" alt="Bread" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Bread</span>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-sm text-stone-300 bg-black/40 p-4 rounded-lg border border-white/5">
                <p><strong>1.</strong> {t('Corte o Wheat (trigo) com uma Scythe para obter um Bunch of Wheat.', 'Cut Wheat using a Scythe to get a Bunch of Wheat.')}</p>
                <p><strong>2.</strong> {t('Use o Bunch of Wheat no Millstone (Moinho) para produzir Flour (farinha).', 'Use the Bunch of Wheat on a Millstone to produce Flour.')}</p>
                <p><strong>3.</strong> {t('Misture a Flour (farinha) com água (Water) para criar um Lump of Dough (massa).', 'Mix the Flour with Water to create a Lump of Dough.')}</p>
                <p><strong>4.</strong> {t('Asse um Lump of Dough por vez no Oven (Forno) para criar Bread (pão) e upar sua skill.', 'Bake one Lump of Dough at a time in an Oven to create Bread and level up your skill.')}</p>
              </div>

              <div className="mt-4 text-sm space-y-2">
                <p>
                  <strong className="text-medieval-gold">{t('Dica de Compra:', 'Buying Tip:')}</strong> {t('Você pode comprar trigo por 1gp cada no NPC ', 'You can buy wheat for 1gp each from NPC ')}
                  <a href="https://www.tibiawiki.com.br/wiki/Donald_McRonald" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">Donald McRonald</a>.
                </p>
                <p>
                  <strong className="text-medieval-gold">{t('Dica de Venda:', 'Selling Tip:')}</strong> {t('Venda os pães prontos por 2gp cada para o NPC ', 'Sell the baked bread for 2gp each to NPC ')}
                  <a href="https://www.tibiawiki.com.br/wiki/Sherry_McRonald" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">Sherry McRonald</a>.
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-special">{t('Comidas Especiais & Food Time', 'Special Foods & Food Time')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('No momento o jogo conta com 4 comidas especiais (Burgers). Cada uma fornece um bônus específico para o personagem por 20 minutos, mas também preenche o seu "Food Time". Isso significa que você precisará escolher cuidadosamente qual tipo de comida usar, pois assim que o tempo de comida estiver cheio, você não poderá comer novamente até ficar com fome (hungry)! O bônus dura exatamente o mesmo tempo que preenche de Food Time.', 'Currently the game features 4 special foods (Burgers). Each provides a specific bonus to the character for 20 minutes, but also fills your "Food Time". This means you will need to carefully choose which type of food to use, since once the food time is full, you will no longer be able to eat until you are hungry again! The bonus lasts exactly the same amount of time it fills the Food Time.')}
              </p>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h5 className="font-bold text-medieval-gold mb-2">{t('Exemplo de Combinação:', 'Combination Example:')}</h5>
                <ul className="list-disc pl-5 mb-2 text-sm text-stone-300">
                  <li><strong>White Fish Burger</strong>: sword, axe, club +1 (20 min)</li>
                  <li><strong>Swamp Fish Burger</strong>: distance +1 (20 min)</li>
                </ul>
                <p className="text-sm">
                  {t('Ao comer ambos, seu personagem terá bônus de melee e de distance. A duração de cada bônus será de 20 minutos, mas seu "Food Time" aumentará em 40 minutos (20 de cada)! Assim, você demorará mais para ter fome e usar outras comidas.', 'By using a white fish burger and a swamp fish burger, your character will have melee skill bonuses + distance bonuses. The duration of each bonus will last for 20 minutes, but your food time will increase by 40 minutes! So you will be less hungry to use other types of food!')}
                </p>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-4 mt-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746879/Reverse_Pepper.png" alt="Reverse Pepper" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h5 className="font-bold text-red-400 mb-1">{t('Reverse Pepper (Reset de Food Time)', 'Reverse Pepper (Food Time Reset)')}</h5>
                  <p className="text-sm text-stone-300">
                    {t('A loja do jogo (Store) oferece o item "Reverse Pepper". Uma dose dessa pimenta reseta o "Food Time" instantaneamente. Atenção: todas as condições de comidas especiais ativas também serão removidas.', 'The game Store offers the "Reverse Pepper" item. One dose of this pepper resets the "Food Time" instantly. Attention: all active special food conditions will also be removed.')}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-recipes">{t('Preparando Receitas', 'Cooking Recipes')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para começar a cozinhar, você precisa usar a receita (recipe) no seu personagem. As primeiras receitas são vendidas pelo NPC Bjorn, mas em breve teremos receitas raras em loots de criaturas e quests.', 'To start cooking, you need to use the recipe item on your character. The first recipes are sold by NPC Bjorn, but soon we will have rare recipes in creature loots and quests.')}
              </p>
              <p>
                {t('A mecânica de culinária está diretamente ligada à pesca, esfolamento (skinning) e outras. Para fazer os hambúrgueres de peixe, por exemplo, você precisará coletar diferentes tipos de peixes em variadas regiões do mapa.', 'The cooking mechanic is directly linked to fishing, skinning, and others. To make the fishburgers, for example, you will need to collect different types of fish in various regions of the map.')}
              </p>

              <div className="bg-stone-800/60 p-1 border border-medieval-gold/20 rounded-lg max-w-3xl mx-auto relative overflow-hidden">
                <div className="flex items-center justify-between bg-black/60 p-3 border-b border-medieval-gold/20">
                  <button onClick={prevRecipe} className="p-2 bg-white/5 hover:bg-medieval-gold/20 rounded text-medieval-gold transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                    <h5 className="font-bold text-medieval-gold text-xl tracking-wider">{currentCookingRecipe.name}</h5>
                    <span className="text-xs text-blue-300 block">{currentCookingRecipe.effect} | {currentCookingRecipe.duration}</span>
                  </div>
                  <button onClick={nextRecipe} className="p-2 bg-white/5 hover:bg-medieval-gold/20 rounded text-medieval-gold transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
                  <div>
                    <h6 className="font-bold text-stone-300 mb-3 uppercase text-xs tracking-widest border-b border-white/10 pb-1">{t('Ingredientes:', 'Ingredients:')}</h6>
                    <ul className="list-disc pl-5 text-sm text-stone-300 space-y-1">
                      {currentCookingRecipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {ing.name} <span className={\`text-xs \${ing.isRed ? 'text-red-400 font-bold' : 'text-stone-500'}\`}>{ing.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-bold text-stone-300 mb-3 uppercase text-xs tracking-widest border-b border-white/10 pb-1">{t('Modo de Preparo:', 'Preparation:')}</h6>
                    <ol className="list-decimal pl-5 text-sm text-stone-300 space-y-2">
                      <li>{t('Coloque óleo na Pan (frigideira).', 'Put oil in the Pan.')}</li>
                      <li>{t('Tempere os peixes e camarões com sal, pimenta e limão.', 'Season the fish and shrimp with salt, pepper, and lemon.')}</li>
                      <li>{t('Adicione os ingredientes temperados e o resto na Pan.', 'Add the seasoned ingredients and the rest to the Pan.')}</li>
                      <li>{t('Use sua Wooden Spoon e misture. O sucesso do prato dependerá da sua skill!', 'Use your wooden spoon and mix it. The success of the dish will depend on your cooking skill!')}</li>
                    </ol>
                    <p className="mt-6 text-xs text-red-400 font-bold bg-red-900/20 p-3 rounded border border-red-500/30 text-center">
                      {t('Atenção: Todos os ingredientes usados na frigideira (incluindo a própria Pan) são consumidos no processo!', 'Attention: All ingredients used in the pan (including the Pan itself) are consumed in the process!')}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {cookingRecipesList.map((_, i) => (
                    <div key={i} className={\`w-2 h-2 rounded-full \${i === cookingRecipeIndex ? 'bg-medieval-gold' : 'bg-white/20'}\`}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-medieval-gold mb-4 text-center">{t('Demonstração (Teaser)', 'Demonstration (Teaser)')}</h4>
              <div className="flex justify-center">
                <video 
                  controls 
                  className="rounded-lg border border-medieval-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.2)] max-w-full md:max-w-3xl"
                  poster="https://res.cloudinary.com/dc4nkbnkg/image/upload/chef_outfit.gif"
                >
                  <source src="https://res.cloudinary.com/dc4nkbnkg/video/upload/v1784745933/teaser-cooking.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>
        );`;

// We find the case 'cooking' and replace it until case 'farming'
const parts = content.split("case 'cooking':");
if (parts.length > 1) {
  const endParts = parts[1].split("case 'farming':");
  if (endParts.length > 1) {
    content = parts[0] + newCookingCase + "\n\n      case 'farming':" + endParts[1];
    fs.writeFileSync('src/components/ProfessionsGuideView.tsx', content, 'utf8');
    console.log("Success");
  } else {
    console.log("Could not find farming case");
  }
} else {
  console.log("Could not find cooking case");
}
