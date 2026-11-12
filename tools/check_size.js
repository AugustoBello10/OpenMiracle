const respawns = require('./public/respawns.json');
const jsonString = JSON.stringify(respawns);
console.log("JSON String length in bytes:", Buffer.byteLength(jsonString, 'utf8'));
