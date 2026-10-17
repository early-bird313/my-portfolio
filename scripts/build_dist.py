import os

def build():
    root = "/home/minhaj-ahmed-pabel/Documents/As Suunah-20261011T111654Z-1-001/As Suunah/AI/web/Day 01/portfolio website"
    
    # 1. Combine CSS files in proper cascade order
    css_files = [
        "src/index.css",
        "src/App.css",
        "src/components/SplashBanner.css",
        "src/components/styles/Navbar.css",
        "src/components/styles/SocialIcons.css",
        "src/components/styles/Sections.css",
    ]
    
    combined_css = []
    for rel_path in css_files:
        full_path = os.path.join(root, rel_path)
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as f:
                combined_css.append(f"/* === {rel_path} === */\n" + f.read())
        else:
            print(f"Warning: {rel_path} does not exist!")
            
    out_css = os.path.join(root, "dist/assets/index-DAT4VCmD.css")
    with open(out_css, "w", encoding="utf-8") as f:
        f.write("\n\n".join(combined_css))
    print(f"Wrote CSS: {len(combined_css)} files combined ({os.path.getsize(out_css)} bytes)")

    # 2. Extract base React runtime from existing JS bundle
    orig_js_path = os.path.join(root, "dist/assets/index-R3bGp_oX.js")
    with open(orig_js_path, "r", encoding="utf-8") as f:
        orig_js = f.read()
        
    cutoff_marker = "const gn={"
    idx = orig_js.find(cutoff_marker)
    if idx == -1:
        raise ValueError("Could not find 'const gn={' in bundle!")
        
    base_runtime = orig_js[:idx]
    
    # 3. App components code with unboxed, clean black void background & dynamic sculpture
    app_js = """const gn={desktopBanner:"/images/desktop-banner.jpg",splashDuration:6.5};

const GlobalParticleSculpture=()=>{
  const canvasRef=et.useRef(null);
  et.useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas)return;
    let animId;
    let time=0;
    const pointCount=9000;
    const mouse={x:0,y:0,targetX:0,targetY:0};

    const gl=canvas.getContext("webgl",{alpha:!0,antialias:!0})||canvas.getContext("experimental-webgl");
    if(!gl)return;

    const vsSource=`
      attribute vec3 a_coords;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform vec2 u_pos;
      uniform float u_scale;

      varying float v_light;
      varying float v_depth;
      varying float v_spec;

      mat3 rotateY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,s,0.,1.,0.,-s,0.,c);}
      mat3 rotateX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,-s,0.,s,c);}
      mat3 rotateZ(float a){float c=cos(a),s=sin(a);return mat3(c,-s,0.,s,c,0.,0.,0.,1.);}

      void main(){
        float theta=a_coords.x;
        float phi=a_coords.y;
        float jitter=a_coords.z;
        float cosPhi=cos(phi);
        vec3 p0=vec3(cosPhi*cos(theta),sin(phi),cosPhi*sin(theta));
        float t=u_time*0.9;

        float h1=0.44*(p0.x*p0.x-p0.y*p0.y+0.85*p0.x*p0.z);
        float h2=0.32*sin(2.2*p0.x+1.8*p0.y+t*0.75)*cos(2.0*p0.z-t*0.55);
        float h3=-0.38*exp(-2.2*(p0.x*p0.x+p0.z*p0.z))*cos(p0.y*2.4);
        float h4=0.16*cos(2.8*p0.y+2.2*p0.x+t*1.1);
        float h5=0.035*sin(14.0*p0.x)*sin(14.0*p0.y)*sin(14.0*p0.z);

        float radius=1.0+h1+h2+h3+h4+h5+jitter*0.06;
        vec3 p=p0*radius;

        vec3 norm=normalize(p0+vec3(
          0.35*cos(2.2*p0.x+t),
          0.35*sin(2.2*p0.y+t),
          0.35*cos(2.2*p0.z+t)
        ));

        float ry=t*0.42+u_mouse.x*0.85;
        float rx=0.32+sin(t*0.28)*0.22-u_mouse.y*0.75;
        float rz=cos(t*0.22)*0.18;

        mat3 rot=rotateY(ry)*rotateX(rx)*rotateZ(rz);
        vec3 rPos=rot*p;
        vec3 rNorm=rot*norm;

        vec3 lightDir=normalize(vec3(0.65,0.85,0.95));
        float diff=max(0.0,dot(rNorm,lightDir));
        vec3 viewDir=vec3(0.0,0.0,1.0);
        vec3 halfVec=normalize(lightDir+viewDir);
        float spec=pow(max(0.0,dot(rNorm,halfVec)),24.0);

        v_light=clamp(0.14+0.72*diff+0.65*spec,0.10,1.0);
        v_depth=(rPos.z+1.8)/3.6;
        v_spec=spec;

        float fov=3.2;
        float zDist=4.2-rPos.z*0.85;
        vec2 proj=(rPos.xy*fov)/zDist;

        float aspect=u_resolution.x/u_resolution.y;
        if(aspect>1.0){proj.x/=aspect;}else{proj.y*=aspect;}

        proj+=u_pos;

        gl_Position=vec4(proj*u_scale,0.0,1.0);
        float pSize=(1.5+v_depth*3.0+v_light*1.4)*(u_resolution.y/560.0);
        gl_PointSize=clamp(pSize,1.0,8.0);
      }
    `;

    const fsSource=`
      precision mediump float;
      uniform float u_opacity;
      varying float v_light;
      varying float v_depth;
      varying float v_spec;

      void main(){
        vec2 coord=gl_PointCoord-vec2(0.5);
        float dist=length(coord);
        if(dist>0.5)discard;

        float alphaEdge=smoothstep(0.5,0.22,dist);
        float brightness=v_light*(0.35+0.65*v_depth);
        vec3 col=vec3(brightness);
        float alpha=alphaEdge*clamp(0.18+brightness*0.82,0.14,0.98)*u_opacity;
        gl_FragColor=vec4(col,alpha);
      }
    `;

    const createShader=(type,src)=>{
      const s=gl.createShader(type);
      if(!s)return null;
      gl.shaderSource(s,src);
      gl.compileShader(s);
      if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))return null;
      return s;
    };

    const vs=createShader(gl.VERTEX_SHADER,vsSource);
    const fs=createShader(gl.FRAGMENT_SHADER,fsSource);
    if(!vs||!fs)return;

    const program=gl.createProgram();
    if(!program)return;
    gl.attachShader(program,vs);
    gl.attachShader(program,fs);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
    gl.useProgram(program);

    const coordsData=new Float32Array(pointCount*3);
    for(let i=0;i<pointCount;i++){
      const y=1.0-(i/(pointCount-1))*2.0;
      const phi=Math.asin(Math.max(-1,Math.min(1,y)));
      const theta=i*2.399963229728653;
      const jitter=(Math.random()-0.5)*1.5;
      coordsData[i*3+0]=theta;
      coordsData[i*3+1]=phi;
      coordsData[i*3+2]=jitter;
    }

    const vbo=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,coordsData,gl.STATIC_DRAW);

    const aCoords=gl.getAttribLocation(program,"a_coords");
    gl.enableVertexAttribArray(aCoords);
    gl.vertexAttribPointer(aCoords,3,gl.FLOAT,!1,0,0);

    const uTime=gl.getUniformLocation(program,"u_time");
    const uMouse=gl.getUniformLocation(program,"u_mouse");
    const uRes=gl.getUniformLocation(program,"u_resolution");
    const uPos=gl.getUniformLocation(program,"u_pos");
    const uScale=gl.getUniformLocation(program,"u_scale");
    const uOpacity=gl.getUniformLocation(program,"u_opacity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

    const handleResize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,2);
      const w=Math.floor(window.innerWidth*dpr);
      const h=Math.floor(window.innerHeight*dpr);
      if(canvas.width!==w||canvas.height!==h){
        canvas.width=w;
        canvas.height=h;
        gl.viewport(0,0,w,h);
      }
    };
    handleResize();

    const handleMouseMove=(e)=>{
      mouse.targetX=(e.clientX/window.innerWidth)*2-1;
      mouse.targetY=(e.clientY/window.innerHeight)*2-1;
    };

    window.addEventListener("resize",handleResize);
    window.addEventListener("mousemove",handleMouseMove,{passive:!0});

    const pos={x:0,y:0,scale:1.15,opacity:0.0};

    const render=()=>{
      time+=0.016;
      mouse.x+=(mouse.targetX-mouse.x)*0.06;
      mouse.y+=(mouse.targetY-mouse.y)*0.06;

      const vh=window.innerHeight;
      const heroEl=document.getElementById("hero");
      const aboutEl=document.getElementById("about");
      const journeyEl=document.getElementById("journey");
      const projectsEl=document.getElementById("projects");
      const contactEl=document.getElementById("contact");

      const isViewParam=typeof window!=="undefined"&&window.location.search.includes("view=");
      const viewSec=isViewParam?window.location.search.split("view=")[1]?.split("&")[0]:null;

      let targetX=0;
      let targetY=0;
      let targetScale=1.15;
      let targetOpacity=1.0;

      if(viewSec==="about"){
        targetX=0.58;targetY=-0.04;targetScale=1.0;targetOpacity=1.0;
      }else if(viewSec==="journey"){
        targetX=-0.58;targetY=0;targetScale=1.0;targetOpacity=1.0;
      }else if(viewSec==="projects"){
        targetOpacity=0.0;
      }else if(viewSec==="contact"){
        targetX=0.58;targetY=0.02;targetScale=1.02;targetOpacity=1.0;
      }else if(aboutEl&&heroEl){
        const aboutRect=aboutEl.getBoundingClientRect();
        const journeyRect=journeyEl?journeyEl.getBoundingClientRect():null;
        const projectsRect=projectsEl?projectsEl.getBoundingClientRect():null;
        const contactRect=contactEl?contactEl.getBoundingClientRect():null;

        if(contactRect&&contactRect.top<vh*0.75){
          targetX=0.58;
          targetY=0.02;
          targetScale=1.02;
          targetOpacity=1.0;
        }else if(projectsRect&&projectsRect.top<vh*0.75){
          targetX=0.0;
          targetY=0.0;
          targetScale=0.75;
          targetOpacity=0.0;
        }else if(aboutRect.top>=vh*0.75){
          targetX=0;
          targetY=0;
          targetScale=1.15;
          targetOpacity=1.0;
        }else if(aboutRect.top<vh*0.75&&(!journeyRect||journeyRect.top>=vh*0.65)){
          const t=Math.max(0,Math.min(1,(vh*0.75-aboutRect.top)/(vh*0.75)));
          targetX=0.58*t;
          targetY=-0.04*t;
          targetScale=1.15-0.15*t;
          targetOpacity=1.0;
        }else if(journeyRect&&journeyRect.top<vh*0.65){
          const t=Math.max(0,Math.min(1,(vh*0.65-journeyRect.top)/(vh*0.65)));
          targetX=0.58*(1-t)+(-0.58)*t;
          targetY=0;
          targetScale=1.0;
          targetOpacity=1.0;
        }
      }

      targetX+=mouse.x*0.15;
      targetY+=-mouse.y*0.13;

      pos.x+=(targetX-pos.x)*0.065;
      pos.y+=(targetY-pos.y)*0.065;
      pos.scale+=(targetScale-pos.scale)*0.065;
      pos.opacity+=(targetOpacity-pos.opacity)*0.075;

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if(pos.opacity>0.01){
        gl.uniform1f(uTime,time);
        gl.uniform2f(uMouse,mouse.x,mouse.y);
        gl.uniform2f(uRes,canvas.width,canvas.height);
        gl.uniform2f(uPos,pos.x,pos.y);
        gl.uniform1f(uScale,pos.scale);
        gl.uniform1f(uOpacity,Math.max(0,Math.min(1,pos.opacity)));
        gl.drawArrays(gl.POINTS,0,pointCount);
      }
      animId=requestAnimationFrame(render);
    };

    render();

    return ()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",handleResize);
      window.removeEventListener("mousemove",handleMouseMove);
      gl.deleteBuffer(vbo);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  },[]);

  return T.jsx("canvas",{
    ref:canvasRef,
    className:"global-particle-sculpture-canvas",
    style:{
      position:"fixed",
      top:0,
      left:0,
      width:"100vw",
      height:"100vh",
      pointerEvents:"none",
      zIndex:4
    }
  });
};

const Ld=({onComplete:e})=>{
  const[t,setPhase]=et.useState("enter"),[percent,setPercent]=et.useState(0),[isLoaded,setIsLoaded]=et.useState(!1),[imgLoaded,setImgLoaded]=et.useState(!1),pillRef=et.useRef(null),timerRef=et.useRef(null);
  et.useEffect(()=>{
    const enterTimer=setTimeout(()=>setPhase("visible"),50);
    let progress=0;
    timerRef.current=setInterval(()=>{
      progress+=1;
      setPercent(progress);
      if(progress>=100){
        if(timerRef.current)clearInterval(timerRef.current);
        setIsLoaded(!0);
      }
    },25);
    return ()=>{clearTimeout(enterTimer);if(timerRef.current)clearInterval(timerRef.current)}
  },[]);
  et.useEffect(()=>{
    if(isLoaded){
      const exitTimer=setTimeout(()=>{
        setPhase("exit");
        const finishTimer=setTimeout(()=>{ e(); },400);
        return ()=>clearTimeout(finishTimer);
      },400);
      return()=>clearTimeout(exitTimer);
    }
  },[isLoaded]);
  const handleTransitionEnd=ev=>{if(t==="exit")e()};
  const handleSkip=()=>{
    if(timerRef.current)clearInterval(timerRef.current);
    setPercent(100);
    setIsLoaded(!0);
    setTimeout(()=>{
      setPhase("exit");
      setTimeout(()=>{ e(); },400);
    },200);
  };
  const handlePillMouseMove=ev=>{
    if(!pillRef.current)return;
    const rect=pillRef.current.getBoundingClientRect();
    pillRef.current.style.setProperty("--mouse-x",(ev.clientX-rect.left)+"px");
    pillRef.current.style.setProperty("--mouse-y",(ev.clientY-rect.top)+"px")
  };
  return T.jsxs("div",{className:`splash-banner splash-${t}`,onTransitionEnd:handleTransitionEnd,onClick:handleSkip,children:[
    T.jsxs("div",{className:"splash-bg",children:[
      T.jsx("div",{className:"splash-ambient-glow"}),
      T.jsx("div",{className:"splash-rays"}),
      T.jsx("div",{className:"splash-noise"})
    ]}),
    T.jsxs("div",{className:"splash-desktop-bg",children:[
      T.jsx("img",{src:gn.desktopBanner,alt:"Creative AI Engineer Desktop Hero",className:`splash-desktop-img ${imgLoaded?"loaded":""}`,onLoad:()=>setImgLoaded(!0)}),
      T.jsx("div",{className:"splash-desktop-gradient"})
    ]}),
    T.jsx("main",{className:"splash-hero",children:
      T.jsx("div",{className:"hero-content",children:
        T.jsxs("h1",{className:"hero-title splash-ideas-title",children:[
          T.jsx("div",{className:"title-mask line-1-mask",children:
            T.jsx("span",{className:"title-text line-1",children:"CREATIVE THINKER"})
          }),
          T.jsx("div",{className:"title-mask line-2-mask",children:
            T.jsxs("span",{className:"title-text line-2",children:[
              T.jsx("span",{className:"shimmer-text",children:"& PROBLEM SOLVER"}),
              T.jsx("span",{className:"title-period",children:"."})
            ]})
          })
        ]})
      })
    }),
    T.jsxs("footer",{className:"splash-footer",children:[
      T.jsx("div",{className:"footer-marquee",children:
        T.jsxs("div",{className:"marquee-track",children:[
          T.jsx("span",{children:"AI ENGINEER • FULL-STACK DEVELOPER • CREATIVE TECH • AUTONOMOUS AGENTS • "}),
          T.jsx("span",{children:"AI ENGINEER • FULL-STACK DEVELOPER • CREATIVE TECH • AUTONOMOUS AGENTS • "})
        ]})
      }),
      T.jsxs("div",{
        ref:pillRef,
        className:`loading-capsule-pill ${isLoaded?"pill-welcome":""}`,
        onMouseMove:handlePillMouseMove,
        onClick:handleSkip,
        role:"button",
        tabIndex:0,
        title:isLoaded?"Entering Portfolio...":"Click to Skip",
        children:[
          T.jsx("div",{className:"pill-ambient-light"}),
          T.jsx("div",{className:"pill-content",children:
            !isLoaded?
              T.jsxs("div",{className:"pill-state-loading",children:[
                T.jsx("span",{className:"pill-label",children:"LOADING"}),
                T.jsxs("span",{className:"pill-counter",children:[percent,"%"]}),
                T.jsx("span",{className:"pill-cursor",children:"█"})
              ]}):
              T.jsxs("div",{className:"pill-state-welcome",children:[
                T.jsx("span",{className:"welcome-symbol",children:"✦"}),
                T.jsx("span",{className:"welcome-title",children:"WELCOME"}),
                T.jsx("span",{className:"welcome-symbol",children:"✦"})
              ]})
          })
        ]
      })
    ]})
  ]})
};

const navLinks=[
  {id:"about",label:"ABOUT"},
  {id:"journey",label:"JOURNEY"},
  {id:"projects",label:"PROJECTS"},
  {id:"contact",label:"CONTACT"}
];

const Navbar=()=>{
  const[mobileOpen,setMobileOpen]=et.useState(!1);
  const[activeSection,setActiveSection]=et.useState("");

  et.useEffect(()=>{
    const isViewParam=typeof window!=="undefined"&&window.location.search.includes("view=");
    const viewSec=isViewParam?window.location.search.split("view=")[1]?.split("&")[0]:null;
    if(viewSec){
      setActiveSection(viewSec);
      return;
    }
    const handleScroll=()=>{
      const scrollPos=window.scrollY+window.innerHeight*0.35;
      const heroEl=document.getElementById("hero");
      if(heroEl&&window.scrollY<heroEl.offsetHeight*0.45){
        setActiveSection("");
        return;
      }
      let current="";
      for(const link of navLinks){
        const el=document.getElementById(link.id);
        if(el){
          const top=el.offsetTop;
          const height=el.offsetHeight;
          if(scrollPos>=top&&scrollPos<top+height){
            current=link.id;
            break;
          }
        }
      }
      if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-80&&document.documentElement.scrollHeight>window.innerHeight*1.5){
        current="contact";
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll",handleScroll,{passive:!0});
    handleScroll();
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  return T.jsxs("header",{className:"main-navbar",children:[
    T.jsx("div",{className:"navbar-left",children:
      T.jsxs("a",{href:"#hero",className:"navbar-logo",onClick:()=>{setActiveSection("");setMobileOpen(!1);},children:[
        T.jsx("span",{className:"logo-initials",children:"MP"}),
        T.jsx("span",{className:"logo-dot",children:"."})
      ]})
    }),
    T.jsx("div",{className:"navbar-center",children:
      T.jsx("a",{href:"mailto:pabelminhajahmed@gmail.com",className:"navbar-email",children:"pabelminhajahmed@gmail.com"})
    }),
    T.jsx("nav",{className:`navbar-right ${mobileOpen?"open":""}`,children:
      T.jsx("ul",{className:"nav-menu",children:
        navLinks.map(link=>
          T.jsx("li",{key:link.id,children:
            T.jsx("a",{
              href:`#${link.id}`,
              className:`nav-item ${activeSection===link.id?"active-nav-pill":""}`,
              onClick:()=>{setActiveSection(link.id);setMobileOpen(!1);},
              children:T.jsx("span",{children:link.label})
            })
          })
        )
      })
    }),
    T.jsxs("button",{className:`mobile-toggle-btn ${mobileOpen?"active":""}`,onClick:()=>setMobileOpen(!mobileOpen),"aria-label":"Toggle Navigation",children:[
      T.jsx("span",{className:"bar"}),
      T.jsx("span",{className:"bar"})
    ]})
  ]});
};

const Hero=()=>{
  return T.jsx("section",{className:"hero-prototype-section",id:"hero",children:
    T.jsxs("div",{className:"hero-content-wrap",children:[
      T.jsxs("h1",{className:"hero-main-title",children:[
        T.jsx("span",{children:"I TURN IDEAS INTO "}),
        T.jsx("br",{}),
        T.jsx("span",{className:"gradient-text",children:"DIGITAL SOLUTIONS."})
      ]}),
      T.jsxs("p",{className:"hero-lead-desc",children:[
        "Worked with ",
        T.jsx("strong",{children:"50+ local and international clients"}),
        ", turning ideas into creative solutions and building lasting professional relationships."
      ]}),
      T.jsxs("div",{className:"hero-actions",children:[
        T.jsxs("a",{href:"#projects",className:"btn-primary-glow",children:[
          T.jsx("span",{children:"Explore Featured Work"}),
          T.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor",strokeWidth:"2.4",children:
            T.jsx("path",{d:"M7 13l5 5 5-5M12 4v14"})
          })
        ]}),
        T.jsxs("a",{href:"#contact",className:"btn-secondary-outline",children:[
          T.jsx("span",{children:"Let's Build Together"}),
          T.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:
            T.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})
          })
        ]})
      ]}),
      T.jsxs("div",{className:"hero-stats-row",children:[
        T.jsxs("div",{className:"stat-box",children:[
          T.jsx("div",{className:"stat-number",children:"50+"}),
          T.jsx("div",{className:"stat-label",children:"Clients Worldwide"})
        ]}),
        T.jsx("div",{className:"stat-divider"}),
        T.jsxs("div",{className:"stat-box",children:[
          T.jsx("div",{className:"stat-number",children:"100%"}),
          T.jsx("div",{className:"stat-label",children:"Problem-Solving Drive"})
        ]})
      ]})
    ]})
  });
};

const About=()=>{
  const[inView,setInView]=et.useState(!1);
  const sectionRef=et.useRef(null);
  et.useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting)setInView(!0);
    },{threshold:0.15});
    if(sectionRef.current)observer.observe(sectionRef.current);
    return()=>observer.disconnect();
  },[]);

  return T.jsx("section",{className:"portfolio-section",id:"about",ref:sectionRef,children:
    T.jsxs("div",{className:"section-inner section-wide",children:[
      T.jsxs("h2",{className:`section-title ${inView?"animate-reveal-up":""}`,children:[
        "ABOUT ",
        T.jsx("span",{className:"text-accent",children:"ME"})
      ]}),
      T.jsxs("div",{className:"about-grid",children:[
        T.jsxs("div",{className:`about-bio-wrap ${inView?"about-animated":""}`,children:[
          T.jsxs("p",{className:"about-paragraph lead-p",children:[
            "I am a ",
            T.jsx("strong",{className:"text-highlight",children:"creative, technology-driven engineer"}),
            " passionate about solving real-world challenges and transforming ambitious ideas into ",
            T.jsx("strong",{className:"text-highlight",children:"practical digital solutions"}),
            "."
          ]}),
          T.jsx("p",{className:"about-paragraph",children:"I combine deep software engineering fundamentals with cutting-edge AI models and creative lateral thinking to build scalable software, dynamic web interfaces, and automated agent workflows that address real business needs."}),
          T.jsx("p",{className:"about-paragraph",children:"Bridging technical execution with thoughtful product intuition, my goal is to deliver solutions that create measurable value, accelerate workflows, and build lasting professional partnerships."}),
          T.jsxs("div",{className:"about-quote-modern",children:[
            T.jsx("span",{className:"quote-accent-bar"}),
            T.jsxs("div",{className:"quote-content-wrap",children:[
              T.jsx("p",{className:"quote-text",children:"“I'm always learning, experimenting, and building better ways to solve problems through technology.”"}),
              T.jsx("span",{className:"quote-author",children:"— Minhaj Ahmed Pabel"})
            ]})
          ]})
        ]}),
        T.jsx("div",{className:"about-sculpture-anchor","aria-hidden":"true"})
      ]})
    ]})
  });
};

const journeyData=[
  {year:"2026",step:"01",title:"AI Automation & Agentic Engineering",desc:"Exploring intelligent systems and AI-powered solutions.",isCurrent:!0,tags:["Agentic AI","Autonomous Workflows","Prompt Engineering","LLM Integration"]},
  {year:"2025",step:"02",title:"Traditional Software Development",desc:"Building a foundation in programming and software development.",tags:["Full-Stack","TypeScript","React","Node.js","Clean Code"]},
  {year:"2024",step:"03",title:"Real-World Problem Solving",desc:"Gaining professional experience in client handling, communication, and solving real-world challenges.",tags:["Client Handling","Communication","Real-World Challenges","50+ Clients"]},
  {year:"2023",step:"04",title:"Freelance Graphic Design",desc:"Developing visual creativity and digital design skills.",tags:["Visual Creativity","Digital Design","UI/UX Thinking","Brand Identity"]},
  {year:"2022",step:"05",title:"Basic Computer Skills",desc:"Building a foundation in computer fundamentals and digital tools.",tags:["Computing Fundamentals","Digital Tools","Exploration","Core Foundations"]}
];

const Journey=()=>{
  const isYearParam=typeof window!=="undefined"&&window.location.search.includes("year=");
  const initialYear=isYearParam?parseInt(window.location.search.split("year=")[1]?.split("&")[0]||"0",10):0;
  const[activeIndex,setActiveIndex]=et.useState(initialYear);
  const sectionRef=et.useRef(null);

  et.useEffect(()=>{
    if(isYearParam)return;
    const handleScroll=()=>{
      const el=sectionRef.current;
      if(!el)return;
      const rect=el.getBoundingClientRect();
      const totalScroll=rect.height-window.innerHeight;
      if(totalScroll<=0)return;
      const currentScroll=-rect.top;
      const rawProgress=currentScroll/totalScroll;
      const progress=Math.max(0,Math.min(0.999,rawProgress));
      const count=journeyData.length;
      const idx=Math.min(count-1,Math.max(0,Math.floor(progress*count)));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll",handleScroll,{passive:!0});
    handleScroll();
    return()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  const scrollToYear=(idx)=>{
    const el=sectionRef.current;
    if(!el)return;
    const rect=el.getBoundingClientRect();
    const totalScroll=rect.height-window.innerHeight;
    const stepSize=totalScroll/journeyData.length;
    const targetScrollY=window.scrollY+rect.top+(idx+0.2)*stepSize;
    window.scrollTo({top:targetScrollY,behavior:"smooth"});
  };

  const currentItem=journeyData[activeIndex];

  return T.jsx("section",{className:"portfolio-section journey-scroll-section",id:"journey",ref:sectionRef,children:
    T.jsxs("div",{className:"section-inner section-wide journey-inner-sticky",children:[
      T.jsx("div",{className:"journey-header-wrap",children:
        T.jsxs("h2",{className:"section-title journey-title-right",children:[
          "MY ",
          T.jsx("span",{className:"text-accent",children:"JOURNEY"})
        ]})
      }),
      T.jsxs("div",{className:"journey-grid-layout",children:[
        T.jsx("div",{className:"journey-sculpture-anchor","aria-hidden":"true"}),
        T.jsx("div",{className:"journey-spotlight-side",children:
          T.jsxs("div",{className:"journey-vertical-layout",children:[
            T.jsxs("div",{className:"journey-vertical-track",children:[
              T.jsx("div",{className:"vertical-spine-line",children:
                T.jsx("div",{className:"vertical-spine-progress",style:{height:`${(activeIndex/(journeyData.length-1))*100}%`}})
              }),
              T.jsx("div",{className:"vertical-nodes-list",children:
                journeyData.map((item,index)=>
                  T.jsxs("button",{
                    key:item.year,
                    type:"button",
                    className:`vertical-node-btn ${index===activeIndex?"active":""} ${index<activeIndex?"completed":""}`,
                    onClick:()=>scrollToYear(index),
                    title:`Phase ${item.step}: ${item.year}`,
                    children:[
                      T.jsx("span",{className:"vertical-node-dot",children:
                        index===activeIndex&&T.jsx("span",{className:"node-pulse-ring"})
                      }),
                      T.jsx("span",{className:"vertical-node-year",children:item.year})
                    ]
                  })
                )
              })
            ]}),
            T.jsx("div",{className:"journey-card-container",children:
              T.jsxs("div",{key:currentItem.year,className:"journey-spotlight-card",children:[
                T.jsxs("div",{className:"spotlight-top-bar",children:[
                  T.jsxs("div",{className:"spotlight-year-wrap",children:[
                    T.jsx("span",{className:"spotlight-year-number",children:currentItem.year}),
                    currentItem.isCurrent&&T.jsx("span",{className:"spotlight-current-pill",children:"✦ Current Focus"})
                  ]}),
                  T.jsxs("div",{className:"spotlight-step-tag",children:["Phase ",currentItem.step," of 05"]})
                ]}),
                T.jsx("h3",{className:"spotlight-title",children:currentItem.title}),
                T.jsx("p",{className:"spotlight-desc",children:currentItem.desc}),
                T.jsxs("div",{className:"spotlight-scroll-indicator",children:[
                  T.jsx("span",{className:"indicator-pulse"}),
                  activeIndex<journeyData.length-1?
                    T.jsxs("button",{
                      type:"button",
                      className:"indicator-text-btn",
                      onClick:()=>scrollToYear(activeIndex+1),
                      children:["Scroll down to explore ",journeyData[activeIndex+1].year," ↓"]
                    }):
                    T.jsx("span",{className:"indicator-text",children:"Scroll to explore Featured Projects ↓"})
                ]})
              ]})
            })
          ]})
        })
      ]})
    ]})
  });
};

const projectsList=[
  {
    id:"p1",category:"websites",catLabel:"Websites",title:"Modern Corporate Web Platform",
    desc:"High-performance marketing & corporate website with dark mode, interactive service showcases, and seamless lead capture.",
    fullDetails:"An enterprise-grade corporate platform engineered with sub-second page loads, dark/light theme persistence, interactive 3D particle accents, and localized lead capture pipelines. Built with zero-hydration layout shift and fully optimized for top-tier search engine visibility.",
    clientType:"Fintech & Corporate Consultancy",
    highlights:["Sub-second First Contentful Paint with Next.js static asset optimization","Dynamic interactive pricing calculator & automated consultation booking","TailwindCSS custom design token system with full dark-mode fidelity","Achieved 99/100 Google Lighthouse score across Performance & SEO"],
    tags:["React","TypeScript","TailwindCSS","SEO","Next.js"],gradient:"linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
  },
  {
    id:"p2",category:"websites",catLabel:"Websites",title:"E-Commerce & Digital Storefront",
    desc:"Custom digital commerce experience with dynamic catalog filtering, instant cart management, and payment gateway integration.",
    fullDetails:"A modern digital commerce experience designed for high conversion and effortless product discovery. Features real-time multi-facet filtering, optimistic cart state updates, encrypted Stripe checkout, and automated customer receipt dispatch.",
    clientType:"Direct-to-Consumer Brand",
    highlights:["Instant faceted search and attribute filtering with zero latency","Optimistic UI cart additions with persistent local state","Secure Stripe API checkout with webhook-based order processing","Mobile-first responsive architecture designed for one-thumb checkout"],
    tags:["Next.js","REST APIs","Modern UI","Stripe","Tailwind"],gradient:"linear-gradient(135deg, #022c22 0%, #064e3b 100%)"
  },
  {
    id:"p3",category:"applications",catLabel:"Applications",title:"AI-Powered Automation Dashboard",
    desc:"Operational management tool integrating intelligent workflows, task queues, and real-time client analytics.",
    fullDetails:"An autonomous agent operations hub that allows teams to configure multi-step LLM workflows, monitor real-time background task execution, inspect token expenditures, and visualize telemetry through reactive WebSocket data feeds.",
    clientType:"AI Automation Agency",
    highlights:["Real-time agent queue telemetry powered by persistent WebSockets","Multi-agent prompt orchestration pipeline with fallback routing","Custom analytics widgets tracking inference latency and cost per token","Role-based access control with audited operational task logs"],
    tags:["Autonomous Agents","Node.js","PostgreSQL","Tailwind","WebSockets"],gradient:"linear-gradient(135deg, #170725 0%, #311042 100%)"
  },
  {
    id:"p4",category:"applications",catLabel:"Applications",title:"Client Workspace & Workflow Tool",
    desc:"Custom internal management portal built to streamline client communications, project milestones, and asset sharing.",
    fullDetails:"A centralized client portal and internal asset sharing hub created to replace disjointed email chains. Features interactive Kanban milestone tracking, encrypted file uploads, asynchronous review commenting, and milestone sign-off workflows.",
    clientType:"Digital Creative Studio",
    highlights:["Interactive Kanban boards with drag-and-drop state transitions","Secure direct-to-cloud asset storage with presigned URLs","Threaded review comments with inline design timestamp pinning","Instant notification dispatch via webhook & email automations"],
    tags:["React","State Management","Workflow Engine","Node.js"],gradient:"linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)"
  },
  {
    id:"p5",category:"video",catLabel:"Video Editing",title:"Cinematic Product Promo & Motion",
    desc:"High-retention commercial video edit featuring custom motion graphics, sound design, and rhythm-synced visual pacing.",
    fullDetails:"A flagship promotional film crafted to introduce high-tier tech hardware. Features precision rhythm cuts synced to custom music pacing, 3D kinetic typography, spatial sound design, and Hollywood-grade color grading tailored for 4K digital showcases.",
    clientType:"Hardware Tech Brand",
    highlights:["Precision cut-to-beat synchronization for maximum commercial engagement","Custom After Effects 3D kinetic title animation & HUD overlays","Layered spatial sound design with custom foley and sub-bass impacts","Rec.709 & HDR wide-gamut cinematic color grade master"],
    tags:["Premiere Pro","After Effects","Sound Design","Motion Graphics","4K HDR"],gradient:"linear-gradient(135deg, #1c0a00 0%, #451a03 100%)"
  },
  {
    id:"p6",category:"video",catLabel:"Video Editing",title:"Social Media Brand Narrative Reels",
    desc:"Fast-paced, hook-driven short-form video series crafted for high engagement across modern digital platforms.",
    fullDetails:"A strategic viral video campaign engineered specifically for modern vertical discovery algorithms. Utilizes 3-second hook retention techniques, dynamic motion zooms, auto-timed subtitles, and high-energy sound accents to generate millions of organic impressions.",
    clientType:"Digital Media Network",
    highlights:["First 3-second retention hooks engineered to reduce feed drop-offs","Custom dynamic subtitle animations with highlight keyword accents","Pacing optimized for vertical 9:16 mobile viewing environments","Generated over 1.2M+ organic views across campaign release"],
    tags:["Short-form Video","Color Grading","Retention Editing","Viral Hooks"],gradient:"linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)"
  },
  {
    id:"p7",category:"design",catLabel:"Graphic Design",title:"Complete Brand Identity & Guidelines",
    desc:"End-to-end branding system including logo design, color hierarchy, brand typography, and social media presentation kits.",
    fullDetails:"A cohesive brand identity ecosystem constructed from mathematical grid foundations. Encompasses geometric logo construction, high-contrast color palette hierarchies, custom typographic pairing, marketing collateral templates, and comprehensive brand guidelines.",
    clientType:"AI Innovation Startup",
    highlights:["Geometric logo mark constructed on golden ratio circular grids","Comprehensive digital & print brand guideline manual (60+ pages)","Multi-channel social media asset kit with modular Figma components","Accessible color contrast ratios conforming to WCAG AAA standards"],
    tags:["Figma","Photoshop","Brand System","Typography","Illustrator"],gradient:"linear-gradient(135deg, #170338 0%, #2e1065 100%)"
  },
  {
    id:"p8",category:"design",catLabel:"Graphic Design",title:"High-Converting UI/UX Concept",
    desc:"Clean, user-centric interface design for web applications focusing on effortless navigation and conversion architecture.",
    fullDetails:"A human-centered web application interface designed to eliminate cognitive friction. Features modular design components, clear visual hierarchies, ergonomic touch targets, and frictionless conversion paths validated through user behavioral testing.",
    clientType:"SaaS Enterprise Product",
    highlights:["End-to-end Figma prototype with interactive user flow states","Design token system integrated directly into front-end CSS variables","Frictionless onboarding flow driving a +42% conversion improvement","Fully responsive wireframes across desktop, tablet, and mobile"],
    tags:["UI/UX Design","Wireframing","Prototyping","Design System"],gradient:"linear-gradient(135deg, #021a19 0%, #042f2e 100%)"
  }
];

const renderThumbMockup=(id)=>{
  if(id==="p1"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#0b0f19",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsx("path",{d:"M12 20C12 15.58 15.58 12 20 12H340C344.42 12 348 15.58 348 20V34H12V20Z",fill:"#151d2f"}),
      T.jsx("circle",{cx:"26",cy:"23",r:"3.5",fill:"#ef4444",opacity:"0.8"}),
      T.jsx("circle",{cx:"37",cy:"23",r:"3.5",fill:"#eab308",opacity:"0.8"}),
      T.jsx("circle",{cx:"48",cy:"23",r:"3.5",fill:"#22c55e",opacity:"0.8"}),
      T.jsx("rect",{x:"72",y:"18",width:"160",height:"10",rx:"5",fill:"#0b0f19",opacity:"0.6"}),
      T.jsx("rect",{x:"28",y:"50",width:"130",height:"14",rx:"4",fill:"#ffffff",opacity:"0.9"}),
      T.jsx("rect",{x:"28",y:"70",width:"100",height:"8",rx:"3",fill:"#64748b"}),
      T.jsx("rect",{x:"28",y:"86",width:"60",height:"14",rx:"4",fill:"#ccff00"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"175",y:"48",width:"160",height:"88",rx:"6",fill:"#151d2f",stroke:"rgba(255,255,255,0.08)"}),
        T.jsx("path",{d:"M190 115L220 95L250 102L280 72L318 64",stroke:"#38bdf8",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),
        T.jsx("circle",{cx:"318",cy:"64",r:"3.5",fill:"#ccff00"}),
        T.jsx("rect",{x:"190",y:"58",width:"45",height:"6",rx:"3",fill:"#64748b"})
      ]}),
      T.jsx("rect",{x:"28",y:"112",width:"40",height:"40",rx:"5",fill:"#151d2f"}),
      T.jsx("rect",{x:"76",y:"112",width:"40",height:"40",rx:"5",fill:"#151d2f"}),
      T.jsx("rect",{x:"124",y:"112",width:"40",height:"40",rx:"5",fill:"#151d2f"}),
      T.jsx("rect",{x:"28",y:"162",width:"140",height:"12",rx:"3",fill:"#1e293b",opacity:"0.5"}),
      T.jsx("rect",{x:"175",y:"146",width:"160",height:"28",rx:"4",fill:"#1e293b",opacity:"0.5"})
    ]});
  }
  if(id==="p2"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#041f18",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"24",rx:"6",fill:"#063228"}),
      T.jsx("rect",{x:"28",y:"19",width:"50",height:"10",rx:"3",fill:"#ccff00",opacity:"0.9"}),
      T.jsx("rect",{x:"90",y:"19",width:"130",height:"10",rx:"5",fill:"#041f18"}),
      T.jsx("circle",{cx:"330",cy:"24",r:"5",fill:"#ccff00"}),
      T.jsx("rect",{x:"26",y:"46",width:"308",height:"34",rx:"6",fill:"#064e3b",stroke:"rgba(204,255,0,0.25)"}),
      T.jsx("rect",{x:"42",y:"58",width:"120",height:"10",rx:"3",fill:"#ffffff"}),
      T.jsx("rect",{x:"270",y:"55",width:"50",height:"16",rx:"4",fill:"#ccff00"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"26",y:"90",width:"94",height:"88",rx:"6",fill:"#063228"}),
        T.jsx("rect",{x:"36",y:"98",width:"74",height:"42",rx:"4",fill:"#0b4638"}),
        T.jsx("rect",{x:"36",y:"146",width:"50",height:"8",rx:"3",fill:"#ffffff"}),
        T.jsx("rect",{x:"36",y:"158",width:"32",height:"10",rx:"2",fill:"#ccff00"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"133",y:"90",width:"94",height:"88",rx:"6",fill:"#063228"}),
        T.jsx("rect",{x:"143",y:"98",width:"74",height:"42",rx:"4",fill:"#0b4638"}),
        T.jsx("rect",{x:"143",y:"146",width:"50",height:"8",rx:"3",fill:"#ffffff"}),
        T.jsx("rect",{x:"143",y:"158",width:"32",height:"10",rx:"2",fill:"#ccff00"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"240",y:"90",width:"94",height:"88",rx:"6",fill:"#063228"}),
        T.jsx("rect",{x:"250",y:"98",width:"74",height:"42",rx:"4",fill:"#0b4638"}),
        T.jsx("rect",{x:"250",y:"146",width:"50",height:"8",rx:"3",fill:"#ffffff"}),
        T.jsx("rect",{x:"250",y:"158",width:"32",height:"10",rx:"2",fill:"#ccff00"})
      ]})
    ]});
  }
  if(id==="p3"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#12061e",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsx("rect",{x:"12",y:"12",width:"46",height:"176",fill:"#1d0c2e"}),
      T.jsx("circle",{cx:"35",cy:"32",r:"7",fill:"#ccff00"}),
      T.jsx("rect",{x:"25",y:"55",width:"20",height:"4",rx:"2",fill:"#a855f7"}),
      T.jsx("rect",{x:"25",y:"72",width:"20",height:"4",rx:"2",fill:"#64748b"}),
      T.jsx("rect",{x:"25",y:"89",width:"20",height:"4",rx:"2",fill:"#64748b"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"68",y:"24",width:"78",height:"40",rx:"5",fill:"#200d34",stroke:"rgba(168,85,247,0.25)"}),
        T.jsx("rect",{x:"76",y:"32",width:"35",height:"6",rx:"2",fill:"#94a3b8"}),
        T.jsx("rect",{x:"76",y:"44",width:"45",height:"12",rx:"3",fill:"#ccff00"}),
        T.jsx("rect",{x:"154",y:"24",width:"78",height:"40",rx:"5",fill:"#200d34",stroke:"rgba(168,85,247,0.25)"}),
        T.jsx("rect",{x:"162",y:"32",width:"35",height:"6",rx:"2",fill:"#94a3b8"}),
        T.jsx("rect",{x:"162",y:"44",width:"45",height:"12",rx:"3",fill:"#c084fc"}),
        T.jsx("rect",{x:"240",y:"24",width:"94",height:"40",rx:"5",fill:"#200d34",stroke:"rgba(168,85,247,0.25)"}),
        T.jsx("rect",{x:"248",y:"32",width:"45",height:"6",rx:"2",fill:"#94a3b8"}),
        T.jsx("rect",{x:"248",y:"44",width:"55",height:"12",rx:"3",fill:"#38bdf8"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"68",y:"74",width:"266",height:"102",rx:"6",fill:"#1b0a29",stroke:"rgba(255,255,255,0.08)"}),
        T.jsx("path",{d:"M85 145C125 110 150 160 195 105C235 60 270 130 315 90",stroke:"#c084fc",strokeWidth:"2.5"}),
        T.jsx("path",{d:"M85 160C130 130 160 170 210 130C250 95 280 145 315 115",stroke:"#ccff00",strokeWidth:"2",strokeDasharray:"4 4"}),
        T.jsx("circle",{cx:"195",cy:"105",r:"4",fill:"#ccff00"}),
        T.jsx("circle",{cx:"315",cy:"90",r:"4",fill:"#a855f7"})
      ]})
    ]});
  }
  if(id==="p4"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#111113",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsx("rect",{x:"26",y:"24",width:"100",height:"12",rx:"3",fill:"#ffffff",opacity:"0.9"}),
      T.jsx("rect",{x:"265",y:"22",width:"70",height:"16",rx:"4",fill:"#ccff00"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"26",y:"50",width:"94",height:"126",rx:"6",fill:"#1a1a1e"}),
        T.jsx("rect",{x:"36",y:"58",width:"45",height:"8",rx:"2",fill:"#a1a1aa"}),
        T.jsx("rect",{x:"34",y:"74",width:"78",height:"38",rx:"4",fill:"#26262c"}),
        T.jsx("rect",{x:"42",y:"82",width:"50",height:"6",rx:"2",fill:"#ffffff"}),
        T.jsx("circle",{cx:"46",cy:"98",r:"4",fill:"#ccff00"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"133",y:"50",width:"94",height:"126",rx:"6",fill:"#1a1a1e"}),
        T.jsx("rect",{x:"143",y:"58",width:"55",height:"8",rx:"2",fill:"#ccff00"}),
        T.jsx("rect",{x:"141",y:"74",width:"78",height:"48",rx:"4",fill:"#26262c",stroke:"rgba(204,255,0,0.3)"}),
        T.jsx("rect",{x:"149",y:"82",width:"55",height:"6",rx:"2",fill:"#ffffff"}),
        T.jsx("circle",{cx:"153",cy:"108",r:"4",fill:"#38bdf8"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"240",y:"50",width:"94",height:"126",rx:"6",fill:"#1a1a1e"}),
        T.jsx("rect",{x:"250",y:"58",width:"40",height:"8",rx:"2",fill:"#22c55e"}),
        T.jsx("rect",{x:"248",y:"74",width:"78",height:"42",rx:"4",fill:"#26262c"})
      ]})
    ]});
  }
  if(id==="p5"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#140700",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"24",y:"24",width:"180",height:"96",rx:"5",fill:"#000000",stroke:"rgba(249,115,22,0.3)"}),
        T.jsx("circle",{cx:"114",cy:"72",r:"26",fill:"#7c2d12"}),
        T.jsx("polygon",{points:"110,64 122,72 110,80",fill:"#ffffff"}),
        T.jsx("rect",{x:"32",y:"32",width:"46",height:"10",rx:"2",fill:"#ea580c"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"216",y:"24",width:"118",height:"96",rx:"5",fill:"#1f0c02"}),
        T.jsx("path",{d:"M226 72L245 45L265 85L285 55L305 78L324 50",stroke:"#f97316",strokeWidth:"2"}),
        T.jsx("rect",{x:"226",y:"100",width:"98",height:"10",rx:"2",fill:"#2a1205"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"24",y:"128",width:"310",height:"50",rx:"5",fill:"#1a0a01",stroke:"rgba(255,255,255,0.08)"}),
        T.jsx("rect",{x:"32",y:"134",width:"110",height:"12",rx:"3",fill:"#ea580c"}),
        T.jsx("rect",{x:"146",y:"134",width:"80",height:"12",rx:"3",fill:"#f97316",opacity:"0.8"}),
        T.jsx("rect",{x:"230",y:"134",width:"94",height:"12",rx:"3",fill:"#ea580c"}),
        T.jsx("rect",{x:"32",y:"152",width:"140",height:"10",rx:"2",fill:"#166534"}),
        T.jsx("rect",{x:"176",y:"152",width:"148",height:"10",rx:"2",fill:"#15803d"}),
        T.jsx("line",{x1:"160",y1:"126",x2:"160",y2:"180",stroke:"#ef4444",strokeWidth:"2"}),
        T.jsx("polygon",{points:"156,126 164,126 160,132",fill:"#ef4444"})
      ]})
    ]});
  }
  if(id==="p6"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#0d0b26",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"130",y:"20",width:"100",height:"160",rx:"12",fill:"#000000",stroke:"#6366f1",strokeWidth:"2"}),
        T.jsx("rect",{x:"162",y:"26",width:"36",height:"4",rx:"2",fill:"#312e81"}),
        T.jsx("circle",{cx:"180",cy:"90",r:"22",fill:"#4f46e5",opacity:"0.5"}),
        T.jsx("polygon",{points:"176,84 186,90 176,96",fill:"#ccff00"}),
        T.jsx("rect",{x:"140",y:"145",width:"60",height:"6",rx:"2",fill:"#ffffff"}),
        T.jsx("rect",{x:"140",y:"154",width:"45",height:"5",rx:"2",fill:"#818cf8"}),
        T.jsx("rect",{x:"140",y:"165",width:"80",height:"2",fill:"#475569"}),
        T.jsx("rect",{x:"140",y:"165",width:"52",height:"2",fill:"#ccff00"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"28",y:"55",width:"86",height:"36",rx:"6",fill:"#1e1b4b",stroke:"rgba(99,102,241,0.4)"}),
        T.jsx("rect",{x:"36",y:"65",width:"68",height:"6",rx:"2",fill:"#a5b4fc"}),
        T.jsx("rect",{x:"36",y:"75",width:"45",height:"8",rx:"2",fill:"#ccff00"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"246",y:"85",width:"86",height:"36",rx:"6",fill:"#1e1b4b",stroke:"rgba(99,102,241,0.4)"}),
        T.jsx("rect",{x:"254",y:"95",width:"60",height:"6",rx:"2",fill:"#a5b4fc"}),
        T.jsx("rect",{x:"254",y:"105",width:"40",height:"8",rx:"2",fill:"#38bdf8"})
      ]})
    ]});
  }
  if(id==="p7"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#130424",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsx("circle",{cx:"95",cy:"98",r:"44",stroke:"#a855f7",strokeWidth:"1",strokeDasharray:"3 3"}),
      T.jsx("circle",{cx:"95",cy:"98",r:"28",stroke:"#ccff00",strokeWidth:"1.5"}),
      T.jsx("circle",{cx:"95",cy:"98",r:"12",stroke:"#38bdf8",strokeWidth:"1"}),
      T.jsx("line",{x1:"45",y1:"98",x2:"145",y2:"98",stroke:"rgba(255,255,255,0.2)",strokeWidth:"1"}),
      T.jsx("line",{x1:"95",y1:"48",x2:"95",y2:"148",stroke:"rgba(255,255,255,0.2)",strokeWidth:"1"}),
      T.jsx("path",{d:"M82 118V78L95 95L108 78V118",stroke:"#ffffff",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"175",y:"32",width:"155",height:"65",rx:"6",fill:"#200738",stroke:"rgba(255,255,255,0.06)"}),
        T.jsx("circle",{cx:"198",cy:"54",r:"10",fill:"#ccff00"}),
        T.jsx("circle",{cx:"226",cy:"54",r:"10",fill:"#7c3aed"}),
        T.jsx("circle",{cx:"254",cy:"54",r:"10",fill:"#38bdf8"}),
        T.jsx("circle",{cx:"282",cy:"54",r:"10",fill:"#ffffff"}),
        T.jsx("rect",{x:"194",y:"74",width:"118",height:"10",rx:"2",fill:"#a855f7",opacity:"0.7"})
      ]}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"175",y:"106",width:"155",height:"66",rx:"6",fill:"#200738",stroke:"rgba(255,255,255,0.06)"}),
        T.jsx("rect",{x:"190",y:"120",width:"70",height:"14",rx:"3",fill:"#ffffff"}),
        T.jsx("rect",{x:"190",y:"142",width:"120",height:"8",rx:"2",fill:"#a1a1aa"}),
        T.jsx("rect",{x:"190",y:"154",width:"85",height:"6",rx:"2",fill:"#64748b"})
      ]})
    ]});
  }
  if(id==="p8"){
    return T.jsxs("svg",{viewBox:"0 0 360 200",className:"dummy-mockup-svg",fill:"none",children:[
      T.jsx("rect",{x:"12",y:"12",width:"336",height:"176",rx:"8",fill:"#031f1c",stroke:"rgba(255,255,255,0.12)",strokeWidth:"1.5"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"28",y:"30",width:"86",height:"140",rx:"8",fill:"#06322e",stroke:"rgba(45,212,191,0.3)"}),
        T.jsx("rect",{x:"38",y:"42",width:"45",height:"8",rx:"2",fill:"#ffffff"}),
        T.jsx("rect",{x:"38",y:"56",width:"66",height:"26",rx:"4",fill:"#0c4a44"}),
        T.jsx("rect",{x:"38",y:"88",width:"66",height:"10",rx:"2",fill:"#0c4a44"}),
        T.jsx("rect",{x:"38",y:"104",width:"66",height:"10",rx:"2",fill:"#0c4a44"}),
        T.jsx("rect",{x:"38",y:"132",width:"66",height:"18",rx:"4",fill:"#ccff00"})
      ]}),
      T.jsx("path",{d:"M120 100H155M155 100L148 94M155 100L148 106",stroke:"#2dd4bf",strokeWidth:"2",strokeDasharray:"3 3"}),
      T.jsxs("g",{children:[
        T.jsx("rect",{x:"165",y:"30",width:"168",height:"140",rx:"8",fill:"#06322e",stroke:"rgba(45,212,191,0.3)"}),
        T.jsx("rect",{x:"180",y:"44",width:"85",height:"10",rx:"2",fill:"#ffffff"}),
        T.jsx("rect",{x:"180",y:"60",width:"138",height:"8",rx:"2",fill:"#5eead4",opacity:"0.6"}),
        T.jsx("rect",{x:"180",y:"78",width:"138",height:"16",rx:"3",fill:"#03211e",stroke:"rgba(255,255,255,0.1)"}),
        T.jsx("rect",{x:"180",y:"102",width:"138",height:"16",rx:"3",fill:"#03211e",stroke:"rgba(255,255,255,0.1)"}),
        T.jsx("rect",{x:"180",y:"128",width:"80",height:"20",rx:"4",fill:"#ccff00"}),
        T.jsx("rect",{x:"270",y:"128",width:"48",height:"20",rx:"4",fill:"#0c4a44"})
      ]})
    ]});
  }
  return null;
};

const FeaturedProjects=()=>{
  const[filter,setFilter]=et.useState("all");
  const[selectedProject,setSelectedProject]=et.useState(null);

  et.useEffect(()=>{
    const handleKeyDown=(e)=>{
      if(e.key==="Escape")setSelectedProject(null);
    };
    window.addEventListener("keydown",handleKeyDown);
    return ()=>window.removeEventListener("keydown",handleKeyDown);
  },[]);

  const filtered=filter==="all"?projectsList:projectsList.filter(p=>p.category===filter);
  const loopMultiplier=Math.max(2,Math.ceil(10/filtered.length));
  const slidingList=[];
  for(let i=0;i<loopMultiplier;i++){
    slidingList.push(...filtered);
  }

  return T.jsxs("section",{className:"portfolio-section projects-slider-section",id:"projects",children:[
    T.jsxs("div",{className:"section-inner section-wide",children:[
      T.jsx("div",{className:"projects-header-center",children:
        T.jsxs("h2",{className:"section-title projects-title-centered",children:[
          "FEATURED ",
          T.jsx("span",{className:"text-accent",children:"PROJECTS"})
        ]})
      }),
      T.jsxs("div",{className:"projects-filter-bar projects-filter-centered",children:[
        T.jsx("button",{className:`filter-tab-btn ${filter==="all"?"active":""}`,onClick:()=>setFilter("all"),children:`All Works (${projectsList.length})`}),
        T.jsx("button",{className:`filter-tab-btn ${filter==="websites"?"active":""}`,onClick:()=>setFilter("websites"),children:"Websites"}),
        T.jsx("button",{className:`filter-tab-btn ${filter==="applications"?"active":""}`,onClick:()=>setFilter("applications"),children:"Applications"}),
        T.jsx("button",{className:`filter-tab-btn ${filter==="video"?"active":""}`,onClick:()=>setFilter("video"),children:"Video Editing"}),
        T.jsx("button",{className:`filter-tab-btn ${filter==="design"?"active":""}`,onClick:()=>setFilter("design"),children:"Graphic Design"})
      ]})
    ]}),
    T.jsxs("div",{className:"projects-slider-wrapper",children:[
      T.jsx("div",{className:"slider-fade-edge fade-left"}),
      T.jsx("div",{className:"slider-fade-edge fade-right"}),
      T.jsx("div",{className:"projects-slider-track",key:filter,children:
        slidingList.map((item,idx)=>
          T.jsxs("div",{
            key:`${item.id}-${idx}`,
            className:"project-item-card slider-card clickable-card",
            onClick:()=>setSelectedProject(item),
            role:"button",
            tabIndex:0,
            title:`Click to view details for ${item.title}`,
            children:[
              T.jsxs("div",{className:"project-thumbnail",style:{background:item.gradient},children:[
                T.jsx("div",{className:"project-category-badge",children:item.catLabel}),
                T.jsx("div",{className:"card-click-pill",children:T.jsx("span",{children:"View Details ↗"})}),
                T.jsx("div",{className:"dummy-mockup-container",children:renderThumbMockup(item.id)})
              ]}),
              T.jsxs("div",{className:"project-info-body",children:[
                T.jsx("h3",{className:"project-title",children:item.title}),
                T.jsx("div",{className:"project-tech-tags",children:
                  item.tags.map((tag,tIdx)=>T.jsx("span",{key:tIdx,className:"tech-tag",children:tag}))
                })
              ]})
            ]
          })
        )
      })
    ]}),
    selectedProject&&T.jsx("div",{
      className:"project-modal-backdrop",
      onClick:()=>setSelectedProject(null),
      role:"dialog",
      "aria-modal":!0,
      children:T.jsxs("div",{
        className:"project-modal-dialog",
        onClick:e=>e.stopPropagation(),
        children:[
          T.jsx("button",{type:"button",className:"project-modal-close",onClick:()=>setSelectedProject(null),"aria-label":"Close window",children:"✕"}),
          T.jsxs("div",{className:"modal-thumbnail-banner",style:{background:selectedProject.gradient},children:[
            T.jsx("div",{className:"modal-category-badge",children:selectedProject.catLabel}),
            T.jsx("div",{className:"modal-mockup-wrap",children:renderThumbMockup(selectedProject.id)})
          ]}),
          T.jsxs("div",{className:"modal-content-body",children:[
            T.jsxs("div",{className:"modal-meta-row",children:[
              T.jsxs("span",{className:"modal-client-tag",children:[
                "✦ Client / Industry: ",
                T.jsx("strong",{children:selectedProject.clientType})
              ]}),
              T.jsx("span",{className:"modal-status-badge",children:"Completed & Verified"})
            ]}),
            T.jsx("h2",{className:"modal-project-title",children:selectedProject.title}),
            T.jsx("p",{className:"modal-project-desc",children:selectedProject.fullDetails}),
            T.jsx("div",{className:"modal-section-heading",children:"KEY HIGHLIGHTS & ARCHITECTURE"}),
            T.jsx("ul",{className:"modal-highlights-list",children:
              selectedProject.highlights.map((h,i)=>
                T.jsxs("li",{key:i,className:"modal-highlight-item",children:[
                  T.jsx("span",{className:"highlight-bullet",children:"✓"}),
                  T.jsx("span",{children:h})
                ]})
              )
            }),
            T.jsx("div",{className:"modal-section-heading",children:"TECHNOLOGIES & STACK"}),
            T.jsx("div",{className:"modal-tech-tags",children:
              selectedProject.tags.map((tag,i)=>
                T.jsx("span",{key:i,className:"tech-tag modal-tag",children:tag})
              )
            }),
            T.jsxs("div",{className:"modal-footer-actions",children:[
              T.jsxs("a",{href:"#contact",className:"modal-primary-btn",onClick:()=>setSelectedProject(null),children:[
                T.jsx("span",{children:"Discuss Similar Project"}),
                T.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2.4",children:
                  T.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})
                })
              ]}),
              T.jsx("button",{type:"button",className:"modal-secondary-btn",onClick:()=>setSelectedProject(null),children:"Close Window"})
            ]})
          ]})
        ]
      })
    })
  ]});
};

const Contact=()=>{
  const[submitted,setSubmitted]=et.useState(!1);
  const[formData,setFormData]=et.useState({
    name:"",email:"",service:"Web & Software Development",message:""
  });
  const handleSubmit=ev=>{
    ev.preventDefault();
    setSubmitted(!0);
    setTimeout(()=>{
      setFormData({name:"",email:"",service:"Web & Software Development",message:""});
      setSubmitted(!1);
    },4500);
  };
  return T.jsx("section",{className:"portfolio-section",id:"contact",children:
    T.jsxs("div",{className:"section-inner section-wide",children:[
      T.jsxs("h2",{className:"section-title",children:[
        "LET'S BUILD SOMETHING ",
        T.jsx("span",{className:"text-accent",children:"MEANINGFUL"})
      ]}),
      T.jsx("p",{className:"section-subtitle",children:"Have an idea for a website, software project, or creative video? I'm always interested in exploring new ideas and creating work that combines technology with creativity."}),
      T.jsxs("div",{className:"contact-grid-layout",children:[
        T.jsxs("div",{className:"contact-content-col",children:[
          T.jsx("p",{className:"contact-lead-sub",children:"Feel free to reach out directly via email or connect across professional platforms."}),
          T.jsx("div",{className:"contact-form-card",children:
            T.jsxs("form",{onSubmit:handleSubmit,children:[
              T.jsxs("div",{className:"form-group",children:[
                T.jsx("label",{className:"form-label",children:"Your Name"}),
                T.jsx("input",{type:"text",required:!0,placeholder:"e.g. John Doe",className:"form-input",value:formData.name,onChange:e=>setFormData({...formData,name:e.target.value})})
              ]}),
              T.jsxs("div",{className:"form-group",children:[
                T.jsx("label",{className:"form-label",children:"Your Email"}),
                T.jsx("input",{type:"email",required:!0,placeholder:"e.g. john@example.com",className:"form-input",value:formData.email,onChange:e=>setFormData({...formData,email:e.target.value})})
              ]}),
              T.jsxs("div",{className:"form-group",children:[
                T.jsx("label",{className:"form-label",children:"Project Type / Service"}),
                T.jsxs("select",{className:"form-select",value:formData.service,onChange:e=>setFormData({...formData,service:e.target.value}),children:[
                  T.jsx("option",{value:"Web & Software Development",children:"Web & Software Development"}),
                  T.jsx("option",{value:"Business & Digital Solutions",children:"Business & Digital Solutions"}),
                  T.jsx("option",{value:"AI-Powered Development",children:"AI-Powered Development"}),
                  T.jsx("option",{value:"Creative Digital Content",children:"Creative Digital Content (Video / Design)"}),
                  T.jsx("option",{value:"General Consultation",children:"General Discussion & Ideation"})
                ]})
              ]}),
              T.jsxs("div",{className:"form-group",children:[
                T.jsx("label",{className:"form-label",children:"Your Message"}),
                T.jsx("textarea",{required:!0,rows:4,placeholder:"Tell me a bit about your idea, timeline, or what you'd like to build...",className:"form-textarea",value:formData.message,onChange:e=>setFormData({...formData,message:e.target.value})})
              ]}),
              T.jsxs("button",{type:"submit",className:"form-submit-btn",children:[
                T.jsx("span",{children:"Send Message"}),
                T.jsx("span",{style:{fontSize:"1.1rem"},children:"✦"})
              ]}),
              submitted&&T.jsxs("div",{className:"form-success-banner",children:[
                "✓ Thank you, ",
                formData.name||"friend",
                "! Your message has been received. I'll get back to you shortly!"
              ]})
            ]})
          })
        ]}),
        T.jsx("div",{className:"contact-sculpture-anchor","aria-hidden":"true"})
      ]})
    ]})
  });
};

const Footer=()=>{
  return T.jsx("footer",{className:"main-footer",children:
    T.jsxs("div",{className:"footer-inner",children:[
      T.jsxs("div",{className:"footer-copy",children:[
        "Designed & Engineered by ",
        T.jsx("span",{children:"Minhaj Ahmed Pabel"}),
        " • 2026. All rights reserved."
      ]}),
      T.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1.5rem"},children:
        T.jsxs("a",{href:"#hero",className:"footer-back-top",children:[
          T.jsx("span",{children:"Back to top"}),
          T.jsx("span",{children:"↑"})
        ]})
      })
    ]})
  });
};

const SocialIcons=()=>{
  return T.jsx("aside",{className:"social-sidebar",children:
    T.jsxs("div",{className:"social-links",children:[
      T.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",title:"GitHub","aria-label":"GitHub",children:
        T.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:
          T.jsx("path",{d:"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"})
        })
      }),
      T.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",title:"LinkedIn","aria-label":"LinkedIn",children:
        T.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:
          T.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"})
        })
      }),
      T.jsx("a",{href:"https://behance.net",target:"_blank",rel:"noopener noreferrer",className:"social-icon-btn",title:"Behance","aria-label":"Behance",children:
        T.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:
          T.jsx("path",{d:"M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.197 0-5.422-2.197-5.422-5.488 0-3.197 2.225-5.512 5.422-5.512 3.23 0 5.178 2.302 5.178 5.488 0 .445-.045.92-.091 1.21h-7.798c.117 1.488 1.157 2.327 2.711 2.327 1.144 0 1.954-.486 2.378-1.025h2.348zm-2.457-4.148c-.097-1.164-.991-1.927-2.435-1.927-1.428 0-2.33.763-2.483 1.927h4.918zm-13.269-8.852h-8v18h8.337c3.424 0 5.663-1.616 5.663-4.802 0-2.001-1.127-3.37-2.73-3.968 1.341-.659 2.052-1.905 2.052-3.489 0-3.34-2.502-5.741-5.322-5.741zm-4.75 3.321h4.156c1.696 0 2.769.877 2.769 2.458 0 1.549-1.073 2.443-2.769 2.443h-4.156v-4.901zm0 7.822h4.542c1.884 0 3.013.978 3.013 2.732 0 1.83-1.129 2.809-3.013 2.809h-4.542v-5.541z"})
        })
      })
    ]})
  });
};

const Rd=()=>{
  const isViewParam=typeof window!=="undefined"&&window.location.search.includes("view=");
  const viewSec=isViewParam?window.location.search.split("view=")[1]?.split("&")[0]:null;
  const isNoSplash=typeof window!=="undefined"&&(window.location.search.includes("nosplash=1")||window.location.search.includes("view="));
  const[showSplash,setShowSplash]=et.useState(!isNoSplash);
  return T.jsxs(T.Fragment,{children:[
    !showSplash&&T.jsx(GlobalParticleSculpture,{}),
    showSplash&&T.jsx(Ld,{onComplete:()=>setShowSplash(!1)}),
    T.jsxs("main",{className:"main-content "+(showSplash?"hidden":"visible"),style:{position:"relative",zIndex:10},children:[
      T.jsx(Navbar,{}),
      viewSec==="about"?T.jsx(About,{}):
      viewSec==="journey"?T.jsx(Journey,{}):
      viewSec==="projects"?T.jsx(FeaturedProjects,{}):
      viewSec==="contact"?T.jsx(Contact,{}):
      T.jsxs(T.Fragment,{children:[
        T.jsx(Hero,{}),
        T.jsx(About,{}),
        T.jsx(Journey,{}),
        T.jsx(FeaturedProjects,{}),
        T.jsx(Contact,{}),
        T.jsx(Footer,{})
      ]}),
      T.jsx(SocialIcons,{})
    ]})
  ]});
};

tc(document.getElementById("root")).render(T.jsx(et.StrictMode,{children:T.jsx(Rd,{})}));
"""

    out_js = base_runtime + app_js
    with open(orig_js_path, "w", encoding="utf-8") as f:
        f.write(out_js)
    print(f"Wrote JS bundle: {len(out_js)} bytes to {orig_js_path}")

if __name__ == "__main__":
    build()
