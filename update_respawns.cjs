const fs = require('fs');
const content = fs.readFileSync('src/data/respawns.ts', 'utf-8');

const newRespawns = [
  // Dragons
  { name: 'Dragon', x: 32387, y: 32431, z: 6, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32372, y: 32440, z: 6, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32383, y: 32449, z: 6, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32377, y: 32466, z: 6, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32401, y: 32459, z: 6, count: 2, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32415, y: 32444, z: 6, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32387, y: 32429, z: 5, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32372, y: 32429, z: 4, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32379, y: 32440, z: 4, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32410, y: 32432, z: 5, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32410, y: 32470, z: 5, count: 2, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32400, y: 32453, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32383, y: 32466, z: 8, count: 2, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32399, y: 32469, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32421, y: 32452, z: 8, count: 2, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32380, y: 32431, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  { name: 'Dragon', x: 32391, y: 32421, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784837656/Dragon.png' },
  // Dragon Lords
  { name: 'Dragon Lord', x: 32396, y: 32422, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784838282/Dragon_Lord.png' },
  { name: 'Dragon Lord', x: 32430, y: 32425, z: 8, count: 1, image: 'https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784838282/Dragon_Lord.png' }
];

let objectString = newRespawns.map((r, i) => `  {
    id: '${r.name.toLowerCase().replace(/ /g, '-')}-${i + 1}',
    name: '${r.name}',
    x: ${r.x},
    y: ${r.y},
    z: ${r.z},
    count: ${r.count},
    image: '${r.image}'
  }`).join(',\n');

const newContent = content.replace('];', `,
${objectString}
];`);

fs.writeFileSync('src/data/respawns.ts', newContent);
