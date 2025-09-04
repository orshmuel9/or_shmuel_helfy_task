

// Task carousel - infinite loop, smooth drag, and good vibes
import { useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "./TaskItem";


export default function TaskCarousel({
  tasks,
  cardWidth = 400, // Card width in px
  gap = 32,        // Space between cards
  auto = false,    // Enable auto-scroll if you want
  speed = 0.25,    // px/ms when auto=true
}) {
  const viewportRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Render 3x tasks for a real infinite loop
  const renderCount = useMemo(() => (tasks.length ? tasks.length * 3 : 0), [tasks.length]);


  // Mouse/touch drag for carousel
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Start in the middle for infinite loop
    const third = vp.scrollWidth / 3;
    vp.scrollLeft = third;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e) => {
      dragging = true;
      setIsInteracting(true);
      startX = (e.touches ? e.touches[0].pageX : e.pageX) - vp.offsetLeft;
      startScroll = vp.scrollLeft;
      vp.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      const x = (e.touches ? e.touches[0].pageX : e.pageX) - vp.offsetLeft;
      const walk = x - startX;
      vp.scrollLeft = startScroll - walk;
      // Loop: reset to middle if needed
      const third = vp.scrollWidth / 3;
      if (vp.scrollLeft < third / 2) vp.scrollLeft += third;
      if (vp.scrollLeft > third * 1.5) vp.scrollLeft -= third;
    };

    const onUp = () => {
      dragging = false;
      setIsInteracting(false);
      vp.style.cursor = "";
    };

    vp.addEventListener("mousedown", onDown);
    vp.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    vp.addEventListener("touchstart", onDown, { passive: false });
    vp.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      vp.removeEventListener("mousedown", onDown);
      vp.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      vp.removeEventListener("touchstart", onDown);
      vp.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [renderCount]);


  // Auto-scroll (optional), stops on interaction/hover
  useEffect(() => {
    if (!auto || isInteracting || renderCount === 0) return;
    const vp = viewportRef.current;
    if (!vp) return;

    let raf, last;
    const tick = (t) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;
      vp.scrollLeft += speed * dt;
      const third = vp.scrollWidth / 3;
      if (vp.scrollLeft < third / 2) vp.scrollLeft += third;
      if (vp.scrollLeft > third * 1.5) vp.scrollLeft -= third;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto, isInteracting, renderCount, speed]);


  // No tasks? No party :)
  if (!tasks.length) return <div>No tasks yet.</div>;

  // Scroll by n cards (left/right)
  const scrollByCards = (n) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const delta = n * (cardWidth + gap);
    vp.scrollBy({ left: delta, behavior: "smooth" });
    // Loop fix for button scroll
    const third = vp.scrollWidth / 3;
    setTimeout(() => {
      if (vp.scrollLeft < third / 2) vp.scrollLeft += third;
      if (vp.scrollLeft > third * 1.5) vp.scrollLeft -= third;
    }, 350); // after animation
  };

  // Render the carousel UI
  return (
    <div className="carousel-wrapper">
      <button className="nav prev" onClick={() => scrollByCards(-1)} aria-label="Previous">‹</button>

      <div className="carousel-viewport" ref={viewportRef}>
        <div className="carousel-track" style={{ gap }}>
          {Array.from({ length: renderCount }).map((_, i) => {
            const t = tasks[i % tasks.length];
            return (
              <div
                className="carousel-card"
                key={`${t.id}-${i}`}
                style={{ flex: `0 0 ${cardWidth}px`, marginRight: gap }}
              >
                <TaskItem task={t} />
              </div>
            );
          })}
        </div>
      </div>

      <button className="nav next" onClick={() => scrollByCards(1)} aria-label="Next">›</button>
    </div>
  );
}
