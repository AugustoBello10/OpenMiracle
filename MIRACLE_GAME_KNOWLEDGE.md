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
