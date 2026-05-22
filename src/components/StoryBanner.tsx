import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function StoryBanner() {
  // Reference for the two video elements
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // States for sequential playback and mute control
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isMuted, setIsMuted] = useState(true);

  // Sync mute state changes to both video elements in background without resetting time
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.muted = isMuted;
    }
    if (video2Ref.current) {
      video2Ref.current.muted = isMuted;
    }
  }, [isMuted]);

  // Coordinate the transition when active video switches
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (activeVideo === 1) {
      if (v1) {
        v1.currentTime = 0;
        const playPromise = v1.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Video 1 playback attempt:", err);
          });
        }
      }
      if (v2) {
        v2.pause();
      }
    } else {
      if (v2) {
        v2.currentTime = 0;
        const playPromise = v2.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Video 2 playback attempt:", err);
          });
        }
      }
      if (v1) {
        v1.pause();
      }
    }
  }, [activeVideo]);

  // Bulletproof interaction listener to bypass aggressive mobile/browser autoplay restrictions
  useEffect(() => {
    const startAutoplay = () => {
      const activeElement = activeVideo === 1 ? video1Ref.current : video2Ref.current;
      if (activeElement && activeElement.paused) {
        activeElement.play().catch(err => {
          console.log("User gesture auto-play attempt:", err);
        });
      }
    };

    // Listen to various user engagement signals to kick off the video if blocked
    window.addEventListener("touchstart", startAutoplay, { once: true });
    window.addEventListener("click", startAutoplay, { once: true });
    window.addEventListener("scroll", startAutoplay, { once: true });
    window.addEventListener("mousemove", startAutoplay, { once: true });

    // Also trigger immediately on mount/load
    startAutoplay();

    return () => {
      window.removeEventListener("touchstart", startAutoplay);
      window.removeEventListener("click", startAutoplay);
      window.removeEventListener("scroll", startAutoplay);
      window.removeEventListener("mousemove", startAutoplay);
    };
  }, [activeVideo]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section id="banner-reels" className="w-full relative min-h-[520px] md:min-h-[640px] md:h-auto pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 flex items-center justify-center bg-black overflow-hidden border-y border-orange-100/20">
      
      {/* Background Videos: Automated sequential cross-fading players */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-black">
        
        {/* Video 1 Container (Night Vlog) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}>
          <video
            ref={video1Ref}
            src="https://drive.google.com/uc?export=download&id=1tFL37dsyy-eZgO70j6LPGHPIaxoVs73P"
            className="w-full h-full object-cover select-none scale-105"
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={() => setActiveVideo(2)}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Video 2 Container (Day Vlog) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeVideo === 2 ? "opacity-100 z-0" : "opacity-0 -z-10"
        }`}>
          <video
            ref={video2Ref}
            src="https://drive.google.com/uc?export=download&id=1kvU_lDGX_ZiD87xWQKVXao9zAO4lxn2N"
            className="w-full h-full object-cover select-none scale-105"
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={() => setActiveVideo(1)}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

      </div>

      {/* Cinematic Tint/Gradients to wrap the background seamlessly */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none -z-10" />

      {/* Foreground Content Card Centered on Top of Background Videos */}
      <div className="relative z-10 max-w-4xl w-[calc(100%-2rem)] mx-auto px-4 py-6 sm:py-8 md:py-12 md:px-12 bg-black/65 backdrop-blur-md rounded-3xl border border-white/10 text-center flex flex-col items-center gap-4 sm:gap-6 shadow-2xl">
        
        {/* Cinematic Header */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Conforto e segurança real que o seu <span className="text-brand-orange font-black relative inline-block">pet sente!<span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-orange/30 rounded"></span></span>
        </h2>

        {/* Immersive Sub-description */}
        <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-2xl leading-relaxed">
          Nenhum pet merece ir no porta-malas ou estressado em caixas apertadas. Veja as filmagens reais dos nossos passageiros de quatro patas na estrada: ar-condicionado na temperatura perfeita, proteção higienizada com capas impermeáveis e cinto peitoral adaptado.
        </p>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 w-full justify-center max-w-xl text-left text-xs text-white my-1">
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
            <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
            <span className="font-semibold text-xs">Climatização Perfeita ❄️</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
            <CheckCircle2 size={16} className="text-brand-turquoise shrink-0" />
            <span className="font-semibold text-xs">Cinto Peitoral Adaptado 🐕</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
            <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
            <span className="font-semibold text-xs">Capas Premium 🧼</span>
          </div>
        </div>

        {/* Subtle Vlog Audio Control Strip (Unified) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 border-t border-white/10 pt-4 w-full">
          <button
            onClick={toggleMute}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              isMuted ? "bg-white/10 hover:bg-white/20 text-white" : "bg-brand-orange text-white ring-2 ring-brand-orange/30 animate-pulse"
            }`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? "🔇 Vídeo sem som (Clique para Ativar)" : "🔊 Desativar Som do Vídeo"}</span>
          </button>
        </div>

        {/* CTA Link to Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg transition-all text-xs sm:text-sm group"
          >
            <span>Fazer Orçamento Grátis</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

    </section>
  );
}
