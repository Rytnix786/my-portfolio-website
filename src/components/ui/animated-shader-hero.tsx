"use client";

import React, { useRef, useEffect } from 'react';

// Types for component props
export interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline?: {
    line1: string;
    line2: string;
  };
  subtitle?: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
  children?: React.ReactNode;
}

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  interface ShaderWebGLProgram extends WebGLProgram {
    resolution?: WebGLUniformLocation | null;
    time?: WebGLUniformLocation | null;
    move?: WebGLUniformLocation | null;
    touch?: WebGLUniformLocation | null;
    pointerCount?: WebGLUniformLocation | null;
    pointers?: WebGLUniformLocation | null;
  }

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove: number[] = [0, 0];
    private mouseCoords: number[] = [0, 0];
    private pointerCoords: number[] = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2')!;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = defaultShaderSource;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program! as ShaderWebGLProgram;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      program.resolution = gl.getUniformLocation(program, 'resolution');
      program.time = gl.getUniformLocation(program, 'time');
      program.move = gl.getUniformLocation(program, 'move');
      program.touch = gl.getUniformLocation(program, 'touch');
      program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
      program.pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program as ShaderWebGLProgram;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f(program.resolution || null, this.canvas.width, this.canvas.height);
      gl.uniform1f(program.time || null, now * 1e-3);
      gl.uniform2f(program.move || null, this.mouseMove[0], this.mouseMove[1]);
      gl.uniform2f(program.touch || null, this.mouseCoords[0], this.mouseCoords[1]);
      gl.uniform1i(program.pointerCount || null, this.nbrOfPointers);
      gl.uniform2fv(program.pointers || null, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (el: HTMLCanvasElement, sc: number, x: number, y: number) => 
        [x * sc, el.height - y * sc];

      element.addEventListener('pointerdown', (e: PointerEvent) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e: PointerEvent) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e: PointerEvent) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e: PointerEvent) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords(): number[] {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first(): number[] {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
};

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  headline,
  subtitle,
  buttons,
  className = "",
  children
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-[#020804] ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: '#020804' }}
      />
      
      {/* Hero Content Overlay */}
      {children ? (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-[#020804]/30 pt-24 pb-12 pointer-events-none">
          <div className="text-center space-y-6 max-w-5xl mx-auto px-4 pointer-events-auto">
            {/* Main Heading with Animation (Cyan-to-Blue Gradients) */}
            {headline && (
              <div className="space-y-3">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200 tracking-tight">
                  {headline.line1}
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-300 via-cyan-400 to-teal-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-400 tracking-tight">
                  {headline.line2}
                </h1>
              </div>
            )}
            
            {/* Subtitle with Animation */}
            {subtitle && (
              <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
                <p className="text-lg md:text-xl lg:text-2xl text-slate-300 font-light leading-relaxed">
                  {subtitle}
                </p>
              </div>
            )}
            
            {/* CTA Buttons with Animation */}
            {buttons && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up animation-delay-800">
                {buttons.primary && (
                  <button 
                    onClick={buttons.primary.onClick}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 shadow-[0_0_32px_rgba(34,211,238,0.22)]"
                  >
                    {buttons.primary.text}
                  </button>
                )}
                {buttons.secondary && (
                  <button 
                    onClick={buttons.secondary.onClick}
                    className="px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-300/30 hover:border-cyan-300/50 text-cyan-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    {buttons.secondary.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform int pointerCount;

#define FC gl_FragCoord.xy
#define R resolution
#define T time

// Hash functions
float hash11(float p) {
  p = fract(p * .1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// Distance from a point p to a line segment ab
float df_line(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main(void) {
  // Center and normalize UVs
  vec2 uv = (FC - 0.5 * R) / min(R.x, R.y);
  float distFromCenter = length(uv);
  
  // 1. Deep space backdrop with radial gradient fading to perfect void at edges
  vec3 col = mix(vec3(0.001, 0.008, 0.003), vec3(0.0, 0.0, 0.0), smoothstep(0.1, 1.4, distFromCenter));
  
  // 2. Starfield Layer (Twinkling & slow drift)
  float stars = 0.0;
  for (int l = 0; l < 3; l++) {
    float fl = float(l);
    float gridScale = 10.0 + fl * 6.0;
    vec2 st = uv * gridScale;
    
    // Slow coordinate drift
    st += vec2(T * 0.008 * (1.0 + fl * 0.5), -T * 0.002 * (1.0 + fl * 0.2));
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    
    vec2 rand = hash22(ipos + fl * 57.89);
    if (rand.x > 0.4) {
      vec2 offset = rand;
      float d = length(fpos - offset);
      float twinkle = sin(T * (1.2 + rand.y * 1.8) + rand.x * 6.28) * 0.5 + 0.5;
      float size = 0.006 + 0.005 * rand.y;
      float star = smoothstep(size, 0.0, d);
      float glow = 0.0003 / (d + 0.0025);
      stars += (star + glow * 0.3) * twinkle * (0.3 + 0.7 * rand.y);
    }
  }
  col += vec3(0.8, 0.95, 1.0) * stars * 0.75;
  
  // 3. Horizontal Shooting Stars / Comets with Cursor Attraction
  vec2 mouseUV = vec2(0.0);
  bool hasMouse = (pointerCount > 0);
  if (hasMouse) {
    mouseUV = (touch - 0.5 * R) / min(R.x, R.y);
  }
  
  vec3 comets = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float h1 = hash11(fi * 43.19 + 7.12);
    float h2 = hash11(fi * 81.65 + 13.91);
    float h3 = hash11(fi * 19.34 + 29.47);
    
    float speed = 0.3 + 0.2 * h1;
    float phase = h2 * 12.0;
    float cycle = fract(T * speed + phase);
    
    // Shooting direction: mostly horizontal with a slight random downwards tilt
    vec2 dir = normalize(vec2(1.0, -0.05 - 0.1 * h3));
    
    // Path coordinates
    float yStart = -0.65 + 1.3 * h3;
    vec2 startPos = vec2(-1.8, yStart);
    vec2 endPos = startPos + dir * 3.6;
    
    vec2 headPos = mix(startPos, endPos, cycle);
    
    // Cursor gravitational pull
    if (hasMouse) {
      float dMouse = length(headPos - mouseUV);
      vec2 pull = (mouseUV - headPos) * (0.16 / (dMouse + 0.25));
      headPos += pull;
    }
    
    vec2 v = uv - headPos;
    float proj = dot(v, -dir);
    
    // Tail length limit
    if (proj >= 0.0 && proj < 0.8) {
      float perp = length(v + proj * dir);
      
      // Smooth decay of comet tail
      float tailFade = exp(-proj * 5.5) * smoothstep(0.8, 0.0, proj);
      
      // Tail glow and sharp head core
      float tailGlow = 0.0016 / (perp + 0.0035) * tailFade;
      float headGlow = 0.0012 / (length(v) + 0.006);
      
      // Dynamic color: Emerald blending into Teal/Cyan
      vec3 cometCol = mix(vec3(0.02, 0.92, 0.45), vec3(0.0, 0.75, 0.85), h1);
      comets += (tailGlow + headGlow) * cometCol * (0.5 + 0.5 * h2);
    }
  }
  col += comets * 0.9;
  
  // 4. Emerald Neural Network Graph (Warped by cursor)
  float scale = 12.0;
  vec2 st = uv * scale;
  vec2 ipos = floor(st);
  vec2 fpos = fract(st);
  
  // Cache points in a 3x3 grid around the cell
  vec2 points[9];
  int idx = 0;
  
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 cell = ipos + g;
      vec2 rand = hash22(cell);
      
      // Node idle animation
      vec2 p = g + 0.5 + 0.3 * sin(T * 0.5 + rand * 6.2831);
      
      // Node position in grid space
      vec2 nodeWorld = ipos + p;
      
      // Warp node coordinates towards cursor
      if (hasMouse) {
        vec2 mouseGrid = mouseUV * scale;
        float d = length(nodeWorld - mouseGrid);
        vec2 pull = (mouseGrid - nodeWorld) * (0.45 / (d + 0.7));
        p += pull;
      }
      
      points[idx++] = p;
    }
  }
  
  float m_dist = 1e10;
  float line_glow = 0.0;
  float node_dots = 0.0;
  vec2 local_p = fpos;
  
  // Compute minimum distance and draw nodes
  for (int i = 0; i < 9; i++) {
    float d = length(local_p - points[i]);
    m_dist = min(m_dist, d);
    
    // Smooth node dot with hot core
    float dotGlow = 0.045 / (d + 0.018);
    node_dots += dotGlow * 0.15;
    if (d < 0.04) {
      node_dots += smoothstep(0.04, 0.0, d) * 0.65;
    }
  }
  
  // Draw connections from the center point of the 3x3 block
  vec2 p_center = points[4];
  for (int i = 0; i < 9; i++) {
    if (i == 4) continue;
    float dist_between = length(p_center - points[i]);
    
    // Connect nodes that are within logical distance
    float max_dist = 1.6;
    if (dist_between < max_dist) {
      float d_line = df_line(local_p, p_center, points[i]);
      float fade = smoothstep(max_dist, 0.7, dist_between);
      
      // Animated signal pulses traveling along connection lines
      vec2 pa = local_p - p_center;
      vec2 ba = points[i] - p_center;
      float proj = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
      float pulse = fract(proj - T * 0.4);
      float pulseGlow = smoothstep(0.15, 0.0, abs(pulse - 0.5)) * 0.6;
      
      float thickness = 0.007;
      float lineVal = smoothstep(thickness + 0.015, thickness - 0.003, d_line);
      line_glow += (lineVal * 0.1 + lineVal * pulseGlow) * fade;
    }
  }
  
  // Mix node graph colors
  vec3 lineColor = mix(vec3(0.03, 0.65, 0.38), vec3(0.0, 0.55, 0.65), sin(T * 0.25) * 0.5 + 0.5) * line_glow;
  vec3 nodeColor = mix(vec3(0.08, 0.9, 0.52), vec3(0.0, 0.8, 0.75), cos(T * 0.3) * 0.5 + 0.5) * node_dots;
  
  // Subtle moving flow field in the background matching coordinate space
  float flow = sin(st.y * 3.0 - T * 1.0) * cos(st.x * 2.0 + T * 0.3);
  vec3 flowBg = vec3(0.002, 0.05, 0.025) * max(0.0, flow) * (1.0 - distFromCenter * 0.6);
  
  col += lineColor * 0.85 + nodeColor * 0.9 + flowBg;
  
  // Soft vignetting towards screen corners
  col *= smoothstep(1.5, 0.45, distFromCenter);
  
  fragColor = vec4(col, 1.0);
}
`;

export default Hero;
