import { RESPAWNS } from "./src/data/respawns.ts";

function calculateRegions(monsterName: string, allRespawns: any[]) {
  const monsterRespawns = allRespawns.filter(r => r.name.toLowerCase() === monsterName.toLowerCase());
  
  const regions: any[] = [];
  const distanceThreshold = 300; // units

  monsterRespawns.forEach(respawn => {
    let foundRegion = regions.find(reg => 
      reg.floor === respawn.z && 
      Math.sqrt(Math.pow(reg.center.x - respawn.x, 2) + Math.pow(reg.center.y - respawn.y, 2)) < distanceThreshold
    );

    if (foundRegion) {
      foundRegion.respawns.push(respawn);
      foundRegion.center.x = foundRegion.respawns.reduce((sum: number, r: any) => sum + r.x, 0) / foundRegion.respawns.length;
      foundRegion.center.y = foundRegion.respawns.reduce((sum: number, r: any) => sum + r.y, 0) / foundRegion.respawns.length;
    } else {
      regions.push({
        id: `reg-${regions.length}`,
        floor: respawn.z,
        center: { x: respawn.x, y: respawn.y },
        respawns: [respawn]
      });
    }
  });

  return regions;
}

const dragons = calculateRegions("Dragon", RESPAWNS);
console.log(`Found ${dragons.length} regions for Dragon`);
dragons.forEach(r => {
    console.log(`Floor: ${r.floor}, Center: ${Math.round(r.center.x)}, ${Math.round(r.center.y)}, Respawns count: ${r.respawns.length}`);
});
