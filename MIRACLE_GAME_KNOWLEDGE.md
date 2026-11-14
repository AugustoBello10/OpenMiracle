# Miracle 7.4 — Base de Conhecimento Oficial do Jogo (Game Lore & Mechanics)

> **AVISO OBRIGATÓRIO PARA AGENTES DE IA E DESENVOLVEDORES:**
> Este documento contém os fatos, mecânicas e regras confirmadas do servidor **Miracle 7.4**.
> **NUNCA invente ou presuma regras baseadas no Tibia Global ou outros OTServers.** O que não estiver explicitamente neste documento ou confirmado em arquivos do jogo deve ser questionado ao usuário antes de ser publicado.

---

## 1. 📦 Relic Box (Caixa de Relíquias)
* **Capacidade Máxima:** **6 slots exclusivos** para equipar relíquias (relic-1 até relic-6).
* **Regra de Unicidade:** O jogador só pode equipar **uma relíquia de cada tipo** por vez (proibido equipar relíquias idênticas para duplicar bônus).
* **Estrutura de Desbloqueio dos Slots:**
  - **1º e 2º Slots:** Desbloqueados através de missão com o sábio cego **Melchior em Ankrahmun**. O jogador deve falar `"hi"` e em seguida `"notes"` para receber as pistas e iniciar a quest.
  - **3º Slot:** Requer completar a Missão 1 da Relic Quest.
  - **4º Slot:** Requer completar a Missão 2 da Relic Quest.
  - **5º Slot:** Custa **30.000 gold (30k)** *(preço oficial reduzido de 40.000)*.
  - **6º Slot:** Custa **60.000 gold (60k)** *(preço oficial reduzido de 115.000)*.
  - Custo total para comprar os slots 5 e 6: **90.000 gold**.

---

## 2. ⚔️ Armas de Treino (Training Weapons)
* **NÃO EXISTE DUMMY AUTOMATIZADO:** No Miracle 7.4 **NÃO existem bonecos de treino (dummies) com ataque contínuo automático** como no Tibia Global.
* **Mecânica Real:** As armas de treino são armas especiais equipadas na mão do personagem e utilizadas no **combate normal de treino contra criaturas** (ex: summons como Monks ou monstros com boa defesa).
* **Propriedade Principal:** Funcionam através de **Redução de Intervalo de Ataque (Reduced Attack Interval)** e possuem cargas finitas:
  - **Regular:** Intervalo base (0%)
  - **Spark:** Redução de intervalo de -10%
  - **Lightning:** Redução de intervalo de -15%
  - **Inferno:** Redução de intervalo de -20%
  - **Shadow:** Redução de intervalo de -20%
* **Cargas:** Variações finitas de cargas (de 3.600 até 43.200 cargas). A cada golpe desferido contra uma criatura, gasta-se 1 carga.
* **Onde Conseguir:** Vendidas pelo NPC Sam em Thais (versões base). **NÃO são compradas na Store in-game.**

---

## 3. 🛏️ Bed Maker & Regeneração em Cama
* **Requisitos:**
  - Personagem deve possuir **Premium Account**.
  - Limite máximo de **2 personagens dormindo simultaneamente por conta**.
* **Mecânica de Mana & Tempo:**
  - Regenera no máximo **200 de mana** no total por ciclo de sono.
  - Taxa de regeneração: **1 MP por minuto**.
  - Tempo necessário para regenerar os 200 de mana: **200 minutos = 3 horas e 20 minutos**.
* **Alimentação (Food Multiplier 5x):**
  - A cama aplica um multiplicador de **5x** sobre a duração do food.
  - Para cobrir os 200 minutos de sono, o personagem precisa estar alimentado até o limite máximo do client: **39 minutos e 59 segundos** de food ($39\text{m}59\text{s} \times 5 \approx 200\text{ min}$).
* **Ciclo Ideal do Jogador:**
  1. Logar no personagem a cada **3 horas e 20 minutos**.
  2. Gastar a mana fazendo as runas desejadas (ex: UH, GFB, HMM, Explosion).
  3. Comer até atingir **39m59s** de food.
  4. Deitar na cama novamente e deslogar.

---

