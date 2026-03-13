// src/js/smooth-water-ripples.js – pro tvůj Eleventy projekt
(function() {
    'use strict';
    window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || 
                              (cb => window.setTimeout(cb, 1000/60));

    var pixel = [[0.3]];

    function WaterModel(w, h, res) {
        this.width = Math.ceil(w/res); this.height = Math.ceil(h/res); this.resolution = res;
        this.damping = 0.998; this.clipping = 1.8; this.evolveThreshold = 0.01;
        this.depthMap1 = Array.from({length: this.width}, () => Array(this.height).fill(0));
        this.depthMap2 = Array.from({length: this.width}, () => Array(this.height).fill(0));
        this.evolving = false;
        const self = this; setInterval(() => self.renderNextFrame(), 33);
    }

    WaterModel.prototype.getWater = function(x, y) {
        const xt = Math.floor(x/this.resolution), yt = Math.floor(y/this.resolution);
        return xt<0||xt>=this.width||yt<0||yt>=this.height ? 0 : this.depthMap1[xt][yt];
    };

    WaterModel.prototype.touchWater = function(x, y, pressure) {
        this.evolving = true;
        let xf = Math.floor(x/this.resolution), yf = Math.floor(y/this.resolution);
        xf = Math.max(0, Math.min(this.width-1, xf)); yf = Math.max(0, Math.min(this.height-1, yf));
        for(let i=-1; i<=1; i++) for(let j=-1; j<=1; j++) {
            const nx = xf+i, ny = yf+j;
            if(nx>=0 && nx<this.width && ny>=0 && ny<this.height) this.depthMap1[nx][ny] -= pressure * 0.3;
        }
    };

    WaterModel.prototype.renderNextFrame = function() {
        if(!this.evolving) return; this.evolving = false;
        for(let x=1; x<this.width-1; x++) for(let y=1; y<this.height-1; y++) {
            const val = (this.depthMap1[x-1][y] + this.depthMap1[x+1][y] + this.depthMap1[x][y-1] + this.depthMap1[x][y+1])/2 - this.depthMap2[x][y];
            const damped = val * this.damping;
            if(Math.abs(damped) > this.clipping) damped = Math.sign(damped) * this.clipping;
            if(Math.abs(damped) > this.evolveThreshold) this.evolving = true;
            this.depthMap2[x][y] = damped;
        }
        [this.depthMap1, this.depthMap2] = [this.depthMap2, this.depthMap1];
    };

    function initRipples() {
        const canvases = document.querySelectorAll('.water-ripples');
        canvases.forEach(canvas => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width; canvas.height = rect.height;
            const ctx = canvas.getContext('2d');
            
            // Načti tvůj obrazek jako pozadí (obrazek.jpg z root)
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const model = new WaterModel(canvas.width, canvas.height, 4);
                model.bgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                let raf;
                const render = () => {
                    if(!model.evolving) return raf = requestAnimFrame(render);
                    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
                    const pixels = imgData.data;
                    for(let i=0, n=pixels.length; i<n; i+=4) {
                        const px = i/4, x = px % canvas.width, y = Math.floor(px / canvas.width);
                        const strength = model.getWater(x, y);
                        const rx = Math.max(0, Math.min(canvas.width-1, x + strength*10));
                        const ry = Math.max(0, Math.min(canvas.height-1, y + strength*10));
                        const ri = (Math.floor(ry * canvas.width) + rx) * 4;
                        const s = Math.max(0.4, 1 + strength * 0.4);
                        pixels[i] = model.bgData.data[ri] * s;
                        pixels[i+1] = model.bgData.data[ri+1] * s;
                        pixels[i+2] = model.bgData.data[ri+2] * s;
                        pixels[i+3] = 255;
                    }
                    ctx.putImageData(imgData, 0, 0);
                    raf = requestAnimFrame(render);
                };
                render();

                // Mouse/Touch
                const handleMove = e => {
                    e.preventDefault();
                    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
                    const clientY = e.touches?.[0]?.clientY ?? e.clientY;
                    const x = clientX - rect.left, y = clientY - rect.top;
                    model.touchWater(x, y, 30);
                };
                canvas.addEventListener('mousemove', handleMove);
                canvas.addEventListener('touchmove', handleMove, {passive: false});
            };
            img.src = '/obrazek.jpg';  // tvůj obrázek z root
        });
    }

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initRipples) : initRipples();
})();
