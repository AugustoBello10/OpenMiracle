
export interface PatchNote {
  version: string;
  date: string;
  title: { pt: string; en: string };
  changes: {
    added?: { pt: string[]; en: string[] };
    removed?: { pt: string[]; en: string[] };
    fixed?: { pt: string[]; en: string[] };
    changed?: { pt: string[]; en: string[] };
  };
}

export const PROJECT_PATCH_NOTES: PatchNote[] = [
  {
    version: "1.4.0",
    date: "2026-04-14",
    title: { pt: "Projeto Wiki v1.4.0 - Search & Database", en: "Wiki Project v1.4.0 - Search & Database" },
    changes: {
      added: {
        pt: [
          "Sistema de Pesquisa Global com suporte a busca sem acentos e sugestões inteligentes.",
          "Integração total da Wiki de Itens com o sistema de busca.",
          "Redirecionamento inteligente: pesquisar palavras-chave (ex: 'pick') sugere ferramentas relacionadas.",
          "Navegação direta para versões específicas de Patch Notes a partir da Home."
        ],
        en: [
          "Global Search System with support for accent-insensitive search and smart suggestions.",
          "Full integration of Item Wiki with the search system.",
          "Smart redirection: searching keywords (e.g., 'pick') suggests related tools.",
          "Direct navigation to specific Patch Notes versions from the Home page."
        ]
      },
      changed: {
        pt: [
          "Polimento visual na seção de Wiki para melhor legibilidade.",
          "Otimização do seletor de atributos na calculadora."
        ],
        en: [
          "Visual polish in the Wiki section for better readability.",
          "Optimization of the attribute selector in the calculator."
        ]
      }
    }
  },
  {
    version: "1.3.3",
    date: "2026-04-14",
    title: { pt: "Projeto Wiki v1.3.3 - UX Refinement", en: "Wiki Project v1.3.3 - UX Refinement" },
    changes: {
      added: {
        pt: [
          "Suporte a scroll do mouse (roda) nos menus estilo Tambor.",
          "Efeito de profundidade 3D aprimorado nos seletores."
        ],
        en: [
          "Mouse wheel support in Drum-style menus.",
          "Enhanced 3D depth effect in selectors."
        ]
      },
      fixed: {
        pt: [
          "Correção de links quebrados na seção de Últimas Atualizações.",
          "Ajuste de responsividade em telas ultra-wide."
        ],
        en: [
          "Fixed broken links in the Latest Updates section.",
          "Responsiveness adjustment on ultra-wide screens."
        ]
      }
    }
  },
  {
    version: "1.3.2",
    date: "2026-04-14",
    title: { pt: "Projeto Wiki v1.3.2 - Horizontal Layout", en: "Wiki Project v1.3.2 - Horizontal Layout" },
    changes: {
      changed: {
        pt: [
          "Refatoração do Menu Tambor da Biblioteca para layout horizontal.",
          "Liberação de espaço horizontal para o conteúdo dos livros e mapas.",
          "Melhoria na organização visual da Livraria."
        ],
        en: [
          "Refactoring of the Library Drum Menu to a horizontal layout.",
          "Freeing up horizontal space for book content and maps.",
          "Improved visual organization of the Library."
        ]
      }
    }
  },
  {
    version: "1.3.1",
    date: "2026-04-14",
    title: { pt: "Projeto Wiki v1.3.1 - Library & Wiki", en: "Wiki Project v1.3.1 - Library & Wiki" },
    changes: {
      added: {
        pt: [
          "Novo sistema de navegação 'Drum Menu' (Tambor de Revólver) na Biblioteca.",
          "Wiki de Itens: Adicionado banco de dados de Capacetes (Helmets).",
          "Galeria de imagens e mapas para locais de livros na Biblioteca."
        ],
        en: [
          "New 'Drum Menu' navigation system in the Library.",
          "Item Wiki: Added Helmets database.",
          "Image gallery and maps for book locations in the Library."
        ]
      }
    }
  },
  {
    version: "1.3.0",
    date: "2026-04-14",
    title: { pt: "Projeto Wiki v1.3.0 - Hub Update", en: "Wiki Project v1.3.0 - Hub Update" },
    changes: {
      added: {
        pt: [
          "Nova Home Page estilo 'Hub' para melhor navegação entre ferramentas.",
          "Rastreador de localização do Rashid em tempo real no menu superior.",
          "Seção de 'Últimas Atualizações' e 'Ferramentas em Destaque' na Home.",
          "Explicação do sistema de prioridade de loot na Calculadora de Mineração."
        ],
        en: [
          "New 'Hub' style Home Page for better navigation between tools.",
          "Real-time Rashid location tracker in the top menu.",
          "'Latest Updates' and 'Featured Tools' sections on Home.",
          "Loot priority system explanation in the Mining Calculator."
        ]
      },
      changed: {
        pt: [
          "Melhoria nos campos numéricos: agora é possível apagar o valor completamente para digitar.",
          "Redesign visual do topo do site para acomodar informações rápidas.",
          "Otimização da navegação mobile."
        ],
        en: [
          "Improved numeric fields: it is now possible to clear the value completely to type.",
          "Visual redesign of the site header to accommodate quick info.",
          "Mobile navigation optimization."
        ]
      }
    }
  },
  {
    version: "1.2.1",
    date: "2026-04-13",
    title: { pt: "Projeto Wiki v1.2.1", en: "Wiki Project v1.2.1" },
    changes: {
      added: {
        pt: [
          "Campo de Preço Unitário na Calculadora de Mineração.",
          "Visualização de Buffs (Sucesso e Multiplicador) nas picaretas."
        ],
        en: [
          "Unit Price field in Mining Calculator.",
          "Buff visualization (Success and Multiplier) on pickaxes."
        ]
      },
      changed: {
        pt: [
          "Calculadora de Mineração desativada temporariamente aguardando novas fórmulas oficiais (GM Kanohn).",
          "Novo visual de resultados na Calculadora de Mineração.",
          "Correção das receitas de crafting das picaretas (Advanced e Enhanced)."
        ],
        en: [
          "Mining Calculator temporarily disabled awaiting new official formulas (GM Kanohn).",
          "New results visual in Mining Calculator.",
          "Corrected pickaxe crafting recipes (Advanced and Enhanced)."
        ]
      }
    }
  },
  {
    version: "1.2.0",
    date: "2026-04-13",
    title: { pt: "Projeto Wiki v1.2.0", en: "Wiki Project v1.2.0" },
    changes: {
      added: {
        pt: [
          "Atualização completa com o Patch do Servidor de 13/04.",
          "Novas relíquias adicionadas ao Crafting.",
          "Novos itens adicionados à Tabela de Breaking.",
          "Calculadora de Mineração atualizada com novos bônus de picaretas."
        ],
        en: [
          "Full update with Server Patch from 04/13.",
          "New relics added to Crafting.",
          "New items added to Breaking Table.",
          "Mining Calculator updated with new pickaxe bonuses."
        ]
      },
      changed: {
        pt: [
          "Receitas de Crafting e taxas de Breaking sincronizadas com o servidor.",
          "Melhoria na clareza de termos em todas as calculadoras."
        ],
        en: [
          "Crafting recipes and Breaking rates synchronized with the server.",
          "Improved term clarity across all calculators."
        ]
      }
    }
  },
  {
    version: "1.1.0",
    date: "2026-04-08",
    title: { pt: "Projeto Wiki v1.1.0", en: "Wiki Project v1.1.0" },
    changes: {
      added: {
        pt: [
          "Sistema de Patch Notes (Servidor e Projeto).",
          "Seção 'Mysteriando' (Livraria) para mistérios e livros.",
          "Calculadora de Atributos com suporte a Grand Arcane Orb."
        ],
        en: [
          "Patch Notes system (Server & Project).",
          "Library section (Mysteriando) for mysteries and books.",
          "Attribute Calculator with Grand Arcane Orb support."
        ]
      },
      fixed: {
        pt: [
          "Traduções e cores da Tabela de Quebra de Itens.",
          "Sincronização de idiomas em todas as abas."
        ],
        en: [
          "Translations and colors in the Item Breaking Table.",
          "Language synchronization across all tabs."
        ]
      }
    }
  },
  {
    version: "1.0.0",
    date: "2026-04-01",
    title: { pt: "Lançamento v1.0.0", en: "Launch v1.0.0" },
    changes: {
      added: {
        pt: [
          "Lançamento do Wiki Project Miracle 7.4.",
          "Calculadoras: Crafting, Skills, Bless & Morte.",
          "Mapa Interativo e Guia de Profissões.",
          "Suporte Multi-linguagem (PT/EN)."
        ],
        en: [
          "Miracle 7.4 Wiki Project Launch.",
          "Calculators: Crafting, Skills, Bless & Death.",
          "Interactive Map and Vocations Guide.",
          "Multi-language support (PT/EN)."
        ]
      }
    }
  }
];

