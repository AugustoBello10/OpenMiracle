
export interface FarmingTree {
  name: string;
  lifetimeDays: number;
  intervalMinutes: number;
  multiplier: number;
  profession: string | null;
  cost: { type: 'gp' | 'point', value: number };
  yields: { level: number, min: number, max: number }[];
  fruit: string;
}

export const FARMING_TREES: FarmingTree[] = [
  {
    name: "Orange Tree",
    lifetimeDays: 60,
    intervalMinutes: 30,
    multiplier: 2,
    profession: null,
    cost: { type: 'point', value: 45 },
    fruit: "Orange",
    yields: [
      { level: 10, min: 2, max: 3 },
      { level: 20, min: 2, max: 4 },
      { level: 40, min: 3, max: 4 },
      { level: 60, min: 3, max: 5 },
    ]
  },
  {
    name: "Cherry Tree",
    lifetimeDays: 30,
    intervalMinutes: 15,
    multiplier: 1,
    profession: null,
    cost: { type: 'gp', value: 2500 },
    fruit: "Cherry",
    yields: [
      { level: 10, min: 3, max: 5 },
      { level: 20, min: 6, max: 9 },
      { level: 40, min: 9, max: 12 },
      { level: 60, min: 12, max: 15 },
    ]
  },
  {
    name: "Carrot Plant",
    lifetimeDays: 40,
    intervalMinutes: 20,
    multiplier: 1.5,
    profession: "Farmer",
    cost: { type: 'point', value: 30 },
    fruit: "Carrot",
    yields: [
      { level: 10, min: 1, max: 2 },
      { level: 20, min: 2, max: 4 },
      { level: 40, min: 4, max: 6 },
      { level: 60, min: 6, max: 8 },
    ]
  }
];
