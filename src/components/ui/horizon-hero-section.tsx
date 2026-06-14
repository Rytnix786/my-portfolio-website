"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ArrowUpRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────
type ProjectBase = { key:string; title:string; subtitle:string; tagline:string; description:string; impact:string; tech:string[]; repo:string };
type ProjectWithDocs = ProjectBase & { docs: string };
type Project = ProjectBase | ProjectWithDocs;
const hasDocs = (p:Project): p is ProjectWithDocs => 'docs' in p;

const PROJECTS: Project[] = [
  {
    key:'offboarder', title:'OFFBOARDER',
    subtitle:'Security-First Enterprise Platform',
    tagline:'Rigorous multi-tenant isolation and granular RBAC',
    description:'A security-first, multi-tenant enterprise offboarding platform with strict database row-level security, role-based access control, and segregation-of-duties controls.',
    impact:'Built robust Postgres schema isolation, auth flows, and administrative audit trails.',
    tech:['Next.js','TypeScript','PostgreSQL','Prisma','Supabase'], repo:'https://github.com/Rytnix786',
  },
  {
    key:'masheba', title:'MA SHEBA AI',
    subtitle:'Offline-First Clinical Health Assistant',
    tagline:'Local persistence, resilient sync, Bangla clinical chat',
    description:'An offline-first clinical assistant for mothers and community health workers in remote areas — local SQLite sync, AI clinical chat, vital-signs triage.',
    impact:'Built local storage sync, Bangla medical chat workflows, and vital-signs triage.',
    tech:['React Native','Expo','SQLite','Supabase','FastAPI'], repo:'https://github.com/Rytnix786', docs:'https://github.com/Rytnix786',
  },
  {
    key:'nexus', title:'NEXUS RESEARCHER',
    subtitle:'Stateful Multi-Agent Research System',
    tagline:'8-node LangGraph workflow with factual verification',
    description:'A stateful multi-agent system for automated academic & clinical research — 8-node LangGraph, BM25 + Vector search, human-in-the-loop review.',
    impact:'Sustained 8.05 req/s under load, 91% refusal accuracy on out-of-domain queries.',
    tech:['LangGraph','FastAPI','PostgreSQL','Redis','SSE','Next.js'], repo:'https://github.com/Rytnix786',
  },
];

