import { createWorker } from 'tesseract.js';

export interface ExtractedSkills {
  level?: number;
  magic?: number;
  melee?: number;
  distance?: number;
  shielding?: number;
  rawText?: string;
}

/**
 * Preprocessa imagem em Canvas:
 * 1. Upscale 3x com interpolação pixel-art (smoothing = false)
 * 2. Conversão para escala de cinza e binarização de alto contraste (threshold)
 * Isso transforma a fonte pequena de 7px do client 7.4 em caracteres nítidos de 21px
 */
export async function preprocessImage(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const scale = 3;
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Threshold binarization: texto claro no Tibia (> 130 de brilho) vira preto em fundo branco para OCR perfeito
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Letras claras sobre fundo escuro
        if (brightness > 115) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        } else {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

/**
 * Analisa a imagem e extrai Level, Magic Level e Skills
 */
export async function extractSkillsFromImage(imageSrc: string): Promise<ExtractedSkills> {
  const result: ExtractedSkills = {};
  
  try {
    const processedSrc = await preprocessImage(imageSrc);
    const worker = await createWorker('eng');
    
    const ret = await worker.recognize(processedSrc);
    const text = ret.data.text || '';
    result.rawText = text;

    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    for (const line of lines) {
      // Level
      const lvlMatch = line.match(/(?:level|n[ií]vel)[:\s]+(\d+)/i);
      if (lvlMatch && !line.toLowerCase().includes('magic')) {
        result.level = parseInt(lvlMatch[1], 10);
      }

      // Magic Level
      const mlMatch = line.match(/(?:magic\s*level|ml)[:\s]+(\d+)/i);
      if (mlMatch) {
        result.magic = parseInt(mlMatch[1], 10);
      }

      // Sword
      const swordMatch = line.match(/(?:sword\s*fighting|sword)[:\s]+(\d+)/i);
      if (swordMatch) {
        result.melee = parseInt(swordMatch[1], 10);
      }

      // Axe
      const axeMatch = line.match(/(?:axe\s*fighting|axe)[:\s]+(\d+)/i);
      if (axeMatch && (!result.melee || parseInt(axeMatch[1], 10) > result.melee)) {
        result.melee = parseInt(axeMatch[1], 10);
      }

      // Club
      const clubMatch = line.match(/(?:club\s*fighting|club)[:\s]+(\d+)/i);
      if (clubMatch && (!result.melee || parseInt(clubMatch[1], 10) > result.melee)) {
        result.melee = parseInt(clubMatch[1], 10);
      }

      // Distance
      const distMatch = line.match(/(?:distance\s*fighting|distance)[:\s]+(\d+)/i);
      if (distMatch) {
        result.distance = parseInt(distMatch[1], 10);
      }

      // Shielding
      const shieldMatch = line.match(/(?:shielding|shield)[:\s]+(\d+)/i);
      if (shieldMatch) {
        result.shielding = parseInt(shieldMatch[1], 10);
      }
    }

    await worker.terminate();
  } catch (err) {
    console.warn('OCR error, fallback to manual inputs:', err);
  }

  return result;
}
