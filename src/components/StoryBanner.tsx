import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, HelpCircle, Eye, Moon, Sun, Monitor, Film, PlayCircle } from "lucide-react";

export default function StoryBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playlist = [
    {
      id: 1,
      title: "Passeio do Dia",
      tag: "DIVERSÃO",
      duration: "0:12",
      description: "Clima ensolarado com ar monitorado de alto fluxo e absoluto conforto no cinto peitoral.",
      src: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f3aa1d1e174915b03511171852d43e5ec726e85&profile_id=165&oauth2_token_id=57447761",
      poster: "/src/assets/images/hero_pet_travel_1779480808070.png",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      id: 2,
      title: "Diário Noturno",
      tag: "ACONCHEGO",
      duration: "0:15",
      description: "Suavidade nas ruas vazias, luzes reguladas, trilha relaxante e aconchego total para sono profundo.",
      src: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022718e0df3d3522ba0a0ed8ee6ec02&profile_id=165&oauth2_token_id=57447761",
      poster: "/src/assets/images/about_pet_transport_1779480827514.png",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    }
  ];

  const [activeTrack, setActiveTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  // Load new track source smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsVideoLoading(true);
    video.src = activeTrack.src;
    video.load();
    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsVideoLoading(false);
        })
        .catch((err) => {
          console.log("Autoplay blocked. Requiring interaction:", err);
          setIsPlaying(false);
          setIsVideoLoading(false);
        });
    }
  }, [activeTrack]);

  // Sync play state
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.muted = isMuted;
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  // Sync mute state
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Progress update callback
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.duration) {
      setDuration(video.duration);
    }
  };

  // Click handler on timeline scrubber
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <section id="banner-reels" className="w-full relative py-20 sm:py-28 bg-zinc-950 overflow-hidden border-y border-zinc-900">
      
      {/* Decorative ambient high-contrast backdrops */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-turquoise/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Minimalist Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-brand-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <Film size={12} className="animate-pulse" />
            <span className="tracking-wider uppercase text-[10px]">Cine Vou de Pet</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Nossa cabine em <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange to-yellow-500">alta resolução</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-zinc-400 font-medium">
            Assista a gravação real das viagens nos períodos do dia e da noite. Veja a tranquilidade e a segurança que oferecemos para o seu melhor amigo.
          </p>
        </div>

        {/* Master Cinema Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Cinematic Video Player (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/9] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl group">
              
              {/* Overlay Glass Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 pointer-events-none" />

              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                playsInline={true}
                preload="auto"
                poster={activeTrack.poster}
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => {
                  setIsPlaying(true);
                  setIsVideoLoading(false);
                }}
                onPlaying={() => {
                  setIsPlaying(true);
                  setIsVideoLoading(false);
                }}
                onWaiting={() => setIsVideoLoading(true)}
                onCanPlay={() => setIsVideoLoading(false)}
                onLoadedData={() => setIsVideoLoading(false)}
              />

              {/* Central Glowing Soft Play Button when paused */}
              {!isPlaying && !isVideoLoading && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 cursor-pointer transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transform scale-100 hover:scale-110 active:scale-95 transition-all shadow-xl">
                    <Play size={32} className="fill-white ml-1.5" />
                  </div>
                  <span className="mt-4 text-xs font-black tracking-widest text-zinc-200 uppercase select-none">
                    Clique para iniciar o vídeo
                  </span>
                </div>
              )}

              {/* Spinner loader over video */}
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 z-20">
                  <div className="w-10 h-10 rounded-full border-4 border-brand-orange/20 border-t-brand-orange animate-spin" />
                </div>
              )}

              {/* Inside Player Controls Bar (Floating Glassmorphism HUD) */}
              <div className="absolute bottom-4 inset-x-4 z-20 bg-zinc-950/70 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col gap-3 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                
                {/* Timeline Progress Bar scrubber */}
                <div 
                  className="w-full h-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer relative group/scrub flex items-center"
                  onClick={handleScrub}
                >
                  <div 
                    className="h-full rounded-full bg-brand-orange" 
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div 
                    className="absolute w-3 h-3 rounded-full bg-white border-2 border-brand-orange -translate-x-1.5 opacity-0 group-hover/scrub:opacity-100 transition-opacity"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>

                {/* Sub controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause icon */}
                    <button
                      onClick={togglePlay}
                      className="p-1 rounded text-white hover:text-brand-orange transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white" />}
                    </button>

                    {/* Mute toggle icon */}
                    <button
                      onClick={toggleMute}
                      className="p-1 rounded text-white hover:text-brand-turquoise transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX size={18} className="text-brand-orange" />
                          <span className="text-[10px] text-zinc-400 font-bold hidden sm:inline">Sem Som</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={18} className="text-brand-turquoise" />
                          <span className="text-[10px] text-white font-bold hidden sm:inline">Com Som</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Active video subtitle text */}
                  <div className="hidden sm:block text-right">
                    <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">{activeTrack.title}</span>
                    <span className="mx-2 text-zinc-500">|</span>
                    <span className="text-[10px] text-zinc-400 font-mono tracking-wider">REEL OFICIAL VOU DE PET</span>
                  </div>

                  {/* Duration stamp */}
                  <span className="text-[10px] text-zinc-300 font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {activeTrack.duration}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Column 2: Modern Interactive Sidebar Controls (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Playlists / Feeds selection container */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-black tracking-widest text-zinc-400 uppercase">
                Escolha a sua Experiência
              </h3>

              <div className="space-y-3">
                {playlist.map((track) => {
                  const isCurrent = track.id === activeTrack.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setActiveTrack(track)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                        isCurrent
                          ? "bg-zinc-900 border-brand-orange/40 shadow-lg scale-102"
                          : "bg-zinc-950/40 border-zinc-800/60 hover:bg-zinc-900/60 hover:border-zinc-700"
                      }`}
                    >
                      {/* Interactive focus left bar decoration */}
                      {isCurrent && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-orange" />
                      )}

                      {/* Small visual thumbnail preview */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-zinc-800 relative">
                        <img src={track.poster} alt="" className="w-full h-full object-cover" />
                        {isCurrent && isPlaying ? (
                          <div className="absolute inset-0 bg-brand-orange/20 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play size={12} className="fill-white text-white" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest border uppercase ${track.badgeColor}`}>
                            {track.tag}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">{track.duration}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white truncate">{track.title}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Feed detailed card */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-6 grow flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  Benefício em Trânsito
                </h4>
                <p className="mt-3 text-xs text-zinc-400 font-medium leading-relaxed">
                  {activeTrack.description} O motorista é certificado e mantém comunicação em tempo real via WhatsApp ou app.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Certificação</p>
                  <p className="text-xs font-black text-white">Classe Motorista Premium</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <ShieldCheck size={20} />
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <a
              href="#contato"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black rounded-2xl shadow-xl transition-all text-xs sm:text-sm group hover:scale-102 cursor-pointer"
            >
              <span>Simular Táxi de Viagem</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}
