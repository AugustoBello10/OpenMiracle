# Miracle Wiki & Tools — Manual Técnico de Padronização & Regras de Engenharia

Este documento é o guia definitivo de arquitetura, interface, tipografia e diretrizes de desenvolvimento do projeto **Miracle Wiki Tools**. Qualquer agente de IA ou desenvolvedor atuando neste repositório DEVE seguir estritamente todas as regras abaixo.

---

## 1. 🚫 Proibição Absoluta de Símbolos e Ícones Decorativos em Cabeçalhos (Anti-AI Clutter)

O uso de emojis ou ícones SVG (Lucide) em títulos e cabeçalhos transmite uma aparência amadora ("cara de IA gerada") e polui a interface:

* **REGRA UNIVERSAL:** É ESTRITAMENTE PROIBIDO colocar ícones Lucide, emojis ou qualquer símbolo visual dentro de:
  - Títulos principais (`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`)
  - Subtítulos e títulos de seções
  - Cabeçalhos de cartões (`CardHeader`, `<span>` ou `<div>` com função de título de card)
  - Botões de cabeçalho de sistema (ex: botão "Fórmulas & Detalhes", botão de voltar, títulos de abas)
* **TÍTULOS DEVEM SER 100% TEXTO PURO:** Tipografia editorial limpa, profissional, legível e em caixa alta com tracking suave (`tracking-wider` ou `tracking-widest`).
* **ONDE ÍCONES SÃO PERMITIDOS:** Apenas como micro-indicadores utilitários inline dentro de linhas de dados ou tabelas (ex: pequeno ícone de coração vermelho ao lado do rótulo `Vida (HP):` ou indicador de peso `Cap:`). Nunca nos cabeçalhos.

---

## 2. 🎨 Padrão Oficial de Cores de Raridade por Atributos (Build Maker)

A coloração de bordas e pontos indicadores dos itens de inventário segue rigorosamente a quantidade de atributos encantados ativos:

| Qtd. Atributos | Cor da Borda / Efeito | Classes Tailwind |
| :--- | :--- | :--- |
| **0 atributos** | **Sem Cor (Neutro)** | `border-medieval-gold/15 bg-black/30` (sem glow, sem badge) |
| **1 atributo** | **Branco** | `border-white/80 text-white shadow-[0_0_8px_rgba(255,255,255,0.25)]` |
| **2 atributos** | **Verde** | `border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]` |
| **3 atributos** | **Azul** | `border-sky-500 text-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.3)]` |
| **4 atributos** | **Roxo** | `border-purple-500 text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.3)]` |
| **5 atributos** | **Dourado** | `border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]` |

* **Atributos Compostos:** No parser de logs (`buildImporter.ts`), atributos como `mitigation chance` e `mitigation amount` (ou `life leech chance` e `amount`) devem ser mesclados em um único objeto de atributo, garantindo que o item receba a quantidade real de atributos (ex: Demon Shield com 3 atributos = AZUL).

---

## 3. 🛡️ Resolução de Combate & Exibição de Defesa

O jogador quer ver **números práticos de combate** e não parágrafos teóricos ou didáticos. A apresentação deve conter:

1. **Bloqueio Físico (Escudo / Arma):**
   - Valores explícitos de Mínimo, Médio e Máximo de HP bloqueados.
   - Fórmula: $\text{MaxBlock} = \lfloor ((5 \times \text{Skill} + 50) \times \text{Def} \times \text{Stance} \times 0.0099) \times 1.1 \rfloor$
   - Multiplicadores de Postura: Full Defense ($1.8$), Balanced ($1.0$), Full Attack ($0.6$).
2. **Absorção da Armadura Total ($Arm$):**
   - Valores explícitos de Mínimo, Médio e Máximo de HP absorvidos.
   - Fórmulas oficiais:
     - $\text{Mínima} = \lfloor Arm \times 0.475 \rfloor$
     - $\text{Máxima} = \lfloor (Arm \times 0.95) - 1 \rfloor$
     - $\text{Média} = \lfloor (\text{Mínima} + \text{Máxima}) / 2 \rfloor$
3. **Mitigação Probabilística (Chance % vs. Valor %):**
   - Mitigação **não é flat**. Ela possui uma **Chance de Ativação** (ex: 7%) e um **Valor de Redução** (ex: 30%).
   - Explicitar no simulador:
     - Dano Normal (sem ativação da mitigação).
     - Dano Mitigado (com proc da chance %).
     - Impacto Médio Esperado: $E[\text{Mit}] = \text{Chance} \times \text{Redução}$.

---

## 4. 🌐 100% Bilinguismo Completo (PT e EN)

* Todo e qualquer texto, parágrafo narrativo, passo a passo, tabela, modal, tooltip, mensagem de erro e descrição de item DEVE possuir versão completa em Português (`language === 'pt'`) e Inglês (`language === 'en'`).
* **Nunca renderize texto hardcoded em português** quando o usuário selecionar inglês (`language === 'en'`).

---

## 5. 💻 Padrões de Interface, Layout e CSS

* **Botões de Navegação:** Devem conter `whitespace-nowrap` para impedir quebra de texto em telas menores ou zoom elevado (ex: botão "BUILD MAKER").
* **Inputs Numéricos:** Para inputs numéricos customizados (ex: Level, Skills):
  - Sempre suprimir as setas nativas do browser via `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`.
  - Largura mínima para 3 dígitos: `w-9 sm:w-10` (~40px) com `px-0.5` para garantir que valores como `109` ou `150` fiquem 100% legíveis sem cortes.
* **Barra de Pesquisa Global:** Manter dimensionamento confortável (`max-w-md`) com atalho `Ctrl K` visível e alinhamento espaçoso na navbar.
* **Imagens de Itens:** Utilizar o mapa local em `src/data/localItemImages.ts` para carregar sprites oficiais locais em `/images/miracle/items/` com fallback automático.

---

## 6. 🛡️ Módulos Protegidos (NÃO ALTERAR)

Os seguintes módulos são estáveis e homologados. Não devem ser modificados a menos que explicitamente solicitado pelo usuário:
* `src/components/AlchemyCalculator.tsx`
* `src/components/FarmingCalculator.tsx`
* `src/components/CraftingCalculator.tsx`
* `src/components/MiningCalculator.tsx`
* `src/components/MapViewer.tsx` (e rotas/coordenadas do mapa)
* `src/lib/translations.ts`
* `src/data/library.ts`

---

## 7. 🔄 Metodologia para Atualizações Grandes (Updates do Jogo)

Sempre que um novo patch ou mecânica for implementado:
1. **Mapeamento Prévio de Impacto:** Listar todos os arquivos que serão alterados (Build Maker, Guias, Patch Notes, Calculadoras).
2. **Divisão em Blocos Independentes:**
   - Bloco 1: Engine & Tipos TypeScript
   - Bloco 2: Interface & Componentes Visuais
   - Bloco 3: Wiki, Guias e Patch Notes
3. **Auditoria por Bloco:** Validar cada bloco com `npm run build` e testes no navegador antes de avançar.
4. **Atualização da Base de Conhecimento:** Registrar os novos fatos no arquivo `MIRACLE_GAME_KNOWLEDGE.md`.
