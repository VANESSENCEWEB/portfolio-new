
  /* ── Video Preloader Control ─────────────────────────────────── */
  let fontsReady = false;
  let videoDone = false;
  
  function checkStartApp() {
    if (fontsReady && videoDone) {
      document.dispatchEvent(new Event('startAppAnimations'));
    }
  }

  document.fonts.ready.then(() => {
    fontsReady = true;
    checkStartApp();
  });

  const ivw = document.getElementById('intro-video-wrapper');
  const iv = document.getElementById('intro-video');
  const sv = document.getElementById('skip-video');
  
  function finishVideo() {
    if(videoDone) return;
    videoDone = true;
    if(ivw) {
      ivw.style.opacity = '0';
      ivw.style.pointerEvents = 'none';
      setTimeout(() => ivw.remove(), 600);
    }
    checkStartApp();
  }

  if (iv) {
    iv.addEventListener('ended', finishVideo);
    if(sv) sv.addEventListener('click', finishVideo);
    iv.addEventListener('error', finishVideo);
    let playPromise = iv.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => finishVideo());
    }
  } else {
    finishVideo();
  }

  /* ── I18N ─────────────────────────────────────────────────────── */
  const TR={
    pt:{
      'nav-srv':'Serviços','nav-abt':'Sobre','nav-wrk':'Projetos',
      'nav-prc':'Processo','nav-ctc':'Contato','nav-cta':'Iniciar Projeto',
      'hero-tag':'Design & Desenvolvimento Web',
      'hero-cta1':'Ver Projetos','hero-cta2':'Falar Comigo',
      'copy-cat':'Portfólio · 2024',
      'copy-hl':'Do esboço ao ar.\nUma pessoa.\nProjeto completo.',
      'copy-body':'Sites modernos, responsivos e rápidos — construídos por uma designer-desenvolvedora que entrega o projeto inteiro, do escopo visual ao código em produção.',
      'f1a':'Design + Código','f1b':'no mesmo projeto, sem handoff',
      'f2a':'Responsivo por padrão','f2b':'mobile, tablet e desktop',
      'f3a':'Escopo → Entrega','f3b':'do briefing ao lançamento',
      'f4a':'Tecnologia real','f4b':'React, Next.js, Figma, Webflow',
      'note1':'Sem a burocracia de agências. Sem a qualidade duvidosa de genéricos.',
      'note2':'Atenção dedicada. Resultado que impressiona.',
      'scroll-hint':'Role',
      'stat1':'Certificações','stat2':'Empresa Registrada','stat3':'Responsivo','stat4':'Estudo Contínuo',
      'srv-cat':'Serviços','srv-title':'O que entrego',
      'c1t':'Design de Interface','c1b':'Wireframes, protótipos interativos no Figma e sistemas de design que guiam o desenvolvimento.',
      'c2t':'Desenvolvimento Web','c2b':'Código limpo, performático e acessível — do HTML semântico ao React com interações sofisticadas.',
      'c3t':'Projeto Completo','c3b':'Do briefing ao lançamento: escopo, design, desenvolvimento e gestão em uma única mão.',
    },
    en:{
      'nav-srv':'Services','nav-abt':'About','nav-wrk':'Work',
      'nav-prc':'Process','nav-ctc':'Contact','nav-cta':'Start Project',
      'hero-tag':'Design & Web Development',
      'hero-cta1':'View Projects','hero-cta2':'Let\'s Talk',
      'copy-cat':'Portfolio · 2024',
      'copy-hl':'From sketch to live.\nOne person.\nFull project.',
      'copy-body':'Modern, responsive and fast websites — built by a designer-developer who delivers the whole project, from visual scope to production code.',
      'f1a':'Design + Code','f1b':'same project, no handoff',
      'f2a':'Responsive by default','f2b':'mobile, tablet and desktop',
      'f3a':'Scope → Delivery','f3b':'from briefing to launch',
      'f4a':'Real technology','f4b':'React, Next.js, Figma, Webflow',
      'note1':'No agency bureaucracy. No questionable generic quality.',
      'note2':'Dedicated attention. Results that impress.',
      'scroll-hint':'Scroll',
      'stat1':'Certifications','stat2':'UK Registered','stat3':'Responsive','stat4':'Continuous Learning',
      'srv-cat':'Services','srv-title':'What I deliver',
      'c1t':'Interface Design','c1b':'Wireframes, interactive Figma prototypes and design systems that guide development.',
      'c2t':'Web Development','c2b':'Clean, performant and accessible code — from semantic HTML to React with sophisticated interactions.',
      'c3t':'Full Project','c3b':'From briefing to launch: scope, design, development and management in a single hand.',
    }
  };
  let lang='pt';
  function applyLang(l){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n');
      if(TR[l]?.[k]!=null)el.textContent=TR[l][k];
    });
    document.documentElement.lang=l==='pt'?'pt-BR':'en';
  }
  function toggleLang(){
    lang=lang==='pt'?'en':'pt';
    const n=lang==='pt'?'EN':'PT';
    ['llbl-d','llbl-m'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=n;});
    applyLang(lang);
  }
  document.getElementById('ltog-d')?.addEventListener('click',toggleLang);
  document.getElementById('ltog-m')?.addEventListener('click',toggleLang);
  applyLang('pt');

  /* ── Dark/Light ─────────────────────────────────────────────── */
  const SUN ='<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  const MOON='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  let dark=true;
  function applyTheme(d){
    document.documentElement.setAttribute('data-theme',d?'dark':'light');
    ['ticon-d','ticon-m'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML=d?SUN:MOON;});
    ['tlbl-d','tlbl-m'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=d?'Dark':'Light';});
    if(window._AES){const bg=d?0x070711:0xeef2ff;window._AES.background=new THREE.Color(bg);window._AES.fog.color.set(bg);}
  }
  ['ttog-d','ttog-m'].forEach(id=>{document.getElementById(id)?.addEventListener('click',()=>{dark=!dark;applyTheme(dark);});});
  applyTheme(true);

  /* ── Color Switcher ────────────────────────────────────────── */
  const PAL={
    cyan :{hex:'#00d4ff',rgb:'0,212,255',   hot:'#80eaff',glow:'rgba(0,212,255,.55)',mid:'rgba(0,212,255,.30)',faint:'rgba(0,212,255,.08)',light:0x00d4ff},
    green:{hex:'#00ff88',rgb:'0,255,136',   hot:'#80ffc0',glow:'rgba(0,255,136,.55)',mid:'rgba(0,255,136,.28)',faint:'rgba(0,255,136,.07)',light:0x00ff88},
    pink :{hex:'#ff2d78',rgb:'255,45,120',  hot:'#ff80aa',glow:'rgba(255,45,120,.55)',mid:'rgba(255,45,120,.28)',faint:'rgba(255,45,120,.07)',light:0xff2d78},
    pride:{hex:'#ff8800',rgb:'255,136,0',   hot:'#ffbb55',glow:'rgba(255,136,0,.55)', mid:'rgba(255,136,0,.28)', faint:'rgba(255,136,0,.07)', light:0xff6600},
  };
  function applyColor(n){
    const p=PAL[n],r=document.documentElement;
    r.style.setProperty('--accent',p.hex);
    r.style.setProperty('--accent-rgb',p.rgb);
    r.style.setProperty('--accent-hot',p.hot);
    r.style.setProperty('--accent-glow',p.glow);
    r.style.setProperty('--accent-mid',p.mid);
    r.style.setProperty('--accent-faint',p.faint);
    document.body.classList.toggle('pride',n==='pride');
    if(window._AELight)window._AELight.color.set(p.light);
    document.querySelectorAll('.sw-d').forEach(b=>b.classList.toggle('on',b.dataset.color===n));
  }
  document.querySelectorAll('.sw-d').forEach(b=>b.addEventListener('click',()=>applyColor(b.dataset.color)));

  /* ── Menu Mobile ───────────────────────────────────────────── */
  const ham=document.getElementById('hambtn'),mm=document.getElementById('mmenu'),mo=document.getElementById('movl'),mc=document.getElementById('mclose');
  const openM=()=>{mm.classList.add('open');mo.classList.add('open');ham.classList.add('open');ham.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';};
  const closeM=()=>{mm.classList.remove('open');mo.classList.remove('open');ham.classList.remove('open');ham.setAttribute('aria-expanded','false');document.body.style.overflow='';};
  ham?.addEventListener('click',openM);mc?.addEventListener('click',closeM);mo?.addEventListener('click',closeM);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM();});
  mm?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeM));

  /* ── Navbar scroll ─────────────────────────────────────────── */
  const navEl=document.getElementById('nav');
  window.addEventListener('scroll',()=>navEl.classList.toggle('sc',window.scrollY>60),{passive:true});

  /* ── Cursor ────────────────────────────────────────────────── */
  const cdot=document.getElementById('cdot'),cring=document.getElementById('cring');
  if(window.matchMedia('(pointer:fine)').matches){
    document.body.classList.add('no-cur');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cdot.style.left=mx+'px';cdot.style.top=my+'px';});
    (function rl(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;cring.style.left=rx+'px';cring.style.top=ry+'px';requestAnimationFrame(rl);})();
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cring.classList.add('hov'));el.addEventListener('mouseleave',()=>cring.classList.remove('hov'));});
  } else { cdot.style.display='none';cring.style.display='none'; }

  /* ── Smooth scroll ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});});

  /* ==============================================================
     THREE.JS — Globo
     Porta exata do aether-globe-hero.html:
       • 128 segmentos por linha
       • Materiais: equator / prim / sec / faint
       • 600 partículas de superfície (PointsMaterial)
       • Core sphere (profundidade)
       • Atmosfera (BackSide)
       • 2 anéis orbitais (Torus, rotação independente)
       • GSAP entry: escala 0.25 → 1
       • Mouse parallax lerp
       • Globe desloca para cima/esq no desktop
     ============================================================== */
  (function initGlobe(){

    const canvas=document.getElementById('globe-canvas');
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(window.innerWidth,window.innerHeight);

    const scene=new THREE.Scene();
    scene.background=new THREE.Color(0x070711);
    scene.fog=new THREE.FogExp2(0x070711,.055);
    window._AES=scene;

    const camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,.1,120);
    camera.position.z=5.5;

    const globeGroup=new THREE.Group();
    scene.add(globeGroup);
    const R=2.0,SEG=128;

    /* Materiais (porta exata do arquivo de referência) */
    const matPrim   =new THREE.LineBasicMaterial({color:0x00d4ff,transparent:true,opacity:.50});
    const matSec    =new THREE.LineBasicMaterial({color:0x003d66,transparent:true,opacity:.28});
    const matFaint  =new THREE.LineBasicMaterial({color:0x001a33,transparent:true,opacity:.18});
    const matEquator=new THREE.LineBasicMaterial({color:0x00d4ff,transparent:true,opacity:.85});

    function makeLatLine(latDeg,mat){
      const latRad=latDeg*Math.PI/180,circR=Math.cos(latRad)*R,y=Math.sin(latRad)*R;
      const pts=[];
      for(let i=0;i<=SEG;i++){const a=(i/SEG)*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(a)*circR,y,Math.sin(a)*circR));}
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),mat));
    }

    function makeLonLine(lonDeg,mat){
      const lonRad=lonDeg*Math.PI/180,pts=[];
      for(let i=0;i<=SEG;i++){const lat=-90+(i/SEG)*180,latRad=lat*Math.PI/180;pts.push(new THREE.Vector3(Math.cos(latRad)*Math.cos(lonRad)*R,Math.sin(latRad)*R,Math.cos(latRad)*Math.sin(lonRad)*R));}
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),mat));
    }

    /* Paralelos */
    makeLatLine(0,matEquator);
    [-66.5,-23.5,23.5,66.5].forEach(lat=>makeLatLine(lat,matPrim));
    for(let lat=-80;lat<=80;lat+=10){if(![0,-66.5,-23.5,23.5,66.5].includes(lat))makeLatLine(lat,Math.abs(lat)%20===0?matSec:matFaint);}

    /* Meridianos */
    makeLonLine(0,matPrim);makeLonLine(90,matPrim);makeLonLine(180,matPrim);makeLonLine(270,matPrim);
    for(let lon=0;lon<360;lon+=10){if(lon%90!==0)makeLonLine(lon,lon%20===0?matSec:matFaint);}

    /* Atmosfera */
    const atmMesh=new THREE.Mesh(new THREE.SphereGeometry(R*1.18,48,48),new THREE.MeshBasicMaterial({color:0x00d4ff,transparent:true,opacity:.05,side:THREE.BackSide}));
    globeGroup.add(atmMesh);

    /* Core (cria profundidade / ilusão de solidez) */
    const coreMesh=new THREE.Mesh(new THREE.SphereGeometry(R*.96,32,32),new THREE.MeshBasicMaterial({color:0x010108,transparent:true,opacity:.75}));
    globeGroup.add(coreMesh);

    /* 600 partículas de superfície */
    const NPART=600;
    const partPos=new Float32Array(NPART*3);
    for(let i=0;i<NPART;i++){
      const phi=Math.acos(-1+2*Math.random()),theta=Math.random()*Math.PI*2,r=R+Math.random()*.04;
      partPos[i*3]=Math.sin(phi)*Math.cos(theta)*r;
      partPos[i*3+1]=Math.cos(phi)*r;
      partPos[i*3+2]=Math.sin(phi)*Math.sin(theta)*r;
    }
    const partGeo=new THREE.BufferGeometry();
    partGeo.setAttribute('position',new THREE.BufferAttribute(partPos,3));
    globeGroup.add(new THREE.Points(partGeo,new THREE.PointsMaterial({color:0x00d4ff,size:.024,transparent:true,opacity:.70,sizeAttenuation:true})));

    /* Anel orbital 1 (inclinado, gira rápido) */
    const ringMesh=new THREE.Mesh(new THREE.TorusGeometry(R*1.40,.006,2,200),new THREE.MeshBasicMaterial({color:0x00d4ff,transparent:true,opacity:.20}));
    ringMesh.rotation.x=Math.PI*.10; scene.add(ringMesh);
    window._AELight=new THREE.PointLight(0x00d4ff,1,15); /* luz ciano — usada pelo color switcher */ scene.add(window._AELight);

    /* Anel orbital 2 (mais inclinado, gira devagar) */
    const ring2Mesh=new THREE.Mesh(new THREE.TorusGeometry(R*1.72,.004,2,200),new THREE.MeshBasicMaterial({color:0x004488,transparent:true,opacity:.12}));
    ring2Mesh.rotation.x=Math.PI*.35; ring2Mesh.rotation.y=Math.PI*.2; scene.add(ring2Mesh);

    /* Mouse tracking */
    let tMX=0,tMY=0,cMX=0,cMY=0;
    window.addEventListener('mousemove',e=>{tMX=(e.clientX/window.innerWidth-.5)*.55;tMY=(e.clientY/window.innerHeight-.5)*.38;});

    /* Posição do globo: desktop→esquerda+acima(pequeno), mobile→centro(normal) */
    let tGX=0,tGY=0,cGX=0,cGY=0,tGS=1,cGS=0.25;
    function updateGlobeTarget(){
      if(window.innerWidth>=900){tGX=-1.8; tGY=.6; tGS=0.8;}
      else {tGX=0; tGY=.4; tGS=1;}
    }
    updateGlobeTarget();
    updateGlobeTarget();
    window.addEventListener('resize',updateGlobeTarget);

    const clock=new THREE.Clock();
    function animate(){
      requestAnimationFrame(animate);
      const t=clock.getElapsedTime();
      cMX+=(tMX-cMX)*.032; cMY+=(tMY-cMY)*.032;

      /* Rotação do globo */
      globeGroup.rotation.y=t*.075+cMX;
      globeGroup.rotation.x=cMY*.45;

      /* Anéis: rotações independentes */
      ringMesh.rotation.z=t*.06;
      ring2Mesh.rotation.z=-t*.04;

      /* Pulso da atmosfera */
      atmMesh.scale.setScalar(1+Math.sin(t*.5)*.012);

      /* Pulso do core */
      coreMesh.material.opacity=.68+Math.sin(t*.35)*.07;

      /* Posição e escala do globo (lerp) */
      cGX+=(tGX-cGX)*.04; cGY+=(tGY-cGY)*.04; cGS+=(tGS-cGS)*.04;
      globeGroup.position.x=cGX; globeGroup.position.y=cGY;
      globeGroup.scale.setScalar(cGS);

      /* Anéis acompanham a posição */
      ringMesh.position.x=cGX*.9; ringMesh.position.y=cGY*.8;
      ring2Mesh.position.x=cGX*.8; ring2Mesh.position.y=cGY*.6;

      /* Luz acompanha o globo */
      window._AELight.position.set(cGX+Math.cos(t*.3)*3,cGY+Math.sin(t*.4)*2,3);

      camera.lookAt(0,0,0);
      renderer.render(scene,camera);
    }
    animate();

    /* Ao carregar a página: globo surge dinamicamente das sombras */
    globeGroup.rotation.y=-Math.PI*.4;
    document.addEventListener('startAppAnimations', () => {
      /* Nós removemos a sobreposição estática de escala porque ele é controlado via cGS lerp.  
         Sinta a animação fluindo naturalmente pelo requestAnimationFrame! */
      gsap.from(canvas,{opacity:0,duration:1.2,ease:'power2.out'});
    });

    window.addEventListener('resize',()=>{
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth,window.innerHeight);
    });

  })();

  /* ==============================================================
     LASER SYSTEM — letra a letra, 2 linhas sequenciais
     Baseado no aether-globe-hero.html, mas disparado no load
     ============================================================== */
  (function initLaser(){

    const TEXT1='PROJETAMOS';
    const TEXT2='O IMATERIAL';
    const ACC2 =TEXT2.indexOf('IMATERIAL'); // índice onde começa o destaque

    const hl1=document.getElementById('lhl1'), lb1=document.getElementById('lb1'), lt1=document.getElementById('lt1');
    const hl2=document.getElementById('lhl2'), lb2=document.getElementById('lb2'), lt2=document.getElementById('lt2');
    const block=document.getElementById('laser-block');
    const hTag=document.getElementById('h-tag');
    const hBtns=document.getElementById('h-btns');
    const shint=document.getElementById('scroll-hint');

    /* Injeta letras como spans individuais */
    function injectSpans(headline,beam,trace,text,accentStart){
      const spans=[];
      [...text].forEach((ch,i)=>{
        const span=document.createElement('span');
        if(ch===' '){span.className='ltr is-space';span.textContent='\u00A0';}
        else{
          span.className='ltr';
          span.textContent=ch;
          if(accentStart!=null&&i>=accentStart)span.classList.add('is-accent');
        }
        headline.insertBefore(span,beam);
        spans.push(span);
      });
      return spans;
    }

    const spans1=injectSpans(hl1,lb1,lt1,TEXT1,null);
    const spans2=injectSpans(hl2,lb2,lt2,TEXT2,ACC2);

    /* Medição das posições das letras */
    let centers1=[],w1=0,centers2=[],w2=0;
    function measure(){
      const r1=hl1.getBoundingClientRect();w1=r1.width;
      centers1=spans1.map(s=>{const r=s.getBoundingClientRect();return r.left-r1.left+r.width*.5;});
      const r2=hl2.getBoundingClientRect();w2=r2.width;
      centers2=spans2.map(s=>{const r=s.getBoundingClientRect();return r.left-r2.left+r.width*.5;});
    }
    window.addEventListener('resize',measure);

    /* Anima um beam varrendo uma linha */
    function sweepLine(beam,trace,spans,getW,getCenters,duration,onDone){
      const revealed=new Array(spans.length).fill(false);
      const t0=performance.now();
      const OVERSHOOT=28;

      beam.style.opacity='1';

      function frame(){
        const p=Math.min((performance.now()-t0)/duration,1);
        const bx=-OVERSHOOT+p*(getW()+OVERSHOOT*2);

        beam.style.left=bx+'px';
        trace.style.opacity='0.9';
        trace.style.width=Math.max(0,bx+OVERSHOOT)+'px';

        getCenters().forEach((center,i)=>{
          if(spans[i].classList.contains('is-space'))return;
          if(!revealed[i]&&bx>=center){
            revealed[i]=true;
            spans[i].style.opacity='1';
            spans[i].classList.add('flash');
            setTimeout(()=>spans[i].classList.remove('flash'),350);
          }
        });

        if(p<1){requestAnimationFrame(frame);}
        else{
          /* Garante todas reveladas */
          spans.forEach((s,i)=>{if(!revealed[i]&&!s.classList.contains('is-space')){revealed[i]=true;s.style.opacity='1';}});
          /* Beam e trace desaparecem */
          gsap.to([beam,trace],{opacity:0,duration:.35,ease:'power2.in',onComplete:onDone});
        }
      }
      requestAnimationFrame(frame);
    }

    /* Função pós-reveal: mostra botões, coluna direita, scroll hint */
    function afterReveal(){
      gsap.to('#h-btns',{opacity:1,y:0,duration:.6,ease:'power3.out'});
      gsap.to('.hr-item',{opacity:1,y:0,stagger:.1,duration:.5,ease:'power2.out',delay:.1});
      gsap.to(shint,{opacity:1,duration:.5,delay:.35});

      /* ScrollTrigger para os cards da seção de serviços */
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.card').forEach((card,i)=>{
        ScrollTrigger.create({
          trigger:card, start:'top 85%',
          onEnter:()=>gsap.to(card,{opacity:1,y:0,duration:.6,delay:i*.08,ease:'power3.out',
            css:{animation:'cardFadeUp .6s ease both'}})
        });
        card.style.opacity='0'; card.style.transform='translateY(24px)';
      });

      /* Stats strip */
      gsap.utils.toArray('.stat-item').forEach((el,i)=>{
        ScrollTrigger.create({trigger:el,start:'top 90%',onEnter:()=>gsap.to(el,{opacity:1,y:0,duration:.5,delay:i*.07,ease:'power2.out'})});
        el.style.opacity='0'; el.style.transform='translateY(16px)';
      });
    }

    /* Dispara após fontes carregadas e fim do preloader */
    document.addEventListener('startAppAnimations', () => {
      measure();
      /* Tag label aparece primeiro */
      gsap.to(hTag,{opacity:1,duration:.4,ease:'power2.out',delay:.8});
      /* Bloco aparece */
      setTimeout(()=>{
        block.style.opacity='1';
        /* Linha 1 */
        sweepLine(lb1,lt1,spans1,()=>w1,()=>centers1,1200,()=>{
          /* 150ms de pausa → Linha 2 */
          setTimeout(()=>{
            sweepLine(lb2,lt2,spans2,()=>w2,()=>centers2,1500,()=>{
              afterReveal();
            });
          },150);
        });
      },1000);
    });

  })(); /* fecha (function initLaser(){...})() */

  /* ==============================================================
     CERTIFICADOS — Sistema atualizado com IntersectionObserver e Filtros Integrados
     ============================================================== */
  (function initCerts(){

    const driver    = document.getElementById('certs-driver');
    if(!driver) return;

    const platList  = document.getElementById('plat-list');
    const skillList = document.getElementById('skill-list');
    const gridLabel = document.getElementById('grid-label');
    const gridCount = document.getElementById('grid-count');

    const allBadges = Array.from(document.querySelectorAll('.badge-card'));
    const allRows   = Array.from(document.querySelectorAll('.cert-row'));

    /* Intersection Observer para exibir os itens (resolve o scroll bug) */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observa todos os itens que devem animar no scroll
    [...allBadges, ...allRows].forEach(item => {
      // Pequeno delay via CSS baseado no index já é tratado pelo IntersectionObserver
      revealObserver.observe(item);
    });

    /* ── Filtro Multidimensional (Plataforma + Habilidade) ───────── */
    function getActiveFilters(){
      return {
        plat: platList?.querySelector('.filter-pill.active')?.dataset.filter || 'all',
        skill: skillList?.querySelector('.filter-pill.active')?.dataset.filter || 'all'
      };
    }

    function applyFilter(){
      const f = getActiveFilters();
      let visibleBadges = 0;

      const checkMatch = (el) => {
        const platMatch = (f.plat === 'all' || el.dataset.plat === f.plat);
        const skillMatch = (f.skill === 'all' || el.dataset.skill === f.skill);
        return platMatch && skillMatch;
      };

      /* Atualiza Badges */
      allBadges.forEach(b => {
        const show = checkMatch(b);
        b.style.display = show ? '' : 'none';
        if(show){
           visibleBadges++;
           // Reroda a animação de reveal
           b.classList.remove('revealed');
           revealObserver.observe(b);
        }
      });

      /* Atualiza Rows */
      allRows.forEach(r => {
        const show = checkMatch(r);
        r.style.display = show ? '' : 'none';
        if(show) {
           r.classList.remove('revealed');
           revealObserver.observe(r);
        }
      });

      /* Atualiza Header do Grid */
      let labelText = 'Badges';
      if(f.plat !== 'all') labelText += ' · ' + f.plat;
      if(f.skill !== 'all') labelText += ' · ' + document.querySelector(`#skill-list [data-filter="${f.skill}"]`).textContent;
      if(f.plat === 'all' && f.skill === 'all') labelText = 'Todos os Badges';
      
      gridLabel.textContent = labelText;
      gridCount.textContent = visibleBadges + (visibleBadges === 1 ? ' item' : ' itens');
    }

    /* Event Listeners para os botões de filtro */
    function setupFilterClick(container) {
      if(!container) return;
      container.addEventListener('click', e => {
        const pill = e.target.closest('.filter-pill');
        if(!pill) return;
        
        container.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
        
        applyFilter();
      });
    }

    setupFilterClick(platList);
    setupFilterClick(skillList);

    /* ── Dinâmica do Contador Animado ────────────────────────────── */
    const counterNum = document.getElementById('counter-num');
    const TOTAL_CERTS = allBadges.length + allRows.length; // Ou cravado 61
    let counted = false;

    if(counterNum) {
      const counterObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !counted) {
          counted = true;
          let current = 0;
          let it = 0;
          const maxIt = 50; // frames
          const intv = setInterval(() => {
            current += (TOTAL_CERTS - current) * 0.1;
            it++;
            if(it >= maxIt) {
              counterNum.textContent = TOTAL_CERTS;
              clearInterval(intv);
            } else {
              counterNum.textContent = Math.round(current);
            }
            counterNum.style.textShadow = `0 0 30px rgba(var(--accent-rgb),.75),0 0 70px rgba(var(--accent-rgb),.3)`;
          }, 30);
          
          setTimeout(() => { counterNum.style.textShadow = ''; }, 1800);
          counterObserver.disconnect();
        }
      }, { threshold: 0.5 });
      counterObserver.observe(counterNum);
    }

    /* ── Acordeão "Ver Mais" Certificados ────────────────────────── */
    const btnExpand = document.getElementById('btn-cert-expand');
    const certRowsContainer = document.getElementById('cert-rows');

    if(btnExpand && certRowsContainer) {
      btnExpand.addEventListener('click', () => {
        const isExpanded = certRowsContainer.classList.contains('expanded');
        
        if(!isExpanded) {
          certRowsContainer.classList.add('expanded');
          btnExpand.innerHTML = '<span style="margin-right: 8px">▲</span> OCULTAR CERTIFICADOS';
          // Dispara as animações dos elementos novos na tela caindo
          Array.from(certRowsContainer.children).forEach(el => revealObserver.observe(el));
        } else {
          certRowsContainer.classList.remove('expanded');
          btnExpand.innerHTML = '<span style="margin-right: 8px">▼</span> VER TODOS OS CERTIFICADOS';
          // Descer suavemente para ocultar visualmente com estabilidade
          document.getElementById('grid-label').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
    /* ── Briefing Form Logic ───────────────────────────────────── */
    const NUMERO_WHATSAPP = "5581996601178";
    
    window.isValidEmail = function(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

    window.validarEtapa1 = function() {
      const nome     = document.getElementById('nome').value.trim();
      const email    = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim().replace(/\D/g, '');
      const btn = document.getElementById('btn1');
      if(btn) btn.disabled = !(nome.length >= 3 && isValidEmail(email) && telefone.length >= 9 && telefone.length <= 13);
    }
    
    window.validarEtapa2 = function() {
      const proj = document.getElementById('projeto').value.trim();
      const btn = document.getElementById('btn2');
      if(btn) btn.disabled = proj.length < 5;
    }

    window.validarEtapa3 = function() {
      const pag = document.getElementById('paginas').value.trim();
      const btn = document.getElementById('btn3');
      if(btn) btn.disabled = pag.length < 5;
    }

    window.irEtapa = function(n) {
      document.querySelectorAll('.etapa').forEach(e => {
        e.style.display = 'none';
        e.style.opacity = '0';
      });
      const alvo = document.getElementById('etapa-' + n);
      if(alvo) {
        alvo.style.display = 'block';
        setTimeout(() => { alvo.style.opacity = '1'; alvo.style.transition = 'opacity 0.4s'; }, 10);
      }
      if (n === 5) window.montarPreview();
    }

    window.montarPreview = function() {
      const nome      = document.getElementById('nome').value.trim();
      const email     = document.getElementById('email').value.trim();
      const telefone  = document.getElementById('telefone').value.trim();
      const projeto   = document.getElementById('projeto').value.trim();
      const negocio   = document.getElementById('negocio').value.trim() || 'Não informado';
      const paginas   = document.getElementById('paginas').value.trim();
      const tipo      = document.getElementById('tipoSite').value || 'Não selecionado';
      const cores     = document.getElementById('cores').value.trim() || 'Sem preferência';
      const estilo    = document.getElementById('estilo').value.trim() || 'Sem preferência';
      const refs      = document.getElementById('referencias').value.trim() || 'Nenhuma';

      const rb = document.getElementById('review-box');
      if(rb) rb.innerHTML = `
          <div class="review-row"><div class="review-label">Nome</div><div class="review-value">${nome}</div></div>
          <div class="review-row"><div class="review-label">E-mail</div><div class="review-value">${email}</div></div>
          <div class="review-row"><div class="review-label">WhatsApp</div><div class="review-value">${telefone}</div></div>
          <div class="review-row"><div class="review-label">Negócio</div><div class="review-value">${negocio}</div></div>
          <div class="review-row"><div class="review-label">Projeto</div><div class="review-value">${projeto}</div></div>
          <div class="review-row"><div class="review-label">Páginas</div><div class="review-value">${paginas}</div></div>
          <div class="review-row"><div class="review-label">Estilo / Design</div><div class="review-value">${tipo} · ${cores} · ${estilo}</div></div>
      `;

      const msg = `Olá Vanessa! Gostaria de falar sobre o desenvolvimento do meu site com você em Londres.\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*WhatsApp:* ${telefone}\n*Negócio/Empresa:* ${negocio}\n\n*Sobre o projeto:* ${projeto}\n*Tipo de site/sistema:* ${tipo}\n*Páginas principais:* ${paginas}\n\n*Métricas de Design:*\nEstética: ${cores} | ${estilo}\nReferência: ${refs}\n\nAguardo seu retorno!`;
      const mp = document.getElementById('msg-preview');
      if(mp) mp.textContent = msg;
    }

    window.enviarWhatsApp = function() {
      const msg = document.getElementById('msg-preview').textContent;
      const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      irEtapa(6);
    }

    /* ── Timeline Scroll Progress (Processo) ── */
    const procContainer = document.querySelector('.proc-container');
    const procSteps = document.querySelectorAll('.proc-step');
    const procLineFill = document.querySelector('.proc-line-fill');
    
    if(procContainer && procLineFill && procSteps.length) {
      window.addEventListener('scroll', () => {
        const rect = procContainer.getBoundingClientRect();
        // Dispara quando o topo começa a entrar em cerca de 75% da altura da tela
        const triggerPoint = window.innerHeight * 0.75; 
        
        let progress = 0;
        if (rect.top <= triggerPoint) {
           // O progresso maximo é quando a altura que passou o trigger for
           // o tamanho total do container
           progress = (triggerPoint - rect.top) / rect.height;
           progress = Math.min(1, Math.max(0, progress));
        }
        
        procLineFill.style.height = (progress * 100) + '%';
        
        procSteps.forEach((step) => {
          // offseop é relativo ao container
          const stepRatio = step.offsetTop / rect.height;
          // Subtrai-se um pequeno offset para a luz chegar ligeiramente depois da linha tocar
          if (progress >= stepRatio - 0.05) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }, { passive: true });
    }

  })();
  
