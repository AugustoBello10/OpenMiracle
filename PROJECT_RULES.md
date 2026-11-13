# Miracle Wiki & Tools — Manual Técnico de Padronização & Regras de Design

Este documento é o guia definitivo de engenharia, design e diretrizes editoriais do projeto **Miracle Wiki Tools**. Qualquer agente de IA ou desenvolvedor atuando neste repositório DEVE seguir estritamente todas as regras abaixo.

---

## 1. 🚫 Proibição Absoluta de Símbolos e Ícones Decorativos em Cabeçalhos (Anti-AI Clutter)

O uso de emojis ou ícones SVG (Lucide) grudados em títulos e subtítulos transmite uma aparência amadora ("cara de IA gerada") e polui a interface:

* **REGRA UNIVERSAL:** É ESTRITAMENTE PROIBIDO colocar ícones Lucide, emojis ou qualquer símbolo visual dentro de:
  - Títulos principais (`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`)
  - Subtítulos e títulos de seções
  - Cabeçalhos de cartões (`CardHeader`, `<span>` ou `<div>` com função de título de card)
  - Botões de cabeçalho de sistema (ex: botão "Fórmulas & Detalhes", botão de voltar, títulos de abas)
* **TÍTULOS DEVEM SER 100% TEXTO PURO:** Tipografia editorial limpa, profissional, legível e em caixa alta com tracking suave (`tracking-wider` ou `tracking-widest`).
* **ONDE ÍCONES SÃO PERMITIDOS:** Apenas como micro-indicadores utilitários inline dentro de linhas de dados ou tabelas (ex: pequeno ícone de coração vermelho ao lado do rótulo `Vida (HP):` ou indicador de peso `Cap:`). Nunca nos cabeçalhos.

---

## 2. 🛡️ Ordem Exata de Resolução de Combate & Fórmulas Oficiais

A hierarquia de dano físico recebido segue 3 passos obrigatórios e nunca deve ser alterada:

1. **1º Passo — Bloqueio do Escudo / Arma (Defense):**
   - Usa a defesa do escudo (com skill de `Shielding`) ou da arma se for maior.
   - Fórmula: $\text{MaxBlock} = \lfloor ((5 \times \text{Skill} + 50) \times \text{Def} \times \text{Stance} \times 0.0099) \times 1.1 \rfloor$
   - Multiplicadores de Postura (*Stance*):
     - Full Defense: $1.8$
     - Balanced: $1.0$
     - Full Attack: $0.6$
2. **2º Passo — Redução da Armadura Total ($Arm$):**
   - Redução Mínima: $\lfloor Arm \times 0.475 \rfloor$
   - Redução Máxima: $\lfloor (Arm \times 0.95) - 1 \rfloor$
   - Redução Média: $\lfloor (\text{Mínima} + \text{Máxima}) / 2 \rfloor$
3. **3º Passo — Proteções & Mitigações Percentuais (%):**
   - Redução percentual residual aplicada sobre o dano restante após escudo e armadura:
     $\text{Percentual Residual} = 1 - (1 - \text{ProtFísica}) \times (1 - \text{Mitigação})$

---

## 3. 🌐 100% Bilinguismo Completo (PT e EN)

* Todo e qualquer texto, parágrafo narrativo, passo a passo, tabela, tooltip, mensagem de erro e descrição de item DEVE possuir versão completa em Português (`language === 'pt'`) e Inglês (`language === 'en'`).
* Nunca renderize texto hardcoded em português quando o usuário selecionar inglês.

---

## 4. 🎯 Módulos Protegidos (NÃO ALTERAR)

Os seguintes módulos são estáveis e homologados. Não devem ser modificados a menos que explicitamente solicitado pelo usuário:
* `src/components/AlchemyCalculator.tsx`
* `src/components/FarmingCalculator.tsx`
* `src/components/CraftingCalculator.tsx`
* `src/components/MiningCalculator.tsx`
* `src/components/MapViewer.tsx` (e rotas/coordenadas do mapa)
* `src/lib/translations.ts`
* `src/data/patchNotes.ts`
* `src/data/library.ts`

---

## 5. 🧠 Protocolo de Continuidade e Mitigação de Perda de Memória

Por que a IA perde memória em conversas longas?
* **Janela de Contexto & Truncamento:** Quando uma conversa atinge o limite de tokens, o sistema realiza uma compactação automática (resumo), descartando mensagens antigas.
* **Como Mitigar Definitivamente:**
  1. O arquivo `AGENTS.md` e este `PROJECT_RULES.md` são lidos diretamente pelo sistema e mantêm as regras vivas independentemente da compactação.
  2. Sempre que uma grande funcionalidade for concluída, ela deve ser versionada no Git (`git commit`) e documentada neste manual.
  3. No início de cada novo dia ou sessão de trabalho, o agente lê este manual e retoma o estado sem alucinações.