// ── Three.js refs ─────────────────────────────────────────────────────────────
interface ThreeRefs {
  scene:THREE.Scene|null; camera:THREE.PerspectiveCamera|null;
  renderer:THREE.WebGLRenderer|null; composer:EffectComposer|null;
  stars:THREE.Points[]; nebula:THREE.Mesh|null;
  mountains:THREE.Mesh[]; animationId:number|null;
  targetCameraX:number; targetCameraY:number; targetCameraZ:number;
  locations:number[];
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Component = () => {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x:0, y:30, z:100 });
  const cameraVelocity  = useRef({ x:0, y:0, z:0 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady]               = useState(false);

  const threeRefs = useRef<ThreeRefs>({
    scene:null, camera:null, renderer:null, composer:null,
    stars:[], nebula:null, mountains:[], animationId:null,
    targetCameraX:0, targetCameraY:30, targetCameraZ:300,
    locations:[],
  });

  // ── Three.js init ─────────────────────────────────────────────────────────
  useEffect(() => {
    const refs = threeRefs.current;

    // Scene — black background, subtle fog
    refs.scene = new THREE.Scene();
    refs.scene.background = new THREE.Color(0x000000);
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current??undefined, antialias:true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85));

    // ── Star field ──────────────────────────────────────────────────────────
    const starCount = 5000;
    for (let layer=0; layer<3; layer++) {
      const positions=new Float32Array(starCount*3), colors=new Float32Array(starCount*3), sizes=new Float32Array(starCount);
      for (let j=0; j<starCount; j++) {
        const r=200+Math.random()*800, theta=Math.random()*Math.PI*2, phi=Math.acos(Math.random()*2-1);
        positions[j*3]=r*Math.sin(phi)*Math.cos(theta); positions[j*3+1]=r*Math.sin(phi)*Math.sin(theta); positions[j*3+2]=r*Math.cos(phi);
        const col=new THREE.Color(); const ch=Math.random();
        if(ch<0.7) col.setHSL(0,0,0.8+Math.random()*0.2);
        else if(ch<0.9) col.setHSL(0.08,0.5,0.8);
        else col.setHSL(0.6,0.5,0.8);
        colors[j*3]=col.r; colors[j*3+1]=col.g; colors[j*3+2]=col.b;
        sizes[j]=Math.random()*2+0.5;
      }
      const geo=new THREE.BufferGeometry();
      geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
      geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
      geo.setAttribute('size',new THREE.BufferAttribute(sizes,1));
      const mat=new THREE.ShaderMaterial({
        uniforms:{time:{value:0},depth:{value:layer}},
        vertexShader:`
          attribute float size; attribute vec3 color;
          varying vec3 vColor; uniform float time; uniform float depth;
          void main(){
            vColor=color; vec3 pos=position;
            float angle=time*0.05*(1.0-depth*0.3);
            mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
            pos.xy=rot*pos.xy;
            vec4 mv=modelViewMatrix*vec4(pos,1.0);
            gl_PointSize=size*(300.0/-mv.z);
            gl_Position=projectionMatrix*mv;
          }`,
        fragmentShader:`
          varying vec3 vColor;
          void main(){
            float d=length(gl_PointCoord-vec2(0.5));
            if(d>0.5)discard;
            gl_FragColor=vec4(vColor,1.0-smoothstep(0.0,0.5,d));
          }`,
        transparent:true, blending:THREE.AdditiveBlending, depthWrite:false,
      });
      const pts=new THREE.Points(geo,mat);
      refs.scene.add(pts); refs.stars.push(pts);
    }

    // ── Nebula ───────────────────────────────────────────────────────────────
    // IMPORTANT: variable named "mixFactor" to avoid collision with GLSL built-in mix()
    {
      const geo=new THREE.PlaneGeometry(8000,4000,100,100);
      const mat=new THREE.ShaderMaterial({
        uniforms:{time:{value:0},color1:{value:new THREE.Color(0x0033ff)},color2:{value:new THREE.Color(0xff0066)},opacity:{value:0.3}},
        vertexShader:`
          varying vec2 vUv; varying float vElevation; uniform float time;
          void main(){
            vUv=uv; vec3 pos=position;
            float el=sin(pos.x*0.01+time)*cos(pos.y*0.01+time)*20.0;
            pos.z+=el; vElevation=el;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
          }`,
        fragmentShader:`
          uniform vec3 color1,color2; uniform float opacity,time;
          varying vec2 vUv; varying float vElevation;
          void main(){
            float mixFactor=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
            vec3 col=mix(color1,color2,mixFactor*0.5+0.5);
            float a=opacity*(1.0-length(vUv-0.5)*2.0)*(1.0+vElevation*0.01);
            gl_FragColor=vec4(col,a);
          }`,
        transparent:true, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false,
      });
      const nebula=new THREE.Mesh(geo,mat);
      nebula.position.z=-1050;
      refs.scene.add(nebula); refs.nebula=nebula;
    }

    // ── Mountains — sharp silhouette peaks (dark blue layered) ───────────────
    // Key: position.y = layer.distance (same as original component)
    // Shape: use Math.abs(sin) for sharp triangular peaks, not smooth waves
    const mountainLayers=[
      {distance:-50,  height:60,  color:0x1a1a2e, opacity:1  },
      {distance:-100, height:80,  color:0x16213e, opacity:0.9},
      {distance:-150, height:100, color:0x0f3460, opacity:0.8},
      {distance:-200, height:120, color:0x0a4668, opacity:0.7},
    ];
    mountainLayers.forEach(({distance, height, color, opacity}, idx)=>{
      const pts:THREE.Vector2[]=[];
      const segments=60;
      for(let i=0; i<=segments; i++){
        const x=(i/segments-0.5)*1000;
        const t=i/segments;
        // Sharp triangular peaks using absolute sine — mimics real mountain profiles
        const y=
          Math.abs(Math.sin(t*Math.PI*4+idx*0.8))*height*0.8+
          Math.abs(Math.sin(t*Math.PI*2.5+idx*1.5))*height*0.4+
          Math.sin(t*Math.PI*7+idx)*height*0.1
          - height - 60;
        pts.push(new THREE.Vector2(x,y));
      }
      pts.push(new THREE.Vector2(5000,-300), new THREE.Vector2(-5000,-300));
      const mountain=new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({color, transparent:true, opacity, side:THREE.DoubleSide}),
      );
      mountain.position.z=distance;
      mountain.position.y=distance;   // ← critical: y=dist staggers layers into view
      mountain.userData={baseZ:distance, index:idx};
      refs.scene!.add(mountain);
      refs.mountains.push(mountain);
    });

    // ── Atmosphere sphere ────────────────────────────────────────────────────
    refs.scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(600,32,32),
      new THREE.ShaderMaterial({
        uniforms:{time:{value:0}},
        vertexShader:`
          varying vec3 vNormal; varying vec3 vPosition;
          void main(){
            vNormal=normalize(normalMatrix*normal); vPosition=position;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
          }`,
        fragmentShader:`
          varying vec3 vNormal; varying vec3 vPosition; uniform float time;
          void main(){
            float intensity=pow(0.7-dot(vNormal,vec3(0.0,0.0,1.0)),2.0);
            vec3 atmosphere=vec3(0.3,0.6,1.0)*intensity;
            float pulse=sin(time*2.0)*0.1+0.9;
            atmosphere*=pulse;
            gl_FragColor=vec4(atmosphere,intensity*0.25);
          }`,
        side:THREE.BackSide, blending:THREE.AdditiveBlending, transparent:true,
      }),
    ));

    // Store initial mountain Z for scroll parallax reference
    refs.mountains.forEach((m,i)=>{ refs.locations[i]=m.position.z; });

    // ── Render loop ──────────────────────────────────────────────────────────
    const animate=()=>{
      refs.animationId=requestAnimationFrame(animate);
      const time=Date.now()*0.001;

      refs.stars.forEach(s=>{ if(s.material instanceof THREE.ShaderMaterial) s.material.uniforms.time.value=time; });
      if(refs.nebula?.material instanceof THREE.ShaderMaterial) refs.nebula.material.uniforms.time.value=time*0.5;

      if(refs.camera && refs.targetCameraX!==undefined){
        const f=0.05;
        smoothCameraPos.current.x+=(refs.targetCameraX-smoothCameraPos.current.x)*f;
        smoothCameraPos.current.y+=(refs.targetCameraY-smoothCameraPos.current.y)*f;
        smoothCameraPos.current.z+=(refs.targetCameraZ-smoothCameraPos.current.z)*f;

        refs.camera.position.set(
          smoothCameraPos.current.x+Math.sin(time*0.1)*2,
          smoothCameraPos.current.y+Math.cos(time*0.15)*1,
          smoothCameraPos.current.z,
        );
        refs.camera.lookAt(0,10,-600);
      }

      // Mountain subtle parallax sway (y=50 base, matching original)
      refs.mountains.forEach((m,i)=>{
        const pf=1+i*0.5;
        m.position.x=Math.sin(time*0.1)*2*pf;
        m.position.y=50+(Math.cos(time*0.15)*1*pf);
      });

      refs.composer?.render();
    };
    animate();
    setIsReady(true);

    const onResize=()=>{
      if(!refs.camera||!refs.renderer||!refs.composer) return;
      refs.camera.aspect=window.innerWidth/window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth,window.innerHeight);
      refs.composer.setSize(window.innerWidth,window.innerHeight);
    };
    window.addEventListener('resize',onResize);

    return ()=>{
      window.removeEventListener('resize',onResize);
      if(refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.stars.forEach(s=>{s.geometry.dispose();(s.material as THREE.Material).dispose();});
      refs.mountains.forEach(m=>{m.geometry.dispose();(m.material as THREE.Material).dispose();});
      if(refs.nebula){refs.nebula.geometry.dispose();(refs.nebula.material as THREE.Material).dispose();}
      refs.renderer?.dispose();
    };
  }, []);

  // ── GSAP entrance ──────────────────────────────────────────────────────────
  useEffect(()=>{
    if(!isReady) return;
    gsap.set([menuRef.current, scrollProgressRef.current], {visibility:'visible'});
    const tl=gsap.timeline();
    if(menuRef.current) tl.from(menuRef.current,{x:-100,opacity:0,duration:1,ease:'power3.out'});
    if(cardRef.current) tl.from(cardRef.current,{y:40,opacity:0,duration:0.9,ease:'power3.out'},'-=0.6');
    if(scrollProgressRef.current) tl.from(scrollProgressRef.current,{opacity:0,y:20,duration:0.8,ease:'power2.out'},'-=0.5');
    return ()=>{tl.kill();};
  },[isReady]);

  // ── Section change ──────────────────────────────────────────────────────────
  const prevSection=useRef(-1);
  useEffect(()=>{
    if(!isReady||prevSection.current===currentSection) return;
    prevSection.current=currentSection;
    if(cardRef.current) gsap.fromTo(cardRef.current,{opacity:0,y:25},{opacity:1,y:0,duration:0.55,ease:'power3.out'});
  },[currentSection,isReady]);

  // ── Scroll handler ─────────────────────────────────────────────────────────
  useEffect(()=>{
    const handleScroll=()=>{
      if(!outerRef.current) return;
      const rect=outerRef.current.getBoundingClientRect();
      const scrollY=window.scrollY;
      const scrolled=-rect.top;
      const maxScroll=rect.height-window.innerHeight;
      const progress=Math.max(0,Math.min(scrolled/maxScroll,1));

      setScrollProgress(progress);
      const next=progress<0.33?0:progress<0.66?1:2;
      setCurrentSection(next);

      const refs=threeRefs.current;

      /*
       * Camera: 3 proper segments that map 1:1 with the 3 content sections.
       *   Seg 0 (OFFBOARDER  0→0.33): z 300→80  — pull back view zooms in slowly
       *   Seg 1 (MA SHEBA AI 0.33→0.66): z 80→-700 — mountains vanish at 0.38,
       *          camera rushes into deep space (the "zoom until MA SHEBA AI" effect)
       *   Seg 2 (NEXUS       0.66→1.0): stays near -700 — full deep-space scene
       */
      const camPositions=[
        {x:0,y:30,z:300},   // OFFBOARDER — wide horizon
        {x:0,y:35,z:80},    // MA SHEBA AI — close to mountains (stays in front at z>-50)
        {x:0,y:50,z:-700},  // NEXUS — deep space / nebula
      ];
      const seg=Math.min(Math.floor(progress*3),2);
      const segP=(progress*3)%1;
      const from=camPositions[seg];
      const to=camPositions[Math.min(seg+1,2)];
      refs.targetCameraX=from.x+(to.x-from.x)*segP;
      refs.targetCameraY=from.y+(to.y-from.y)*segP;
      refs.targetCameraZ=from.z+(to.z-from.z)*segP;

      /*
       * Mountains: vanish at progress=0.38 (early in MA SHEBA AI section).
       * This ensures:
       *  - OFFBOARDER: full mountain silhouette visible
       *  - MA SHEBA AI: mountains present briefly at start, then disappear as
       *    camera rushes into deep space (no camera-clipping-through-mountain)
       *  - NEXUS: always deep space, mountains long gone
       */
      refs.mountains.forEach((mountain,i)=>{
        if(progress>0.38){
          mountain.position.z=600000;  // send to fog — instant disappear
        } else if(refs.locations[i]!==undefined){
          mountain.position.z=refs.locations[i];
        }
      });
      if(refs.nebula) refs.nebula.position.z=progress>0.38?-1050:-1050;
    };

    window.addEventListener('scroll',handleScroll,{passive:true});
    handleScroll();
    return ()=>window.removeEventListener('scroll',handleScroll);
  },[]);

  const project=PROJECTS[currentSection];

  return (
    <div id="projects" ref={outerRef} style={{height:`${PROJECTS.length*100}vh`}} className="relative">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">

        {/* WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{zIndex:0}} />

        {/* Dark gradient at the very top — guarantees title is legible against any background (sky, bloom, nebula) */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* Side menu (matches original) */}
        <div
          ref={menuRef}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-6 select-none pointer-events-none"
          style={{visibility:'hidden'}}
        >
          <div className="flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-cyan-400 block rounded-full"/>
            <span className="w-6 h-0.5 bg-cyan-400 block rounded-full"/>
            <span className="w-6 h-0.5 bg-cyan-400 block rounded-full"/>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500/80 [writing-mode:vertical-lr] rotate-180">
            BUILDS
          </div>
        </div>

        {/*
         * Content layout — two zones separated by flex-1:
         *   TOP  : title + subtitle  (pinned to top)
         *   SPACE: flex-1 fills whatever remains
         *   BOTTOM: info card        (pinned above mountains)
         * This guarantees no overlap regardless of title length or viewport size.
         */}
        <div className="absolute inset-0 z-20 flex flex-col items-center pointer-events-none select-none">

          {/* ── TOP ZONE ── title + subtitle ─────────────────────────────── */}
          {/* pt-[4.5rem] = 72px — safely clears fixed navbar (~16px top-4 + ~52px height) */}
          <div className="flex flex-col items-center text-center w-full pt-[4.5rem] px-4 md:pt-20">
            <h1
              key={project.key}
              className="text-[clamp(2.5rem,9vw,7.5rem)] font-black tracking-[-0.02em] uppercase leading-none text-white mb-3"
              style={{
                /* Strong dark shadows ensure legibility on bright nebula/bloom backgrounds */
                textShadow:[
                  '0 0 0 rgba(0,0,0,0)',           // crisp base
                  '0 2px 4px rgba(0,0,0,1)',        // tight dark drop
                  '0 4px 20px rgba(0,0,0,0.95)',    // medium spread
                  '0 8px 60px rgba(0,0,0,0.85)',    // wide spread
                  '0 0 120px rgba(0,0,0,0.7)',      // glow kill
                ].join(', '),
              }}
            >
              {project.title}
            </h1>
            {/* Subtitle: white/80 and slightly larger so it reads against any background */}
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-white/80"
               style={{textShadow:'0 1px 8px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.8)'}}>
              {project.subtitle}&nbsp;·&nbsp;{project.tagline}
            </p>
          </div>

          {/* ── SPACER — pushes card to bottom ───────────────────────────── */}
          <div className="flex-1" />

          {/* ── BOTTOM ZONE ── project info card ─────────────────────────── */}
          <div className="w-full max-w-2xl px-4 pb-[14vh] pointer-events-auto">
            <div
              ref={cardRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-black/65 border border-white/[0.1] p-5 md:p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col gap-3">
                <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
                <div className="border-l-2 border-cyan-400 pl-3 text-xs text-cyan-200/80">
                  <span className="font-semibold">Impact:</span> {project.impact}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t=>(
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/80">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={project.repo} target="_blank" rel="noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                    Repository <ArrowUpRight size={13}/>
                  </a>
                  {hasDocs(project)&&(
                    <a href={project.docs} target="_blank" rel="noreferrer"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10">
                      Docs <BookOpen size={13}/>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          ref={scrollProgressRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4"
          style={{visibility:'hidden'}}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">SCROLL</span>
          <div className="w-32 h-px bg-white/10 overflow-hidden">
            <div className="h-full bg-cyan-400/80" style={{width:`${scrollProgress*100}%`,transition:'width 100ms linear'}}/>
          </div>
          <span className="text-[10px] font-semibold text-cyan-400 tabular-nums">
            {String(currentSection+1).padStart(2,'0')} / {String(PROJECTS.length).padStart(2,'0')}
          </span>
        </div>
      </div>
    </div>
  );
};