## 4. 🏪 Player Shop (Mercado Offline / Idle Shop)
* **Item de Licença:** Requer o item **Private Store Document**, adquirido na Store in-game por **10 Miracle Points**.
* **Duração da Loja:** Cada documento garante **48 horas contínuas** de funcionamento da loja enquanto o jogador está deslogado (modo *Idle Shop*).
* **Localização Permitida (REGRA CRÍTICA):**
  - OBRIGATÓRIO estar dentro de **Protection Zone (PZ)** real (onde aparece o ícone de casinha/PZ no client).
  - **PRAÇAS COMUNS NÃO SÃO PZ:** Nunca generalize praças de cidades como PZ. Se não for Protection Zone oficial do client, a loja não abre.
  - Todos os **8 SQMs ao redor do personagem devem estar totalmente vazios** (sem outros players, móveis ou itens no chão).
* **Taxa de Transação (Fee):** O servidor retém **5% do valor** de cada item vendido.
* **Multi-clienting:** Enquanto o personagem estiver em *Idle Shop*, o jogador **NÃO pode logar outro personagem da MESMA conta**.
* **Server Save Diário:** O Server Save diário reseta todas as lojas ativas por manutenção. Após o Server Save, basta logar no char e clicar novamente com botão direito no boneco -> *"Open Shop"*.

---

## 5. ✨ Atributos, Encantamento & Mystic Runes
* **Fontes de Atributos:** Monstros podem dropar itens com atributos místicos aleatórios, ou o jogador pode encantar seus próprios equipamentos.
* **Processo de Encantamento:**
  - Obter uma **Mystic Rune** (drop de criaturas, baús ou Player Shop).
  - Adicionar **Arcane Orbs** (vendidos pelo NPC Alexander em Edron). O *Grand Arcane Orb* aumenta a chance em +50%.
  - Dar *Use* na runa/orbe e clicar sobre o equipamento elegível.
* **Regra de Morte (20% Perda de Atributo):**
  - Ao morrer, existe **20% de chance** de que um atributo encantado quebre e seja perdido para sempre.
  - **Proteção Total:** Para anular essa perda, o jogador deve comprar a **6ª bênção** chamada *"The Arcane Guardian"* com o NPC Humphrey em Carlin ou com Eremo.

---

## 6. 🛡️ Mitigação & Proteções
* **Mitigação não é flat:** Mitigação é um atributo composto por **Chance de Ativação (%)** e **Valor de Redução (%)** (ex: chance 7%, redução 30%).
* Ela **NÃO** entra em 100% dos hits sofridos. Entra com a probabilidade $P = \text{Chance}\%$.
* O impacto matemático médio esperado é dado por: $E[\text{Mit}] = \text{Chance} \times \text{Redução}$.

---

## 7. 🔨 Exaltation Forge
* **Classificação de Itens:** O limite máximo de classificação de equipamentos é estritamente **Classe 5** (Classe 1 até Classe 5). Nunca referenciar "Classe 6" ou "Classe 4+".

---

## 8. 📜 Profissões & Mestres (Diálogo Padronizado & Addons)
* **Diálogo Universal de Iniciação:** O diálogo padrão para se tornar membro oficial em qualquer profissão segue estritamente a sequência:
  1. `hi`
  2. `profession`
  3. `yes`
  *(Taxa de 20.000 gold + skill mínimo requerido na atividade).*
* **NPC Hoggle (Mestre Pescador):**
  - **Localização:** Sul de Thais (`x: 32537, y: 32143, z: 6`).
  - **Addon 1 (Fishing Rod):** 1x Iron Hammer, 200x Scarab Pincers, 200x Bone Tails + taxa de 25.000 gold (25k).
  - **Addon 2 (Basket):** 1x Basket, 300x Cobra Tongues + taxa de 25.000 gold (25k).
  - Diálogo de Addon: falar `addon`, selecionar `fishing rod` ou `basket`, e confirmar com `yes`.
  - **REGRA CRÍTICA DE ORIGEM DOS MATERIAIS DE CRIATURAS:** Produtos de criaturas como *Scarab Pincers*, *Bone Tails* e *Cobra Tongues* **NÃO SÃO DROPS** normais de monstros. Eles são extraídos exclusivamente através da profissão de **Skinning (Esfolamento)**, escalpelando os corpos das criaturas mortas com facas de skinning, ou comprados de outros jogadores. NUNCA classificar esses itens como loot drop!

