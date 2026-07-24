import React, { useState } from 'react';
import * as pako from 'pako';
import JSZip from 'jszip';
import { Upload, FileArchive } from 'lucide-react';

export default function OTMMConverter() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (log: string) => setLogs(prev => [...prev, log]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setLogs([]);
    addLog(`Iniciando leitura de ${file.name}...`);

    try {
      const buffer = await file.arrayBuffer();
      const view = new DataView(buffer);
      
      let offset = 0;
      
      // Magic Number: "OTMM" -> 0x4D4D544F (little endian)
      const signature = view.getUint32(offset, true);
      offset += 4;
      
      if (signature !== 0x4D4D544F) {
        throw new Error(`Magic number inválido: ${signature.toString(16)} (esperado 4D4D544F)`);
      }
      
      const start = view.getUint16(offset, true);
      offset += 2;
      
      const version = view.getUint16(offset, true);
      offset += 2;
      
      const flags = view.getUint32(offset, true);
      offset += 4;
      
      addLog(`Versão OTMM: ${version}, Data Start: ${start}`);
      
      if (version === 1) {
        // Read string
        const len = view.getUint16(offset, true);
        offset += 2;
        offset += len;
      }
      
      offset = start;
      
      // First pass: extract all blocks
      const blocks: any[] = [];
      let minX = 65536, maxX = 0;
      let minY = 65536, maxY = 0;
      
      let blocksCount = 0;
      
      while (offset < buffer.byteLength) {
        if (offset + 5 > buffer.byteLength) break;
        
        const posX = view.getUint16(offset, true); offset += 2;
        const posY = view.getUint16(offset, true); offset += 2;
        const posZ = view.getUint8(offset); offset += 1;
        
        if (posX === 0 && posY === 0 && posZ === 0 && offset >= buffer.byteLength) break;
        if (posZ > 15) break; // Invalid floor
        
        const len = view.getUint16(offset, true); offset += 2;
        
        if (offset + len > buffer.byteLength) {
          addLog("EOF inesperado lendo bloco.");
          break;
        }
        
        const compressedData = new Uint8Array(buffer, offset, len);
        offset += len;
        
        try {
          const uncompressed = pako.inflate(compressedData);
          
          let mmBlockSize = 256;
          let tileSize = 3;
          
          if (uncompressed.length === 12288) { mmBlockSize = 64; tileSize = 3; }
          else if (uncompressed.length === 16384) { mmBlockSize = 64; tileSize = 4; }
          else if (uncompressed.length === 196608) { mmBlockSize = 256; tileSize = 3; }
          else if (uncompressed.length === 262144) { mmBlockSize = 256; tileSize = 4; }
          else {
            addLog(`Tamanho de bloco desconhecido: ${uncompressed.length}`);
            continue;
          }
          
          minX = Math.min(minX, posX);
          maxX = Math.max(maxX, posX + mmBlockSize);
          minY = Math.min(minY, posY);
          maxY = Math.max(maxY, posY + mmBlockSize);
          
          blocks.push({ posX, posY, posZ, mmBlockSize, tileSize, uncompressed });
          blocksCount++;
          
        } catch (e) {
          addLog(`Erro ao descomprimir bloco: ${e}`);
        }
        
        setProgress(Math.floor((offset / buffer.byteLength) * 40)); 
      }
      
      addLog(`Parse concluído. ${blocksCount} blocos lidos.`);
      addLog(`Limites do mapa: X(${minX} - ${maxX}), Y(${minY} - ${maxY})`);
      
      if (blocksCount === 0) {
        throw new Error("Nenhum bloco foi lido com sucesso.");
      }
      
      const width = maxX - minX;
      const height = maxY - minY;
      
      if (width <= 0 || height <= 0 || width > 32000 || height > 32000) {
        addLog(`Aviso: O mapa tem dimensões extremas (${width}x${height}). Pode causar falha no navegador.`);
      }

      // A map of z -> canvas
      const floors = new Map<number, { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }>();
      
      // Render blocks
      let renderCount = 0;
      for (const block of blocks) {
         if (!floors.has(block.posZ)) {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
               throw new Error(`Falha ao criar canvas para o andar ${block.posZ} (tamanho: ${width}x${height})`);
            }
            // Set transparent background
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, width, height);
            floors.set(block.posZ, { canvas, ctx });
         }
         
         const floor = floors.get(block.posZ)!;
         const imgData = floor.ctx.createImageData(block.mmBlockSize, block.mmBlockSize);
         
         for (let i = 0; i < block.mmBlockSize * block.mmBlockSize; i++) {
            const colorByte = block.uncompressed[i * block.tileSize + 1]; 
            let r=0, g=0, b=0, a=255;
            
            if (colorByte !== 255 && colorByte !== 0) { 
               if (colorByte >= 216) {
                  r = 255; g = 255; b = 255;
               } else {
                  r = (Math.floor(colorByte / 36) % 6) * 51;
                  g = (Math.floor(colorByte / 6) % 6) * 51;
                  b = (colorByte % 6) * 51;
               }
            } else if (colorByte === 0) {
               r = 0; g = 0; b = 0; // black
            } else {
               a = 0; // transparent
            }
            
            imgData.data[i * 4] = r;
            imgData.data[i * 4 + 1] = g;
            imgData.data[i * 4 + 2] = b;
            imgData.data[i * 4 + 3] = a;
         }
         
         floor.ctx.putImageData(imgData, block.posX - minX, block.posY - minY);
         
         renderCount++;
         if (renderCount % 50 === 0) {
            setProgress(40 + Math.floor((renderCount / blocksCount) * 40));
         }
      }
      
      addLog("Gerando arquivos ZIP...");
      const zip = new JSZip();
      
      // Save metadata
      const metadata = {
         bounds: {
            minX, minY, maxX, maxY, width, height
         },
         floors_included: Array.from(floors.keys())
      };
      zip.file('metadata.json', JSON.stringify(metadata, null, 2));
      
      const promises = Array.from(floors.entries()).map(async ([z, floor]) => {
        // Export to blob
        const blob = await new Promise<Blob | null>(resolve => floor.canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          zip.file(`floor_${z}.png`, blob);
        }
      });
      
      await Promise.all(promises);
      setProgress(90);
      
      addLog("Baixando ZIP...");
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'minimap_images.zip';
      a.click();
      URL.revokeObjectURL(url);
      
      setProgress(100);
      addLog("Processo concluído!");
      
    } catch (e: any) {
      addLog(`Erro fatal: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
      <div className="flex items-center gap-2">
        <FileArchive className="w-5 h-5 text-medieval-gold" />
        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Conversor OTMM para PNG</h3>
      </div>
      
      <p className="text-zinc-400 text-xs">
        Selecione o seu arquivo <code className="bg-zinc-800 px-1 py-0.5 rounded text-medieval-gold">minimap.otmm</code> do seu cliente do jogo. 
        A ferramenta lerá os dados binários e extrairá as imagens de cada andar em um arquivo ZIP pronto para upload.
      </p>
      
      <label className={`flex flex-col items-center justify-center border-2 border-dashed ${loading ? 'border-zinc-700 bg-zinc-800' : 'border-medieval-gold/50 hover:border-medieval-gold hover:bg-medieval-gold/5 cursor-pointer'} rounded-lg p-6 transition-colors`}>
        <Upload className={`w-8 h-8 mb-2 ${loading ? 'text-zinc-600' : 'text-medieval-gold/70'}`} />
        <span className="text-sm font-bold text-zinc-300">
          {loading ? 'Processando arquivo...' : 'Clique ou arraste o arquivo .otmm aqui'}
        </span>
        <input 
          type="file" 
          accept=".otmm" 
          onChange={handleFileUpload} 
          disabled={loading}
          className="hidden" 
        />
      </label>
      
      {loading && (
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div className="bg-medieval-gold h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      {logs.length > 0 && (
        <div className="bg-black/50 p-2 rounded border border-zinc-800 h-32 overflow-y-auto font-mono text-[10px] text-zinc-400 flex flex-col gap-1 custom-scrollbar">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      )}
    </div>
  );
}
