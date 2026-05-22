import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, Heart, Smile, Moon, Sun, Wind, ShieldCheck, Award } from "lucide-react";

export default function StoryBanner() {
  // Reference for the two video elements
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // High-reliability direct-play stream URLs for happy dogs in cars to prevent Google Drive quota blocks/redirect bugs on Vercel
  const [video1Src, setVideo1Src] = useState("https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022718e0df3d3522ba0a0ed8ee6ec02&profile_id=165&oauth2_token_id=57447761");
  const [video2Src, setVideo2Src] = useState("https://player.vimeo.com/external/435674703.sd.mp4?s=7f3aa1d1e174915b03511171852d43e5ec726e85&profile_id=165&oauth2_token_id=57447761");

  // States for sequential playback and video buffering/loading
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // Fallback handlers if any stream has issues (pointing to alternate open-source CDN streams)
  const handleVideo1Error = () => {
    console.log("Video 1 stream error. Activating backup stream.");
    setVideo1Src("https://player.vimeo.com/external/435674703.sd.mp4?s=7f3aa1d1e174915b03511171852d43e5ec726e85&profile_id=165&oauth2_token_id=57447761");
  };

  const handleVideo2Error = () => {
    console.log("Video 2 stream error. Activating backup stream.");
    setVideo2Src("https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022718e0df3d3522ba0a0ed8ee6ec02&profile_id=165&oauth2_token_id=57447761");
  };

  // Coordinate the transition when active video switches, ensuring strict muted attributes
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    setIsVideoLoading(true);

    if (activeVideo === 1) {
      if (v1) {
        v1.muted = true;
        v1.currentTime = 0;
        const playPromise = v1.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Video 1 autoplay was prevented:", err);
            setIsVideoLoading(false);
          });
        }
      }
      if (v2) {
        v2.pause();
      }
    } else {
      if (v2) {
        v2.muted = true;
        v2.currentTime = 0;
        const playPromise = v2.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Video 2 autoplay was prevented:", err);
            setIsVideoLoading(false);
          });
        }
      }
      if (v1) {
        v1.pause();
      }
    }
  }, [activeVideo]);

  // Bulletproof user gesture event listener to trigger audio-less autoplay on touch or interaction
  useEffect(() => {
    const forcePlay = () => {
      const activeElement = activeVideo === 1 ? video1Ref.current : video2Ref.current;
      if (activeElement) {
        activeElement.muted = true;
        if (activeElement.paused) {
          activeElement.play().catch(err => {
            console.log("User interaction play fallback failed:", err);
          });
        }
      }
    };

    window.addEventListener("touchstart", forcePlay, { once: true });
    window.addEventListener("click", forcePlay, { once: true });
    window.addEventListener("scroll", forcePlay, { once: true });
    window.addEventListener("mousemove", forcePlay, { once: true });

    // Try starting immediately
    forcePlay();

    return () => {
      window.removeEventListener("touchstart", forcePlay);
      window.removeEventListener("click", forcePlay);
      window.removeEventListener("scroll", forcePlay);
      window.removeEventListener("mousemove", forcePlay);
    };
  }, [activeVideo, video1Src, video2Src]);

  return (
    <section id="banner-reels" className="w-full relative min-h-[580px] md:min-h-[660px] md:h-auto pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-24 flex items-center justify-center bg-zinc-950 overflow-hidden border-y-4 border-dashed border-brand-orange/20">
      
      {/* Background Videos: Automated sequential cross-fading players */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-zinc-950">
        
        {/* Loader / Skeleton State Over Video Background */}
        {isVideoLoading && (
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md z-20 flex flex-col items-center justify-center transition-all duration-300">
            {/* Pulsing skeleton container for the video area */}
            <div className="absolute inset-0 bg-zinc-900/60 animate-pulse pointer-events-none" />
            
            <div className="relative flex flex-col items-center gap-3">
              {/* Dual nested spinning indicators in brand colors */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-brand-orange/20 border-t-brand-orange animate-spin absolute" />
                <div className="w-8 h-8 rounded-full border-4 border-brand-turquoise/20 border-b-brand-turquoise animate-spin absolute" style={{ animationDirection: "reverse", animationDuration: "1s" }} />
              </div>
              <span className="text-xs font-black tracking-widest text-zinc-400 uppercase animate-pulse">
                Carregando Viagem...
              </span>
            </div>
          </div>
        )}

        {/* Video 1 Container (Night Vlog) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}>
          <video
            ref={video1Ref}
            src={video1Src}
            className="w-full h-full object-cover select-none scale-105"
            autoPlay
            muted={true}
            playsInline={true}
            preload="auto"
            onError={handleVideo1Error}
            onPlay={() => setIsVideoLoading(false)}
            onPlaying={() => setIsVideoLoading(false)}
            onWaiting={() => setIsVideoLoading(true)}
            onCanPlay={() => setIsVideoLoading(false)}
            onLoadedData={() => setIsVideoLoading(false)}
            onEnded={() => setActiveVideo(2)}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Video 2 Container (Day Vlog) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeVideo === 2 ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}>
          <video
            ref={video2Ref}
            src={video2Src}
            className="w-full h-full object-cover select-none scale-105"
            autoPlay
            muted={true}
            playsInline={true}
            preload="auto"
            onError={handleVideo2Error}
            onPlay={() => setIsVideoLoading(false)}
            onPlaying={() => setIsVideoLoading(false)}
            onWaiting={() => setIsVideoLoading(true)}
            onCanPlay={() => setIsVideoLoading(false)}
            onLoadedData={() => setIsVideoLoading(false)}
            onEnded={() => setActiveVideo(1)}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

      </div>

      {/* Cinematic Tint/Gradients to wrap the background seamlessly */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1.5px] pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none -z-10" />

      {/* Playful Decorative floating icons - visible on desktop, no emojis */}
      <div className="absolute top-[15%] left-[5%] text-brand-orange/20 select-none animate-bounce hidden lg:block" style={{ animationDuration: '4s' }}>
        <Heart size={44} className="fill-brand-orange/10" />
      </div>
      <div className="absolute bottom-[20%] right-[6%] text-brand-turquoise/20 select-none animate-bounce hidden lg:block" style={{ animationDuration: '6s' }}>
        <Smile size={48} />
      </div>
      <div className="absolute top-[25%] right-[10%] text-white/10 select-none animate-pulse hidden lg:block">
        <Sparkles size={40} className="fill-white/5" />
      </div>
      <div className="absolute bottom-[15%] left-[8%] text-brand-orange/15 select-none animate-spin hidden lg:block" style={{ animationDuration: '12s' }}>
        <Award size={44} />
      </div>

      {/* Foreground Content Card Centered on Top of Background Videos */}
      <div className="relative z-10 max-w-4xl w-[calc(100%-2rem)] mx-auto px-4 py-8 sm:px-8 sm:py-10 md:py-12 md:px-12 bg-zinc-900/85 backdrop-blur-lg rounded-[2.5rem] border-4 border-brand-orange/30 text-center flex flex-col items-center gap-5 sm:gap-6 shadow-[0_0_40px_rgba(242,101,34,0.15)] overflow-hidden">
        
        {/* Playful Floating Badge at the very top */}
        <div className="bg-gradient-to-r from-brand-orange to-amber-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
          <Sparkles size={11} className="fill-white" />
          <span>Aventuras a Bordo | Diário de Viagens</span>
        </div>

        {/* Dynamic Story Indicator Bars (Instagram/TikTok style!) */}
        <div className="w-full max-w-sm flex gap-2.5 px-3">
          <button 
            onClick={() => setActiveVideo(1)}
            aria-label="Ver Diário Noturno"
            className="flex-1 h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
          >
            <div className={`h-full rounded-full transition-all duration-300 ${
              activeVideo === 1 ? 'bg-brand-orange w-full shadow-[0_0_8px_#f26522]' : 'bg-white/20 w-full hover:bg-white/40'
            }`} />
          </button>
          <button 
            onClick={() => setActiveVideo(2)}
            aria-label="Ver Diário Diurno"
            className="flex-1 h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
          >
            <div className={`h-full rounded-full transition-all duration-300 ${
              activeVideo === 2 ? 'bg-brand-turquoise w-full shadow-[0_0_8px_#00c2cb]' : 'bg-white/20 w-full hover:bg-white/40'
            }`} />
          </button>
        </div>

        {/* Playful Active Video Feed Tabs */}
        <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 items-center gap-1.5">
          <button
            onClick={() => setActiveVideo(1)}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeVideo === 1 
                ? "bg-brand-orange text-white shadow-md transform scale-105" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Moon size={12} />
            <span>Diário da Noite</span>
          </button>
          <button
            onClick={() => setActiveVideo(2)}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeVideo === 2 
                ? "bg-brand-turquoise text-white shadow-md transform scale-105" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sun size={12} />
            <span>Passeio do Dia</span>
          </button>
        </div>
        
        {/* Playful Cinematic Header */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight max-w-3xl">
          Conforto de <span className="text-brand-orange text-shadow-sm font-black inline-block underline decoration-wavy decoration-brand-turquoise decoration-2 underline-offset-4">Rei</span> e Segurança máxima para o seu <span className="text-brand-turquoise font-black relative inline-block">pet sentir!<span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-turquoise/30 rounded"></span></span>
        </h2>

        {/* Immersive Sub-description with friendly vibe */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed font-medium">
          Diga adeus ao porta-malas apertado ou caixas barulhentas! Veja a felicidade real dos nossos passageiros peludos viajando em alto estilo: clima controlado, cintos peitorais acolchoados e cabine totalmente higienizada.
        </p>

        {/* Trust Indicators Grid: High-density, playful pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 w-full justify-center max-w-xl text-left text-xs text-white my-1">
          <div className="flex items-center gap-3 bg-zinc-950/80 border border-brand-orange/20 px-4 py-3 rounded-2xl hover:border-brand-orange/50 transition-all hover:scale-102">
            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
              <Wind size={16} />
            </div>
            <div>
              <span className="font-extrabold block text-white text-xs">Climatização Perfeita</span>
              <span className="text-[10px] text-zinc-400">Na temperatura ideal</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-950/80 border border-brand-turquoise/20 px-4 py-3 rounded-2xl hover:border-brand-turquoise/50 transition-all hover:scale-102">
            <div className="w-8 h-8 rounded-full bg-brand-turquoise/10 flex items-center justify-center shrink-0 text-brand-turquoise">
              <ShieldCheck size={16} />
            </div>
            <div>
              <span className="font-extrabold block text-white text-xs">Cinto de Segurança</span>
              <span className="text-[10px] text-zinc-400">Acolchoado e seguro</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-950/80 border border-brand-orange/20 px-4 py-3 rounded-2xl hover:border-brand-orange/50 transition-all hover:scale-102">
            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="font-extrabold block text-white text-xs">Capas Premium</span>
              <span className="text-[10px] text-zinc-400">Impermeáveis e limpas</span>
            </div>
          </div>
        </div>



        {/* CTA Link to Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-1">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-xl transition-all text-xs sm:text-sm group hover:scale-105 active:scale-95"
          >
            <span>Reservar Viagem Feliz</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

    </section>
  );
}

