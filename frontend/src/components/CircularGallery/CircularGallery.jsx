import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, Raycast } from 'ogl';
import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function createTextTexture(gl, text, font = '600 20px "Plus Jakarta Sans", sans-serif', color = '#1E2D24') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = 28;

  const padX = 22;
  const padY = 8;
  const totalW = textWidth + padX * 2;
  const totalH = textHeight + padY * 2;

  canvas.width = Math.ceil(totalW * dpr);
  canvas.height = Math.ceil(totalH * dpr);

  context.scale(dpr, dpr);

  // Soft shadow for the floating pill badge
  context.shadowColor = 'rgba(28, 43, 34, 0.14)';
  context.shadowBlur = 10;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 3;

  // Frosted pill background
  context.fillStyle = 'rgba(255, 255, 255, 0.94)';
  context.beginPath();
  const radius = totalH / 2;
  if (context.roundRect) {
    context.roundRect(0, 0, totalW, totalH, radius);
  } else {
    context.rect(0, 0, totalW, totalH);
  }
  context.fill();

  // Reset shadow for stroke & text
  context.shadowColor = 'transparent';

  // Delicate gold & sage border
  context.strokeStyle = 'rgba(197, 155, 75, 0.55)';
  context.lineWidth = 1.2;
  context.stroke();

  // Deep sacred sage text
  context.font = font;
  context.fillStyle = color || '#1E2D24';
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(text, totalW / 2, totalH / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: totalW, height: totalH };
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0.05,
    font
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.05 + uSpeed * 0.25);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b + vec2(r);
          return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if (d > 0.0) {
            discard;
          }
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );

    const titleProgram = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.05) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture }
      },
      transparent: true
    });

    this.titlePlane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: titleProgram
    });
    this.titlePlane.setParent(this.scene);
    this.titleDimensions = { width, height };
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.max(x, -H), H);

      const arc = effectiveX / R;
      if (this.bend > 0) {
        this.plane.position.y = -R + R * Math.cos(arc) + 0.38;
        this.plane.rotation.z = -arc;
      } else {
        this.plane.position.y = R - R * Math.cos(arc) - 0.38;
        this.plane.rotation.z = arc;
      }
    }

    this.titlePlane.position.x = this.plane.position.x;
    this.titlePlane.position.y = this.plane.position.y - this.plane.scale.y / 2 - 0.52;
    this.titlePlane.position.z = 0.05;
    this.titlePlane.rotation.z = this.plane.rotation.z;

    this.program.uniforms.uTime.value += 0.03;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    this.scale = this.screen.height / 1500;
    
    // Card proportions adjusted for serene photography cards
    const cardWidthPx = Math.min(Math.max(this.screen.width * 0.25, 240), 340);
    const cardHeightPx = cardWidthPx * 1.32;
    
    this.plane.scale.x = (this.viewport.width * cardWidthPx) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * cardHeightPx) / this.screen.height;

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = 1.35;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;

    // Scale title mesh to fit its canvas dimensions nicely
    const titleScale = 0.021 * Math.min(Math.max(this.viewport.width / 16, 0.75), 1.25);
    this.titlePlane.scale.x = this.titleDimensions.width * titleScale;
    this.titlePlane.scale.y = this.titleDimensions.height * titleScale;
  }
}

class CircularGalleryEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.items = options.items || [];
    this.bend = options.bend !== undefined ? options.bend : 2.5;
    this.textColor = options.textColor || '#FAF7F2';
    this.borderRadius = options.borderRadius !== undefined ? options.borderRadius : 0.05;
    this.font = options.font || '600 22px "Plus Jakarta Sans", sans-serif';
    this.scrollSpeed = options.scrollSpeed || 1.8;
    this.scrollEase = options.scrollEase || 0.075;
    this.onItemClick = options.onItemClick || null;

    this.scroll = {
      ease: this.scrollEase,
      current: 0,
      target: 0,
      last: 0,
      position: 0
    };

    this.isDown = false;
    this.touchStartCoord = { x: 0, y: 0 };
    this.isDraggingHorizontally = false;

    this.init();
  }

  init() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 40,
      widthSegments: 80
    });
  }

  createMedias() {
    const galleryItems = this.items.concat(this.items);
    this.medias = galleryItems.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: galleryItems.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font
      });
    });
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || 540;

    this.screen = { width, height };
    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const viewWidth = viewHeight * this.camera.aspect;

    this.viewport = {
      width: viewWidth,
      height: viewHeight
    };

    if (this.medias) {
      this.medias.forEach(media => media.onResize({
        screen: this.screen,
        viewport: this.viewport
      }));
    }
  }

  onTouchDown(e) {
    this.isDown = true;
    this.isDraggingHorizontally = false;
    this.scroll.position = this.scroll.current;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    this.start = clientX;
    this.touchStartCoord = { x: clientX, y: clientY };
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = Math.abs(clientX - this.touchStartCoord.x);
    const dy = Math.abs(clientY - this.touchStartCoord.y);

    // If touch event, distinguish vertical scroll from horizontal drag
    if (e.touches && !this.isDraggingHorizontally) {
      if (dy > dx && dy > 8) {
        this.isDown = false;
        return;
      }
      if (dx > 8) {
        this.isDraggingHorizontally = true;
      }
    }

    const distance = (this.start - clientX) * 0.045;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp(e) {
    this.isDown = false;
    
    if (!this.isDraggingHorizontally && this.onItemClick) {
      const rect = this.container.getBoundingClientRect();
      const x = this.touchStartCoord.x - rect.left;
      const y = this.touchStartCoord.y - rect.top;

      const mouse = {
        x: (x / this.screen.width) * 2 - 1,
        y: -(y / this.screen.height) * 2 + 1
      };
      
      const raycast = new Raycast(this.gl);
      raycast.castMouse(this.camera, mouse);
      
      const meshes = this.medias.map(m => m.plane);
      const hits = raycast.intersectBounds(meshes);
      
      if (hits && hits.length > 0) {
        const hitMesh = hits[0];
        const media = this.medias.find(m => m.plane === hitMesh);
        if (media) {
          const actualIndex = media.index % this.items.length;
          this.onItemClick(media.image, actualIndex);
        }
      }
    }
    
    this.isDraggingHorizontally = false;
  }

  onWheel(e) {
    // Only respond to horizontal or intentional trackpad swipes on the gallery container
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.4;
    this.scroll.target += delta * 0.02 * this.scrollSpeed;
  }

  scrollBy(amount) {
    this.scroll.target += amount;
  }

  update() {
    this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current > this.scroll.last) {
      this.direction = 'right';
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = 'left';
    }

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.rafId = window.requestAnimationFrame(this.update.bind(this));
  }

  lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t;
  }

  addEventListeners() {
    this.boundOnResize = debounce(this.onResize.bind(this), 100);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundTouchDown = this.onTouchDown.bind(this);
    this.boundTouchMove = this.onTouchMove.bind(this);
    this.boundTouchUp = this.onTouchUp.bind(this);

    window.addEventListener('resize', this.boundOnResize);

    // Attach wheel and drag initiation directly to the container to protect global page scroll
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: true });
    this.container.addEventListener('mousedown', this.boundTouchDown);
    this.container.addEventListener('touchstart', this.boundTouchDown, { passive: true });

    window.addEventListener('mousemove', this.boundTouchMove);
    window.addEventListener('mouseup', this.boundTouchUp);
    window.addEventListener('touchmove', this.boundTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.rafId);

    window.removeEventListener('resize', this.boundOnResize);
    if (this.container) {
      this.container.removeEventListener('wheel', this.boundOnWheel);
      this.container.removeEventListener('mousedown', this.boundTouchDown);
      this.container.removeEventListener('touchstart', this.boundTouchDown);
    }
    window.removeEventListener('mousemove', this.boundTouchMove);
    window.removeEventListener('mouseup', this.boundTouchUp);
    window.removeEventListener('touchmove', this.boundTouchMove);
    window.removeEventListener('touchend', this.boundTouchUp);

    try {
      if (this.gl && this.gl.canvas) {
        this.gl.getExtension('WEBGL_lose_context')?.loseContext();
        this.gl.canvas.remove();
      }
    } catch {
      // safe cleanup fallback
    }
  }
}

const CircularGallery = forwardRef(function CircularGallery({
  items = [],
  bend = 2.5,
  textColor = '#FAF7F2',
  borderRadius = 0.05,
  font = '600 22px "Plus Jakarta Sans", sans-serif',
  scrollSpeed = 1.8,
  scrollEase = 0.075,
  onItemClick
}, ref) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollBy: (amount) => {
      if (engineRef.current) {
        engineRef.current.scrollBy(amount);
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current || !items || items.length === 0) return;

    engineRef.current = new CircularGalleryEngine(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onItemClick
    });

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onItemClick]);

  return <div className="circular-gallery" ref={containerRef} />;
});

export default CircularGallery;
