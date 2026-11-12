import xml.etree.ElementTree as ET
import json
import os
import uuid
import re

def parse_xml_to_json(xml_path, output_json_path):
    tree = ET.parse(xml_path)
    root = tree.getroot()
    
    respawns = []
    
    for spawn in root.findall('spawn'):
        centerx = int(spawn.get('centerx', 0))
        centery = int(spawn.get('centery', 0))
        centerz = int(spawn.get('centerz', 0))
        
        # Parse NPCs and Monsters
        for entity in spawn:
            if entity.tag in ('npc', 'monster'):
                name = entity.get('name')
                x_offset = int(entity.get('x', 0))
                y_offset = int(entity.get('y', 0))
                
                # Categoria
                category = "Monstros" if entity.tag == 'monster' else "NPC"
                
                # Para evitar duplicatas e agrupar
                x = centerx + x_offset
                y = centery + y_offset
                z = centerz
                
                respawns.append({
                    "id": f"{name.lower().replace(' ', '-')}-{uuid.uuid4().hex[:8]}",
                    "name": name,
                    "x": x,
                    "y": y,
                    "z": z,
                    "count": 1,
                    "image": f"https://res.cloudinary.com/dc4nkbnkg/image/upload/{name.replace(' ', '_')}.png",
                    "categories": [category]
                })

    # Agrupar por mesmo nome, X, Y, Z
    grouped = {}
    for r in respawns:
        key = (r['name'], r['x'], r['y'], r['z'])
        if key not in grouped:
            grouped[key] = r
        else:
            grouped[key]['count'] += 1

    final_respawns = list(grouped.values())

    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(final_respawns, f, indent=2, ensure_ascii=False)
        
    print(f"Extracted {len(final_respawns)} unique spawns.")

if __name__ == "__main__":
    if os.path.exists("spawns.xml"):
        parse_xml_to_json("spawns.xml", "respawns_converted.json")
    else:
        print("spawns.xml not found. Please upload the file.")