---

## 9. ⚒️ Forja, Fundição & Desmonte (Blacksmith Update 03/08/2026 & 13/04/2026)
* **Localização do Iron Hammer Quest:** Kazordoon Minotaur Mountain (`x: 32434, y: 31938, z: 8`).
* **Sistema de Fundição (Smelting em Coal Basins):**
  - Minérios brutos são fundidos em barras utilizando bacias de carvão acesas (*coal basins*).
  - Todo o stack de minérios é convertido automaticamente em lotes de 5 minérios.
  - A fundição concede avanço de skill de forja e tem chance de êxito calculada pela skill:
    - **Copper Bar:** 5x Copper Ores (multiplicador 3.0)
    - **Iron Bar:** 5x Iron Ores (multiplicador 2.5)
    - **Gold Bar:** 5x Gold Ores (multiplicador 2.0)
    - **Mythan Bar:** 5x Mythan Ores (multiplicador 1.5)
    - **Mystic Bar:** 5x Mystic Ores (multiplicador 1.0)
* **Novas Receitas de Crafting (03/08/2026):**
  - **Armored War Bow:** 1x War Bow (consumido), 300 Steels, 200 Draconian Steels, 100 Hell Steels (mult 0.08, min chance 0%).
  - **10x Onyx Arrows:** 10 Arrows, 1 Onyx Fragment (mult 2.0).
  - **Golden Pick:** 1x Enhanced Pick (consumido), 40 Steels, 10 Draconian Steels, 3 Hell Steels, 3 Gold Bars.
  - **Machados de Corte:** Refined Axe (mult 2.0, 5 steels), Superior Axe (mult 1.5, 10 steels, 1 drac), Masterwork Axe (mult 1.0, 20 steels, 5 drac), Grandmaster Axe (mult 0.8, 40 steels, 10 drac, 3 gold bars).
  - **Pedras & Brasões:** Earth Stone (5 natural soil), Frozen Stone (5 frozen ore), Fiery Stone (mult 1.0), Onyx (10 onyx fragments, mult 0.5), Brasões de Cobre, Ferro, Ouro, Mythan e Mystic (5 barras cada, mult 1.0).
* **Desmonte de Equipamentos (Breaking 13/04/2026):**
  - Scythe (1 steel, 100%), Dark Shield (5 steels), Soldier Helmet (1 steel), Studded Helmet (16%), Legion Helmet (66%), Scale Armor (6 steels), Chain Legs (2 steels), Wooden Shield (41% de 1 steel), Copper Shield (83% de 1 steel), Knife/Combat Knife (8.3%), Dagger (16%), Machete (50%), Hand Axe (33%), Axe (58%).

---

## 10. ⛏️ Mineração & Picaretas (Balanceamento 03/08/2026)
* **Proibição Absoluta do Tools Kit:** O item *Tools Kit* foi desabilitado e **NÃO** pode mais ser utilizado para minerar rochas.
* **Tiers de Rochas & Picaretas:**
  - **Pick (Básica):** Minera pedras de **Tier 1**. Agora dropa fragmentos em lava holes, ice holes e mossy stones. Chance de quebra: **0.2%** (anteriormente 0%).
  - **Modified Pick:** Minera pedras de **Tier 1 e 2**. Chance de quebra: **0.6%** (anteriormente 0.5%). Bônus em Tier 1: **+2.5% chance de quebra no alvo, +50% de drop**.
  - **Advanced Pick:** Minera pedras de **Tier 1 a 3**. Chance de quebra: **1.0%**. Bônus: Tier 1 (+5% quebra, +100% drop) e Tier 2 (+2.5% quebra, +50% drop).
  - **Enhanced Pick:** Minera pedras de **Tier 1 a 4**. Chance de quebra: **1.4%** (reduzida de 1.5%). Bônus: Tier 1 (+7.5% qb, +150% dp), Tier 2 (+5% qb, +100% dp), Tier 3 (+2.5% qb, +50% dp).
  - **Golden Pick:** Minera pedras de **Tier 1 a 4**. Chance de quebra: **1.8%**. Bônus: Tier 1 (+10% qb, +200% dp), Tier 2 (+7.5% qb, +150% dp), Tier 3 (+5% qb, +100% dp), Tier 4 (+2.5% qb, +50% dp).
