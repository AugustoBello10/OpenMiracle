export class MapAnalyzer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentFloor: number = -1;
  private imageVersion: string = '2';
  private loading: boolean = false;
  private pendingFloor: number | null = null;
  private imgBounds = { min_x: 31680, max_x: 33984, min_y: 30848, max_y: 33024 };
  private fullImageData: ImageData | null = null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.imgBounds.max_x - this.imgBounds.min_x;
    this.canvas.height = this.imgBounds.max_y - this.imgBounds.min_y;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
  }

  public setVersion(version: string) {
    this.imageVersion = version;
  }

  public async loadFloor(floor: number): Promise<void> {
    if (this.currentFloor === floor && this.fullImageData) return;
    if (this.loading) {
      this.pendingFloor = floor;
      return;
    }
    this.loading = true;
    this.currentFloor = floor;
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.fullImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.loading = false;
        if (this.pendingFloor !== null) {
          const next = this.pendingFloor;
          this.pendingFloor = null;
          this.loadFloor(next).then(resolve).catch(reject);
        } else {
          resolve();
        }
      };
      img.onerror = (e) => {
        console.error("Failed to load map image for analyzer", e);
        this.loading = false;
        resolve(); // resolve anyway so we don't hang
      };
      img.src = `https://res.cloudinary.com/dc4nkbnkg/image/upload/floor_${floor}.png?v=${this.imageVersion}`;
    });
  }

  public checkLineForObstacles(x1: number, y1: number, x2: number, y2: number): boolean {
    if (this.loading || this.currentFloor === -1 || !this.fullImageData) return false;

    const imgX1 = Math.floor(x1 - this.imgBounds.min_x);
    const imgY1 = Math.floor(y1 - this.imgBounds.min_y);
    const imgX2 = Math.floor(x2 - this.imgBounds.min_x);
    const imgY2 = Math.floor(y2 - this.imgBounds.min_y);

    const dx = Math.abs(imgX2 - imgX1);
    const dy = Math.abs(imgY2 - imgY1);
    const sx = imgX1 < imgX2 ? 1 : -1;
    const sy = imgY1 < imgY2 ? 1 : -1;
    let err = dx - dy;

    let cx = imgX1;
    let cy = imgY1;
    let hasObstacle = false;
    let iterations = 0;
    const data = this.fullImageData.data;
    const width = this.canvas.width;

    while (iterations < 10000) {
      if (cx >= 0 && cx < width && cy >= 0 && cy < this.canvas.height) {
        const idx = (cy * width + cx) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a > 0) {
          // Dark brown or Red heuristic
          const isRed = r > 150 && g < 100 && b < 100;
          const isDarkBrown = r < 100 && g < 70 && b < 50; // Tweak this for dark brown 
          const isBlack = r < 30 && g < 30 && b < 30;

          if (isRed || isDarkBrown || isBlack) {
            hasObstacle = true;
            break;
          }
        }
      }

      if (cx === imgX2 && cy === imgY2) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; cx += sx; }
      if (e2 < dx) { err += dx; cy += sy; }
      iterations++;
    }

    return hasObstacle;
  }

  public findPath(x1: number, y1: number, x2: number, y2: number): {x: number, y: number}[] | null {
    if (this.loading || this.currentFloor === -1 || !this.fullImageData) return null;

    const startX = Math.floor(x1 - this.imgBounds.min_x);
    const startY = Math.floor(y1 - this.imgBounds.min_y);
    const targetX = Math.floor(x2 - this.imgBounds.min_x);
    const targetY = Math.floor(y2 - this.imgBounds.min_y);

    const width = this.canvas.width;
    const height = this.canvas.height;
    const data = this.fullImageData.data;

    const isBlocked = (cx: number, cy: number) => {
        if (cx < 0 || cx >= width || cy < 0 || cy >= height) return true;
        const idx = (cy * width + cx) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        if (a === 0) return false;
        
        const isRed = r > 150 && g < 100 && b < 100;
        const isDarkBrown = r < 100 && g < 70 && b < 50; 
        const isBlack = r < 30 && g < 30 && b < 30;
        return isRed || isDarkBrown || isBlack;
    };

    const maxSearchRadius = 200;
    if (Math.abs(startX - targetX) > maxSearchRadius || Math.abs(startY - targetY) > maxSearchRadius) {
       return null; 
    }
    
    const minX = Math.max(0, Math.min(startX, targetX) - 50);
    const maxX = Math.min(width - 1, Math.max(startX, targetX) + 50);
    const minY = Math.max(0, Math.min(startY, targetY) - 50);
    const maxY = Math.min(height - 1, Math.max(startY, targetY) + 50);

    const areaWidth = maxX - minX + 1;
    const areaHeight = maxY - minY + 1;
    
    const visited = new Uint8Array(areaWidth * areaHeight);
    
    const queueX = new Int32Array(areaWidth * areaHeight);
    const queueY = new Int32Array(areaWidth * areaHeight);
    let qHead = 0;
    let qTail = 0;
    
    queueX[qTail] = startX;
    queueY[qTail] = startY;
    qTail++;
    
    visited[(startY - minY) * areaWidth + (startX - minX)] = 1;
    
    const parents = new Int32Array(areaWidth * areaHeight);
    const orthoDirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    
    let found = false;
    
    while(qHead < qTail) {
       const cx = queueX[qHead];
       const cy = queueY[qHead];
       qHead++;
       
       if (cx === targetX && cy === targetY) {
           found = true;
           break;
       }
       
       for (const [dx, dy] of orthoDirs) {
           const nx = cx + dx;
           const ny = cy + dy;
           
           if (nx >= minX && nx <= maxX && ny >= minY && ny <= maxY) {
               const idx = (ny - minY) * areaWidth + (nx - minX);
               if (visited[idx] === 0) {
                   visited[idx] = 1;
                   if (!isBlocked(nx, ny) || (nx === targetX && ny === targetY)) {
                       queueX[qTail] = nx;
                       queueY[qTail] = ny;
                       qTail++;
                       parents[idx] = cx | (cy << 16);
                   }
               }
           }
       }
    }
    
    if (found) {
        const path: {x: number, y: number}[] = [];
        let currX = targetX;
        let currY = targetY;
        
        while(currX !== startX || currY !== startY) {
            path.push({
                x: currX + this.imgBounds.min_x,
                y: currY + this.imgBounds.min_y
            });
            const idx = (currY - minY) * areaWidth + (currX - minX);
            const parent = parents[idx];
            currX = parent & 0xFFFF;
            currY = (parent >> 16) & 0xFFFF;
        }
        path.push({
            x: startX + this.imgBounds.min_x,
            y: startY + this.imgBounds.min_y
        });
        
        return path.reverse();
    }
    
    return null;
  }
}

export const mapAnalyzer = new MapAnalyzer();
