// Technofys EdTech - First-Principles 3D Architectural Engine (Pure 60 FPS Motion)

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // -------------------------------------------------------------
  // 1. MAGNETIC BUTTONS & 3D SPATIAL TILT PHYSICS (GPU Accelerated)
  // -------------------------------------------------------------
  const magneticBtns = document.querySelectorAll('.emerald-primary-btn');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });

  // Interactive 3D Spatial Mouse-Tilt Handler
  function init3DTiltEffects() {
    const tiltCards = document.querySelectorAll('.glass-card-3d, .tech-tile-3d, .campus-showcase-panel');
    
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((cardY - centerY) / centerY) * -8;
        const rotateY = ((cardX - centerX) / centerX) * 8;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -6px, 15px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      });
    });
  }

  init3DTiltEffects();

  // -------------------------------------------------------------
  // 2. 150 HERO CANVAS FRAME PRELOADER & OPTIMIZED ZERO-MATH SCRUBBING
  // -------------------------------------------------------------
  const frameCount = 150;
  const frames = [];
  
  let targetFrame = 0;
  let smoothFrame = 0;
  let lastDrawnFrame = -1;

  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false, desynchronized: true }) : null;
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');

  let loadedImages = 0;

  let drawWidth = 0;
  let drawHeight = 0;
  let offsetX = 0;
  let offsetY = 0;

  function getFrameUrl(index) {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `./ezgif-455a6afff32bca01-png-split/ezgif-frame-${frameNumber}.png`;
  }

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);

    img.onload = () => {
      loadedImages++;
      const progress = Math.round((loadedImages / frameCount) * 100);
      if (loaderBar) loaderBar.style.width = `${progress}%`;
      if (loaderText) loaderText.innerText = `${progress}%`;

      if (loadedImages === frameCount) {
        onPreloadComplete();
      }
    };

    img.onerror = () => {
      loadedImages++;
      if (loadedImages === frameCount) {
        onPreloadComplete();
      }
    };

    frames.push(img);
  }

  function onPreloadComplete() {
    setTimeout(() => {
      if (loader) {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
      }
      resizeCanvas();
      renderCanvasFrame(0);
      init60FPSLerpLoop();
      initGSAPAnimations();

      setTimeout(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }, 200);
    }, 150);
  }

  function resizeCanvas() {
    if (!canvas || !frames[0] || !frames[0].width) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    if (ctx) ctx.scale(dpr, dpr);

    const img = frames[0];
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    lastDrawnFrame = -1;
  }

  window.addEventListener('resize', resizeCanvas);

  function renderCanvasFrame(index) {
    if (!ctx || !canvas || !frames[index] || !frames[index].complete) return;
    ctx.drawImage(frames[index], offsetX, offsetY, drawWidth, drawHeight);
  }

  function init60FPSLerpLoop() {
    function renderLoop() {
      smoothFrame += (targetFrame - smoothFrame) * 0.35;
      const currentIntFrame = Math.min(frameCount - 1, Math.max(0, Math.round(smoothFrame)));

      if (currentIntFrame !== lastDrawnFrame) {
        renderCanvasFrame(currentIntFrame);
        lastDrawnFrame = currentIntFrame;
      }

      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
  }

  // -------------------------------------------------------------
  // 3. LENIS SMOOTH SCROLL INTEGRATION
  // -------------------------------------------------------------
  let lenis;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', () => {
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    });
  }

  // -------------------------------------------------------------
  // 4. 3D DIGITAL LEARNING CORE ENGINE & CANVAS RENDERER
  // -------------------------------------------------------------
  const coreModulesData = [
    {
      badge: 'Capability 01 of 07',
      title: 'Moodle LMS Enterprise Cluster',
      desc: 'Branded enterprise Moodle deployments, campus SIS integrations, automated role permissions, and high-concurrency exam engines.',
      metric: '50,000+ Active Seats',
      tag: 'Architecture Capability'
    },
    {
      badge: 'Capability 02 of 07',
      title: 'AI Learning & Voiceover Synthesis',
      desc: 'Automated AI voiceovers, avatar video generation, and instant multi-language course translation across 6 global languages.',
      metric: '6 Global Languages',
      tag: 'AI Synthesis Core'
    },
    {
      badge: 'Capability 03 of 07',
      title: 'Instructional Design Architecture',
      desc: 'Pedagogical storyboarding, SME curriculum mapping, learning outcome alignment, and SCORM/xAPI packaging.',
      metric: '100% Outcome Alignment',
      tag: 'Curriculum Architecture'
    },
    {
      badge: 'Capability 04 of 07',
      title: 'H5P Interactive Widget Engine',
      desc: 'Interactive video overlays, drag-and-drop exercises, gamified knowledge checks, and live H5P widget compiler streams.',
      metric: 'Native H5P & xAPI',
      tag: 'Interactive Engine'
    },
    {
      badge: 'Capability 05 of 07',
      title: 'Managed Cloud Infrastructure',
      desc: 'High-concurrency AWS hosting, automated Kubernetes backups, 24/7 SLA monitoring, and guaranteed 99.9% uptime.',
      metric: '99.9% Guaranteed SLA',
      tag: 'Cloud Infrastructure'
    },
    {
      badge: 'Capability 06 of 07',
      title: 'Real-Time Telemetry & Analytics',
      desc: 'xAPI/LTI learner completion telemetry, drop-off analytics, executive gradebook exports, and automated exam grading.',
      metric: 'Real-Time xAPI Streams',
      tag: 'Telemetry Analytics'
    },
    {
      badge: 'Capability 07 of 07',
      title: 'Corporate Academies & CEU Hubs',
      desc: 'Multi-tenant enterprise portals, employee onboarding pipelines, automated CEU badge issuing, and payment gateways.',
      metric: 'Multi-Tenant Portals',
      tag: 'Enterprise Academies'
    }
  ];

  // -------------------------------------------------------------
  // 4. ARCHITECTURAL ECOSYSTEM PLATFORM DATA & INTERACTION LOGIC
  // -------------------------------------------------------------
  const ecosystemNodesData = [
    {
      id: 0,
      badge: 'CENTRAL ENGINE',
      metric: '360° Learning OS',
      title: 'Technofys Core Engine',
      desc: 'Central architectural hub governing real-time xAPI event streams, SSO authentication, tenant routing, and high-concurrency database queries.',
      spec1: 'SCORM 1.2 / xAPI',
      spec2: '50,000+ Active Seats',
      tag: 'SYS.CORE // MASTER'
    },
    {
      id: 1,
      badge: 'LMS INFRASTRUCTURE',
      metric: '50,000+ Active Seats',
      title: 'Moodle Enterprise Cluster',
      desc: 'Branded enterprise Moodle deployments, campus SIS integrations, automated role permissions, and high-concurrency exam engines.',
      spec1: 'Moodle 4.x Enterprise',
      spec2: 'Campus SIS Sync',
      tag: 'MOD.LMS // CLUSTER'
    },
    {
      id: 2,
      badge: 'AI SYNTHESIS LAB',
      metric: '6 Global Languages',
      title: 'AI Studio & Voiceover Synthesis',
      desc: 'Automated AI voiceovers, avatar video generation, and instant multi-language course translation across global markets.',
      spec1: 'Multilingual Audio',
      spec2: 'Avatar Rendering',
      tag: 'AI.LAB // VOICE'
    },
    {
      id: 3,
      badge: 'PEDAGOGY STUDIO',
      metric: '100% Outcome Alignment',
      title: 'Instructional Design Architecture',
      desc: 'Pedagogical storyboarding, SME curriculum mapping, learning outcome alignment, and SCORM/xAPI packaging.',
      spec1: 'Bloom\'s Taxonomy',
      spec2: 'Storyboarding',
      tag: 'PEDAGOGY // STUDIO'
    },
    {
      id: 4,
      badge: 'INTERACTIVE ENGINE',
      metric: 'Native xAPI Events',
      title: 'H5P Interactive Widget Suite',
      desc: 'Interactive video overlays, drag-and-drop exercises, gamified knowledge checks, and live H5P widget streams.',
      spec1: 'H5P & SCORM 2004',
      spec2: 'Live Widgets',
      tag: 'H5P // ENGINE'
    },
    {
      id: 5,
      badge: 'CLOUD OPS',
      metric: '99.9% Guaranteed SLA',
      title: 'Managed Cloud Infrastructure',
      desc: 'High-concurrency AWS hosting, automated Kubernetes backups, 24/7 SLA monitoring, and guaranteed 99.9% uptime.',
      spec1: 'AWS Kubernetes',
      spec2: 'Auto-Scaling',
      tag: 'CLOUD // INFRA'
    },
    {
      id: 6,
      badge: 'TELEMETRY CONTROL',
      metric: 'Real-Time xAPI Radar',
      title: 'Real-Time xAPI & Telemetry',
      desc: 'xAPI/LTI learner completion telemetry, drop-off analytics, executive gradebook exports, and automated exam grading.',
      spec1: 'xAPI Event Stream',
      spec2: 'Gradebook Sync',
      tag: 'TELEMETRY // RADAR'
    },
    {
      id: 7,
      badge: 'ENTERPRISE ACADEMIES',
      metric: 'Multi-Tenant Hubs',
      title: 'Corporate Academies & CEU',
      desc: 'Multi-tenant enterprise portals, employee onboarding pipelines, automated CEU badge issuing, and payment gateways.',
      spec1: 'Multi-Tenant Portal',
      spec2: 'Automated Badging',
      tag: 'ACADEMIES // CORP'
    }
  ];

  function initEcosystemInteractions() {
    const ecoHudBadge = document.getElementById('eco-hud-badge');
    const ecoHudMetric = document.getElementById('eco-hud-metric');
    const ecoHudTitle = document.getElementById('eco-hud-title');
    const ecoHudDesc = document.getElementById('eco-hud-desc');
    const ecoHudSpec1 = document.getElementById('eco-hud-spec1');
    const ecoHudSpec2 = document.getElementById('eco-hud-spec2');
    const ecoHudTag = document.getElementById('eco-hud-tag');
    const ecoHudCard = document.getElementById('eco-hud-card');

    const nodeTriggers = document.querySelectorAll('.eco-node-trigger');
    const ecoPills = document.querySelectorAll('.eco-pill');

    let activeNodeId = -1;

    function activateEcosystemNode(nodeId) {
      if (nodeId === activeNodeId) return;
      activeNodeId = nodeId;
      const data = ecosystemNodesData[nodeId] || ecosystemNodesData[0];

      // Update HUD text with subtle fade
      if (ecoHudCard) {
        ecoHudCard.style.opacity = '0.7';
        ecoHudCard.style.transform = 'translateY(4px)';
        setTimeout(() => {
          if (ecoHudBadge) ecoHudBadge.innerText = data.badge;
          if (ecoHudMetric) ecoHudMetric.innerText = data.metric;
          if (ecoHudTitle) ecoHudTitle.innerText = data.title;
          if (ecoHudDesc) ecoHudDesc.innerText = data.desc;
          if (ecoHudSpec1) ecoHudSpec1.innerText = data.spec1;
          if (ecoHudSpec2) ecoHudSpec2.innerText = data.spec2;
          if (ecoHudTag) ecoHudTag.innerText = data.tag;
          
          ecoHudCard.style.opacity = '1';
          ecoHudCard.style.transform = 'translateY(0)';
        }, 100);
      }

      // Highlight corresponding SVG path
      for (let i = 1; i <= 7; i++) {
        const path = document.getElementById(`path-node-${i}`);
        if (path) {
          if (i === nodeId) {
            path.classList.add('connection-path-active');
          } else {
            path.classList.remove('connection-path-active');
          }
        }
      }

      // Update Node Triggers & Pills CSS
      nodeTriggers.forEach((trigger) => {
        const id = parseInt(trigger.getAttribute('data-node') || '0', 10);
        if (id === nodeId) {
          trigger.classList.add('eco-glass-plate-active');
        } else {
          trigger.classList.remove('eco-glass-plate-active');
        }
      });

      ecoPills.forEach((pill) => {
        const id = parseInt(pill.getAttribute('data-node') || '0', 10);
        if (id === nodeId) {
          pill.classList.add('eco-pill-active');
        } else {
          pill.classList.remove('eco-pill-active');
        }
      });
    }

    // Attach Click and Hover events to capability plates
    nodeTriggers.forEach((trigger) => {
      const id = parseInt(trigger.getAttribute('data-node') || '0', 10);
      trigger.addEventListener('mouseenter', () => activateEcosystemNode(id));
      trigger.addEventListener('click', () => activateEcosystemNode(id));
    });

    // Attach Click events to bottom navigation pills
    ecoPills.forEach((pill) => {
      const id = parseInt(pill.getAttribute('data-node') || '0', 10);
      pill.addEventListener('click', () => activateEcosystemNode(id));
    });

    // Initialize with Core Node 0
    activateEcosystemNode(0);
  }

  // -------------------------------------------------------------
  // 5. GSAP SCROLLTRIGGER ANIMATIONS & 3D CAMERA TRAVEL
  // -------------------------------------------------------------
  function initGSAPAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const scrollIndicator = document.getElementById('scroll-indicator');

    // A. MASTER HERO TIMELINE (1:1 Direct Scrubbing)
    const masterHeroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          targetFrame = self.progress * (frameCount - 1);
          if (scrollIndicator) {
            scrollIndicator.style.opacity = self.progress > 0.04 ? '0' : '1';
          }
        }
      }
    });

    masterHeroTl.to('#hero-phase2', { opacity: 1, pointerEvents: 'auto', duration: 0.15 }, 0.55);
    masterHeroTl.fromTo('#hero-brand-heading', 
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
      0.6
    );
    masterHeroTl.fromTo('#hero-brand-tagline',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out' },
      0.7
    );

    // B. HERO-TO-ABOUT TRANSITION
    gsap.to('#hero-phase2', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 90%',
        end: 'top 30%',
        scrub: true
      },
      opacity: 0,
      y: -20,
      ease: 'power2.in'
    });

    gsap.to('#hero-canvas-container', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'top top',
        scrub: true
      },
      scale: 0.96,
      opacity: 0.25,
      ease: 'power2.inOut'
    });

    // C. SCENE 1: ABOUT CAMPUS METRICS COUNTER
    const counterNums = document.querySelectorAll('.counter-num');
    counterNums.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');

      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 70%',
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 1.8,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              const val = Math.floor(parseFloat(this.targets()[0].innerText));
              this.targets()[0].innerText = val.toLocaleString();
            }
          });
        }
      });
    });

    // D. SCENE 2: RE-DESIGNED ARCHITECTURAL DIGITAL ECOSYSTEM (LAYER-BY-LAYER PROGRESSIVE REVEAL)
    initEcosystemInteractions();

    const ecoNodes = document.querySelectorAll('.eco-node-trigger');
    const ecoPaths = document.querySelectorAll('.connection-path');

    gsap.fromTo(ecoPaths, 
      { strokeDashoffset: 100, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(ecoNodes,
      { y: 35, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // E. SCENE 3: HORIZONTAL ARCHITECTURAL TRACK WITH BESPOKE PANEL ACTIVE SCALING PHYSICS
    const horizontalTrack = document.getElementById('horizontal-track');
    const bespokePanels = document.querySelectorAll('.bespoke-panel');

    if (horizontalTrack) {
      const getScrollAmount = () => {
        return Math.max(0, horizontalTrack.scrollWidth - window.innerWidth + 96);
      };

      gsap.to(horizontalTrack, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: '#industries',
          pin: '#horizontal-wrapper',
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(bespokePanels.length - 1, Math.floor(progress * bespokePanels.length));

            bespokePanels.forEach((panel, idx) => {
              if (idx === activeIndex) {
                panel.classList.add('bespoke-panel-active');
                panel.classList.remove('bespoke-panel-inactive');
              } else {
                panel.classList.remove('bespoke-panel-active');
                panel.classList.add('bespoke-panel-inactive');
              }
            });
          }
        }
      });

      // 3D Perspective Mouse Tilt Physics for Bespoke Panels
      bespokePanels.forEach((panel) => {
        panel.addEventListener('mousemove', (e) => {
          const rect = panel.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;

          panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${panel.classList.contains('bespoke-panel-active') ? 'scale(1)' : 'scale(0.9)'}`;
        });

        panel.addEventListener('mouseleave', () => {
          panel.style.transform = panel.classList.contains('bespoke-panel-active') ? 'scale(1)' : 'scale(0.9)';
        });
      });
    }

    // F. SCENE 4: MORPHING INTERFACE TRANSFORMATION
    gsap.fromTo('.fragment-item',
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#transformation',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // G. SCENE 5: RE-DESIGNED COMPACT EDITORIAL PIPELINE (70-80VH MAX TARGET)
    const pipelineStagesData = [
      {
        num: '01',
        title: 'Blueprint Studio',
        labelTag: 'STAGE 01 OF 06',
        labelSub: 'Drafting Floor',
        desc: 'Drafting environment featuring self-drawing wireframe overlays, glass planning boards, and curriculum blueprint sketches.',
        metric: '100% SME Curriculum Alignment',
        cardFooter: 'STAGE 01 // ARCHITECTURAL DRAFTING'
      },
      {
        num: '02',
        title: 'Instructional Design',
        labelTag: 'STAGE 02 OF 06',
        labelSub: 'Pedagogy Storyboard',
        desc: 'Digital whiteboards and learning outcome maps connecting academic syllabi directly to SCORM storyboards across open space.',
        metric: 'SCORM 1.2 & 2004 Standard',
        cardFooter: 'STAGE 02 // PEDAGOGICAL STORYBOARD'
      },
      {
        num: '03',
        title: 'AI Studio & Voice',
        labelTag: 'STAGE 03 OF 06',
        labelSub: 'Acoustic Media Lab',
        desc: 'Acoustic voiceover synthesis booth generating multi-language audio tracks and avatar video overlays with 100% subtitle sync.',
        metric: '6 Global Languages',
        cardFooter: 'STAGE 03 // AI VOICE SYNTHESIS'
      },
      {
        num: '04',
        title: 'Engineering & H5P',
        labelTag: 'STAGE 04 OF 06',
        labelSub: 'Development Rig',
        desc: 'Enterprise Moodle plugin development workstation, live H5P interactive widget compiler streams, and LTI 1.3 integration.',
        metric: 'Native H5P & LTI 1.3 Engine',
        cardFooter: 'STAGE 04 // H5P WIDGET COMPILER'
      },
      {
        num: '05',
        title: 'Cloud Matrix',
        labelTag: 'STAGE 05 OF 06',
        labelSub: 'Server Matrix',
        desc: 'High-concurrency AWS Kubernetes server cluster deployment with automated failover, SAML SSO, and 99.9% uptime SLA.',
        metric: '99.9% Guaranteed SLA',
        cardFooter: 'STAGE 05 // KUBERNETES MATRIX'
      },
      {
        num: '06',
        title: 'Command Telemetry',
        labelTag: 'STAGE 06 OF 06',
        labelSub: 'Executive Radar',
        desc: 'Real-time xAPI event stream telemetry, learner drop-off heatmaps, gradebook exports, and executive BI command dashboards.',
        metric: 'Real-Time BI Telemetry Radar',
        cardFooter: 'STAGE 06 // EXECUTIVE TELEMETRY'
      }
    ];

    const pipeLabelTag = document.getElementById('pipe-label-tag');
    const pipeLabelSub = document.getElementById('pipe-label-sub');
    const pipeStageNum = document.getElementById('pipe-stage-num');
    const pipeStageTitle = document.getElementById('pipe-stage-title');
    const pipeStageDesc = document.getElementById('pipe-stage-desc');
    const pipeStageMetric = document.getElementById('pipe-stage-metric');
    const pipeCardFooterTag = document.getElementById('pipe-card-footer-tag');
    const pipePrevBtn = document.getElementById('pipe-prev-btn');
    const pipeNextBtn = document.getElementById('pipe-next-btn');
    const editorialTimelineItems = document.querySelectorAll('.editorial-timeline-item');
    const timelineConnectorLines = document.querySelectorAll('.timeline-connector-line');

    let currentPipeIndex = 0;

    function setCompactPipelineStage(index) {
      if (!pipelineStagesData[index]) return;
      currentPipeIndex = index;
      const data = pipelineStagesData[index];

      // Fade out old content briefly with GSAP Power4.out
      gsap.to('#pipe-stage-card', {
        scale: 0.97,
        opacity: 0.7,
        duration: 0.22,
        ease: 'power4.out',
        onComplete: () => {
          if (pipeLabelTag) pipeLabelTag.innerText = data.labelTag;
          if (pipeLabelSub) pipeLabelSub.innerText = data.labelSub;
          if (pipeStageNum) pipeStageNum.innerText = data.num;
          if (pipeStageTitle) pipeStageTitle.innerText = data.title;
          if (pipeStageDesc) pipeStageDesc.innerText = data.desc;
          if (pipeStageMetric) pipeStageMetric.innerText = data.metric;
          if (pipeCardFooterTag) pipeCardFooterTag.innerText = data.cardFooter;

          // Toggle visual container divs inside stage card
          for (let i = 0; i < 6; i++) {
            const container = document.getElementById(`stage-visual-${i}`);
            if (container) {
              if (i === index) {
                container.classList.remove('hidden');
              } else {
                container.classList.add('hidden');
              }
            }
          }

          gsap.to('#pipe-stage-card', {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power4.out'
          });
        }
      });

      // Update editorial timeline navigation items & connector lines
      editorialTimelineItems.forEach((item, idx) => {
        if (idx === index) {
          item.classList.add('editorial-timeline-item-active');
        } else {
          item.classList.remove('editorial-timeline-item-active');
        }
      });

      timelineConnectorLines.forEach((line, idx) => {
        if (idx < index) {
          line.classList.add('timeline-connector-line-active');
        } else {
          line.classList.remove('timeline-connector-line-active');
        }
      });
    }

    // Prev / Next button listeners
    if (pipePrevBtn) {
      pipePrevBtn.addEventListener('click', () => {
        const prevIdx = (currentPipeIndex - 1 + 6) % 6;
        setCompactPipelineStage(prevIdx);
      });
    }

    if (pipeNextBtn) {
      pipeNextBtn.addEventListener('click', () => {
        const nextIdx = (currentPipeIndex + 1) % 6;
        setCompactPipelineStage(nextIdx);
      });
    }

    // Timeline item click listeners
    editorialTimelineItems.forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-pipe-stage') || '0', 10);
        setCompactPipelineStage(idx);
      });
    });

    // Pinned ScrollTrigger for cycling through pipeline stages on scroll (Max Height 75-80vh)
    ScrollTrigger.create({
      trigger: '#pipeline',
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const stageIndex = Math.min(5, Math.floor(self.progress * 6));
        if (stageIndex !== currentPipeIndex) {
          setCompactPipelineStage(stageIndex);
        }
      }
    });

    // H. SCENE 6: PORTFOLIO EXHIBITION 3D ROTATION
    gsap.fromTo('.portfolio-panel-3d',
      { y: 45, opacity: 0, rotateY: -15 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // I. SCENE 8: TECH WALL REVEAL
    gsap.fromTo('.tech-tile-3d',
      { y: 25, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#tech-wall',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // J. SCENE 9: CLOSING EXPERIENCE REVEAL
    gsap.fromTo('#closing-headline',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#closing-experience',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // K. NAVBAR GLASS ON SCROLL
    const navbarInner = document.getElementById('navbar-inner');
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 80) {
        if (navbarInner) navbarInner.classList.add('navbar-glass-active');
      } else {
        if (navbarInner) navbarInner.classList.remove('navbar-glass-active');
      }
    });

    ScrollTrigger.refresh();
  }

  // -------------------------------------------------------------
  // REACT BITS - BORDER GLOW INITIALIZER (VANILLA JS PORT)
  // -------------------------------------------------------------
  function parseHSL(hslStr) {
    const match = (hslStr || '').match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }

  function buildGlowVars(glowColor, intensity = 1.0) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }

  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function initBorderGlowCards() {
    // Exclude .bespoke-panel & .portfolio-panel-3d to keep exhibition panels clean & crisp
    const glowCards = document.querySelectorAll('.border-glow-card, .stage-card-float');

    glowCards.forEach((card) => {
      card.classList.add('border-glow-card');

      if (!card.querySelector('.edge-light')) {
        const edgeLight = document.createElement('span');
        edgeLight.className = 'edge-light';
        card.appendChild(edgeLight);
      }

      let colors = ['#0F766E', '#14B8A6', '#38BDF8'];
      let glowColor = '175 80 60';
      let cardBg = '#111827';

      // Specific theme profiles based on card type
      const cardText = card.innerText || '';
      if (cardText.includes('Healthcare')) {
        colors = ['#7C3AED', '#c084fc', '#f472b6'];
        glowColor = '270 80 70';
        cardBg = '#1e1b4b';
      } else if (cardText.includes('Corporate')) {
        colors = ['#B7791F', '#f59e0b', '#fbbf24'];
        glowColor = '38 80 60';
        cardBg = '#451a03';
      } else if (cardText.includes('Public Sector') || cardText.includes('Government')) {
        colors = ['#2563EB', '#3b82f6', '#60a5fa'];
        glowColor = '217 80 65';
        cardBg = '#1e3a8a';
      } else if (cardText.includes('Global Missions') || cardText.includes('NGO')) {
        colors = ['#E11D48', '#f43f5e', '#fb7185'];
        glowColor = '345 80 65';
        cardBg = '#4c0519';
      }

      const glowVars = buildGlowVars(glowColor, 1.0);
      const gradientVars = buildGradientVars(colors);

      Object.assign(card.style, {
        '--card-bg': cardBg,
        '--edge-sensitivity': '30',
        '--border-radius': '28px',
        '--glow-padding': '40px',
        '--cone-spread': '25',
        '--fill-opacity': '0.5',
        ...glowVars,
        ...gradientVars
      });

      const getCenterOfElement = (el) => {
        const { width, height } = el.getBoundingClientRect();
        return [width / 2, height / 2];
      };

      const getEdgeProximity = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = cx / Math.abs(dx);
        if (dy !== 0) ky = cy / Math.abs(dy);
        return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      };

      const getCursorAngle = (el, x, y) => {
        const [cx, cy] = getCenterOfElement(el);
        const dx = x - cx;
        const dy = y - cy;
        if (dx === 0 && dy === 0) return 0;
        const radians = Math.atan2(dy, dx);
        let degrees = radians * (180 / Math.PI) + 90;
        if (degrees < 0) degrees += 360;
        return degrees;
      };

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);

        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--edge-proximity', '0');
      });
    });
  }

  initBorderGlowCards();

  // -------------------------------------------------------------
  // REACT BITS - FLUID GLASS (3D OPTICAL REFRACTION LENS CURSOR)
  // -------------------------------------------------------------
  function initFluidGlass(userConfig = {}) {
    const canvas = document.getElementById('fluid-glass-canvas');
    if (!canvas) return;

    const config = {
      mode: 'lens',
      scale: 0.25,
      ior: 1.15,
      thickness: 5.0,
      chromaticAberration: 0.1,
      anisotropy: 0.01,
      ...userConfig
    };

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, preserveDrawingBuffer: false });
    if (!gl) return;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Full-screen Quad Geometry
    const vertexShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Optical Refraction Lens Fragment Shader (Fluid Glass Transparent Lens)
    const fragmentShaderSource = `
      precision highp float;

      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform vec2 uVelocity;
      uniform float uRadius;
      uniform float uIOR;
      uniform float uThickness;
      uniform float uChromaticAberration;
      uniform int uIsDark;

      void main() {
        vec2 st = gl_FragCoord.xy;
        vec2 pointer = uPointer;
        pointer.y = uResolution.y - pointer.y;

        vec2 delta = st - pointer;

        // Liquid Velocity Stretch Distortion
        float velLen = length(uVelocity);
        if (velLen > 0.1) {
          vec2 velDir = uVelocity / velLen;
          float stretch = clamp(velLen * 0.01, 0.0, 0.35);
          float dotV = dot(delta, velDir);
          delta -= velDir * dotV * (stretch / (1.0 + stretch));
        }

        float dist = length(delta);
        if (dist > uRadius) {
          discard;
        }

        float rNorm = dist / uRadius;

        // 3D Spherical Glass Lens Height Dome
        float z = sqrt(clamp(1.0 - rNorm * rNorm, 0.0, 1.0));

        // Surface Normal Vector
        vec3 normal = normalize(vec3(delta / uRadius, z * 1.4));
        vec3 incident = vec3(0.0, 0.0, -1.0);

        // Fresnel Glass Rim Lighting & Bevel Reflection
        float fresnel = pow(1.0 - max(dot(-incident, normal), 0.0), 3.2);
        float rimGlow = smoothstep(0.68, 0.98, rNorm);
        float specularDot = max(dot(normal, normalize(vec3(0.35, 0.6, 0.75))), 0.0);
        float liquidShine = pow(specularDot, 28.0) * 0.95;

        // Spectral Rainbow Edge Flares at Glass Perimeter
        float ca = uChromaticAberration * 0.03;
        vec3 spectralRainbow = vec3(
          smoothstep(0.68, 0.96, rNorm + ca * 3.0),
          smoothstep(0.72, 0.96, rNorm),
          smoothstep(0.76, 0.96, rNorm - ca * 3.0)
        ) * 0.45;

        // Dynamic Glass Rim Color
        vec3 glassRimColor = (uIsDark == 1) ? vec3(1.0, 1.0, 1.0) : vec3(0.12, 0.18, 0.22);
        vec3 highlightRGB = glassRimColor * (fresnel * 0.55 + rimGlow * 0.45) + vec3(1.0) * liquidShine + spectralRainbow;

        // Anti-Aliased Edge Alpha: Center is Transparent for Text Visibility, Rim is Luminous 3D Glass
        float edgeAlpha = smoothstep(1.0, 0.92, rNorm);
        float glassBodyAlpha = clamp(fresnel * 0.6 + rimGlow * 0.5 + liquidShine * 0.9 + length(spectralRainbow) * 0.7, 0.0, 0.88);

        gl_FragColor = vec4(highlightRGB, glassBodyAlpha * edgeAlpha);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vert = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, 'uResolution');
    const uPointerLoc = gl.getUniformLocation(program, 'uPointer');
    const uVelLoc = gl.getUniformLocation(program, 'uVelocity');
    const uRadiusLoc = gl.getUniformLocation(program, 'uRadius');
    const uIORLoc = gl.getUniformLocation(program, 'uIOR');
    const uThicknessLoc = gl.getUniformLocation(program, 'uThickness');
    const uCALoc = gl.getUniformLocation(program, 'uChromaticAberration');
    const uIsDarkLoc = gl.getUniformLocation(program, 'uIsDark');

    let glassLensEl = document.getElementById('fluid-glass-lens');
    if (!glassLensEl) {
      glassLensEl = document.createElement('div');
      glassLensEl.id = 'fluid-glass-lens';
      document.body.appendChild(glassLensEl);
    }

    function isCursorOverDarkElement(x, y) {
      const el = document.elementFromPoint(x, y);
      if (!el) return false;
      if (el.closest('#closing-experience, .bespoke-panel, .bg-\\[\\#111827\\], .bg-slate-900, .bg-teal-950, .bg-violet-950, .bg-amber-950, .bg-blue-950, .bg-rose-950, .bg-emerald-950, .dark-card, .stage-card-float, .portfolio-panel-3d')) {
        return true;
      }
      let current = el;
      while (current && current !== document.body) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            if (luminance < 130) return true;
            if (luminance >= 130) return false;
          }
        }
        current = current.parentElement;
      }
      return false;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currX = mouseX;
    let currY = mouseY;
    let velX = 0;
    let velY = 0;
    let isMouseDown = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('mousedown', () => { isMouseDown = true; });
    window.addEventListener('mouseup', () => { isMouseDown = false; });

    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let currentRadiusPx = 30.0;

    function render() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      const prevX = currX;
      const prevY = currY;
      currX += (mouseX - currX) * 0.22;
      currY += (mouseY - currY) * 0.22;

      velX = (currX - prevX) * dpr;
      velY = (currY - prevY) * dpr;

      if (glassLensEl) {
        glassLensEl.style.transform = `translate3d(${currX}px, ${currY}px, 0) scale(${isMouseDown ? 0.85 : 1})`;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      const targetRadius = (isMouseDown ? 22.0 : 28.0) * dpr;
      currentRadiusPx += (targetRadius - currentRadiusPx) * 0.2;

      const isDark = isCursorOverDarkElement(currX, currY) ? 1 : 0;

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform2f(uPointerLoc, currX * dpr, currY * dpr);
      gl.uniform2f(uVelLoc, velX, velY);
      gl.uniform1f(uRadiusLoc, currentRadiusPx);
      gl.uniform1f(uIORLoc, config.ior || 1.15);
      gl.uniform1f(uThicknessLoc, config.thickness || 5.0);
      gl.uniform1f(uCALoc, config.chromaticAberration || 0.1);
      gl.uniform1i(uIsDarkLoc, isDark);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  initFluidGlass({
    mode: 'lens',
    scale: 0.12,
    ior: 1.15,
    thickness: 5.0,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  });

});