export const SERVER_PATCH_NOTES: PatchNote[] = [
  {
    version: "13/04",
    date: "2026-04-13",
    title: { pt: "Update 13/04", en: "Update 13/04" },
    changes: {
      added: {
        pt: [
          "Novas relíquias no Crafting: Spiritualist, Marksman, Sage e Guardian Gems.",
          "Yellow Shrine Stone adicionada à Mineração.",
          "Novos itens para Breaking: Scythe e Dark Shield.",
          "Great Axe adicionado como loot raro em Dwarf Tyrant e Khazdrak.",
          "Novas recompensas na Khazdrakar Quest (Eye of Aurum, Horned Helmet, etc)."
        ],
        en: [
          "New relics in Crafting: Spiritualist, Marksman, Sage, and Guardian Gems.",
          "Yellow Shrine Stone added to Mining.",
          "New items for Breaking: Scythe and Dark Shield.",
          "Great Axe added as rare loot from Dwarf Tyrant and Khazdrak.",
          "New rewards in Khazdrakar Quest (Eye of Aurum, Horned Helmet, etc)."
        ]
      },
      fixed: {
        pt: [
          "Altura das janelas de containers após relogin.",
          "Botão de lock no Bestiary Tracker.",
          "Atributo de destruição do Eye of Aurum.",
          "Uso do Lost Redemption Scroll."
        ],
        en: [
          "Container window height after relogin.",
          "Lock button on Bestiary Tracker window.",
          "Eye of Aurum destruction attribute.",
          "Lost Redemption Scroll usage."
        ]
      },
      changed: {
        pt: [
          "Removido exiva na VIP List.",
          "Picks superiores agora requerem profissão de minerador para quebrar pedras.",
          "Picks normais agora mineram apenas Lava Holes e Ice Lava Holes.",
          "Rework nos bônus e multiplicadores das picaretas (Modified, Advanced, Enhanced).",
          "Receitas de picaretas atualizadas (Advanced e Enhanced agora exigem Draconian Steels).",
          "Steel Bolt: Rate aumentado para 2.0 e removido custo de Natural Soil.",
          "Ajustes massivos na tabela de Breaking (Soldier Helmet, Scale Armor, etc).",
          "Level mínimo para área final da Khazdrakar Quest: 80 -> 100.",
          "Loot de Khazdrak aumentado em 150%."
        ],
        en: [
          "Removed exiva on VIP List.",
          "Superior picks now require mining profession to break mines.",
          "Normal picks can now only mine Lava Holes and Ice Lava Holes.",
          "Reworked pickaxe bonuses and multipliers (Modified, Advanced, Enhanced).",
          "Pickaxe recipes now require Draconian Steels.",
          "Steel Bolt: Rate increased to 2.0 and removed Natural Soil cost.",
          "Massive adjustments to Breaking table (Soldier Helmet, Scale Armor, etc).",
          "Minimum level for Khazdrakar Quest final area: 80 -> 100.",
          "Khazdrak loot increased by 150%."
        ]
      }
    }
  },
  {
    version: "06/04",
    date: "2026-04-06",
    title: { pt: "Update 06/04", en: "Update 06/04" },
    changes: {
      added: {
        pt: [
          "Mailbox em Khazdrakar.",
          "Novas magias: Ice Strike (exori glaci), Ice Wave (exevo glaci hur).",
          "Magias de Druid: Purification (utura sio), Mass Purification (utura mas res), Mass Growth (exevo mas vita).",
          "Quest 'Broken Amulet' em Rookgaard.",
          "Novo ícone para condições de cura.",
          "Opção de limpar Bestiary Tracker rapidamente."
        ],
        en: [
          "Mailbox on Khazdrakar.",
          "New spells: Ice Strike (exori glaci), Ice Wave (exevo glaci hur).",
          "Druid spells: Purification (utura sio), Mass Purification (utura mas res), Mass Growth (exevo mas vita).",
          "Added Broken Amulet quest on Rookgaard.",
          "A new icon for healing conditions has been added.",
          "Added an option to quickly clear the entire bestiary tracker."
        ]
      },
      fixed: {
        pt: [
          "Correções de mapa em Evil Catacombs e Hero Catacombs.",
          "Sincronização de criaturas entre floors.",
          "Bug no analyzer de exp/loot com valor 0.",
          "Offsets de outfits de Dwarf e animação da Giant Crystal Spider.",
          "Problema de visibilidade 'You can't see anything' acima do subsolo.",
          "Leech de vida/mana com chances baixas.",
          "Atributo Arrow Guard retrabalhado para proteção constante."
        ],
        en: [
          "Fixed map bugs in Evil Catacombs and Hero Catacombs.",
          "Fixed creature sync between floors.",
          "Fixed bug in exp/loot analyzers with 0 value.",
          "Fixed Dwarf outfit offsets and Giant Crystal Spider animation.",
          "Fixed 'you can't see anything' for floors above underground.",
          "Fixed life/mana leech with low chances.",
          "Arrow guard attribute reworked to always-on protection."
        ]
      },
      changed: {
        pt: [
          "Acesso às pontes de Nivandria e Nivora gate wall agora é exclusivo Premium.",
          "Bestiary Tracker limitado a 50 criaturas para otimização.",
          "Balanceamento: Giant Crystal Spider, Dark Wraith e Morgrothar.",
          "Spectral Shield (Classe 3 -> 4) e Blackened Charm (Mana Leech 10% -> 7%)."
        ],
        en: [
          "Only premium players can access Nivandria bridges and Nivora gate wall.",
          "Bestiary tracker limited to 50 creatures for optimization.",
          "Balance: Giant Crystal Spider, Dark Wraith, and Morgrothar.",
          "Spectral Shield (class 3 -> 4) and Blackened Charm (mana leech 10% -> 7%)."
        ]
      }
    }
  },
  {
    version: "26/03",
    date: "2026-03-26",
    title: { pt: "Patch Notes 26/03", en: "Patch Notes 26/03" },
    changes: {
      added: {
        pt: [
          "Slots 1 e 2 da Relic Box liberados via quest com NPC Melchior em Ankrahmun."
        ],
        en: [
          "First and second slots of relic box opened via quest with Melchior in Ankrahmun."
        ]
      },
      fixed: {
        pt: [
          "Breaking de itens no crafting após o update.",
          "Bug visual 'You can't see anything' em casos específicos.",
          "Uso de 'useWith' na battle list.",
          "Relíquias que permaneciam equipadas com 0 slots."
        ],
        en: [
          "Fixed breaking items on crafting after update.",
          "Fixed 'You can't see anything' in specific cases.",
          "Fixed useWith on battle list.",
          "Fixed relics that remained equipped with 0 slots."
        ]
      },
      changed: {
        pt: [
          "Aumento de 45% no dano da runa Envenom.",
          "Ajustes em Light Magic Missile (5x -> 10x cargas) e Fireball (3x -> 5x cargas)."
        ],
        en: [
          "Increased Envenom damage by around 45%.",
          "Light magic missile (5x -> 10x charges) and Fireball (3x -> 5x charges)."
        ]
      }
    }
  },
  {
    version: "25/03",
    date: "2026-03-25",
    title: { pt: "Update 25/03", en: "Update 25/03" },
    changes: {
      added: {
        pt: [
          "Novos outfits na Store: Dwarf Smith, Reaver, Lord, Cavebomb, Lost Berserker e Enslaved Dwarf.",
          "Skinning Pouch adicionada à Store.",
          "Sistema de Breaking expandido para espadas, clubs, arcos, elmos, armaduras, etc.",
          "Novas magias: Summon Call (exani res) e Conjure Frost Magic Missile (adori glaci)."
        ],
        en: [
          "New outfits in Store: Dwarf Smith, Reaver, Lord, Cavebomb, Lost Berserker, and Enslaved Dwarf.",
          "Skinning pouch added to Store.",
          "Breaking system expanded to swords, clubs, bows, helmets, armors, etc.",
          "New spells: Summon Call (exani res) and Conjure Frost Magic Missile (adori glaci)."
        ]
      },
      fixed: {
        pt: [
          "Otimização massiva de performance do cliente (config.otml).",
          "Design da VIP List similar ao 7.4 vanilla.",
          "Fórmula melee revisada (removido dano mínimo).",
          "Bosses não podem mais ser puxados com corda (rope)."
        ],
        en: [
          "Massive client performance optimization (config.otml).",
          "VIP list design similar to 7.4 vanilla.",
          "Melee formula reviewed (removed minimum damage).",
          "Bosses can no longer be roped."
        ]
      },
      changed: {
        pt: [
          "Rework em diversos respawns: Zinjara, Khazdrakar, Evil Catacombs, Scarabs e Kraglins.",
          "Mudança na tabela de exp após level 210 (+1% -> +0.2% por level).",
          "Ajustes em NPCs: Rashid e Nah'Bob (novos itens e preços).",
          "Redução de 5-10% no valor de venda de itens comuns em NPCs."
        ],
        en: [
          "Reworked several spawns: Zinjara, Khazdrakar, Evil Catacombs, Scarabs, and Kraglins.",
          "Exp table change after level 210 (+1% -> +0.2% per level).",
          "NPC adjustments: Rashid and Nah'Bob (new items and prices).",
          "Reduced sell value of common items by 5-10%."
        ]
      }
    }
  }
];
