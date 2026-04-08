
export type DocumentType = 'book' | 'scroll' | 'parchment';

export interface LibraryEntry {
  id: string;
  title: { pt: string; en: string };
  type: DocumentType;
  region: { pt: string; en: string };
  location: { pt: string; en: string };
  gallery?: { url: string; label: { pt: string; en: string } }[]; // Array of images with bilingual labels
  spriteImage?: string; // URL for the item sprite
  content: { pt: string; en: string };
}

export const LIBRARY_DATA: LibraryEntry[] = [
  {
    id: 'awakening-of-the-tower',
    title: { pt: 'O Despertar da Torre', en: 'The Awakening of the Tower' },
    type: 'book',
    region: { pt: 'Winterfell', en: 'Winterfell' },
    location: { pt: 'Ice Tower (31841, 31139, 5)', en: 'Ice Tower (31841, 31139, 5)' },
    spriteImage: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775658826/Blue_Book_wstv3r.gif',
    gallery: [
      { 
        url: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/f_auto,q_auto/Surface_Ice_Towe_zjunoj', 
        label: { pt: 'Superfície IceTower', en: 'Surface IceTower' }
      },
      { 
        url: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775658716/1_Ice_Tower_pdnczu.png', 
        label: { pt: '+1 Ice Tower', en: '+1 Ice Tower' }
      },
      { 
        url: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775658718/tela_jctuvw.png', 
        label: { pt: 'Localização', en: 'Location' }
      }
    ],
    content: {
      en: `Power alone does not awaken the tower.
Nor blood.
Nor devotion.

It demands something already complete.

The witches believed raw magic was unstable - a storm without memory. To shape it, one must offer a core that has already endured conflict, refinement, and intent.

Thus, they chose the perfected sphere.
A grand arcane heart, crystallized through countless bindings.

When placed upon the altar, the tower does not react at once. The air tightens. Sound dulls. Frost spreads upward, not outward.

This is the moment of judgment.

If the offering is true, the Spire opens its silence, and the path beyond reveals itself - not as reward, but as responsibility.

If the offering is flawed, the tower consumes it.
Sometimes, it consumes more.

Few understand this distinction. Fewer survive it.`,
      pt: `O poder sozinho não desperta a torre.
Nem o sangue.
Nem a devoção.

Ela exige algo já completo.

As bruxas acreditavam que a magia bruta era instável - uma tempestade sem memória. Para moldá-la, deve-se oferecer um núcleo que já tenha suportado conflito, refinamento e intenção.

Assim, elas escolheram a esfera aperfeiçoada.
Um grande coração arcano, cristalizado através de inúmeras amarras.

Quando colocado sobre o altar, a torre não reage imediatamente. O ar se comprime. O som diminui. O gelo se espalha para cima, não para fora.

Este é o momento do julgamento.

Se a oferta for verdadeira, a Espiral abre seu silêncio, e o caminho além se revela - não como recompensa, mas como responsabilidade.

Se a oferta for falha, a torre a consome.
Às vezes, consome mais.

Poucos entendem essa distinção. Menos ainda sobrevivem a ela.`
    }
  },
  {
    id: 'warriors-of-the-north',
    title: { pt: 'Guerreiros do Norte', en: 'Warriors of the North' },
    type: 'book',
    region: { pt: 'Nivandria', en: 'Nivandria' },
    location: { pt: 'Prédio ao norte do templo (32382, 31252, 6)', en: 'Building north of the temple (32382, 31252, 6)' },
    spriteImage: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775659806/Brown_Book_wrmg9f.gif',
    gallery: [
      { 
        url: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775659815/Norte_do_templo_de_Nivandria_uhrtzl.png', 
        label: { pt: 'Superfície de Nivandria', en: 'Nivandria Surface' }
      },
      { 
        url: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775659817/Tela1_ihoruk.png', 
        label: { pt: '+1 Prédio Norte do Templo', en: '+1 Building North of Temple' }
      }
    ],
    content: {
      en: `In its earliest years, many warriors answered the call of the north - not for conquest, but for certainty. The land was unknown. The routes were untested. Something had to be faced.

Aeris, who led the first patrol toward the sapphire halls.

Others are known only by absence.

No bodies were recovered. No final words were recorded. The ice kept them.

There are reports - unconfirmed - of figures seen at the edge of vision. Warriors standing motionless, armor rimmed with frost, watching the living pass.

Whether these are memories, guardians, or something else entirely, we're not aware.`,
      pt: `Em seus primeiros anos, muitos guerreiros responderam ao chamado do norte - não por conquista, mas por certeza. A terra era desconhecida. As rotas não haviam sido testadas. Algo precisava ser enfrentado.

Aeris, que liderou a primeira patrulha em direção aos salões de safira.

Outros são conhecidos apenas pela ausência.

Nenhum corpo foi recuperado. Nenhuma palavra final foi registrada. O gelo os guardou.

Existem relatos - não confirmados - de figuras vistas no limite da visão. Guerreiros parados imóveis, armaduras bordadas de geada, observando os vivos passarem.

Se estas são memórias, guardiões ou algo totalmente diferente, não temos conhecimento.`
    }
  }
];
