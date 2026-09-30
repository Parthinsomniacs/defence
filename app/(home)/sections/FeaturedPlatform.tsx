"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeaturedPlatform.module.css";

const FRAME_COUNT = 50;
const framePath = (i: number) =>
  `/images/featured/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

/**
 * Featured Platform — cinematic scrollytelling section.
 * A pinned full-screen canvas scrubs through a 50-frame image sequence
 * as the user scrolls. Drawing is decoupled from scroll events via the
 * GSAP ticker so the sequence plays back smoothly.
 */
export default function FeaturedPlatform() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    gsap.registerPlugin(ScrollTrigger);

    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    let currentFrame = -1;

    // Size the canvas backing store to its CSS box × DPR (called on resize).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      currentFrame = -1; // force a redraw at the new size
      render();
    };

    // Draw a frame. On wide screens the image "covers" the canvas for a
    // full-bleed look; from 1216px down it is "contained" so the whole
    // missile stays visible and is never cropped.
    const render = () => {
      const index = Math.round(state.frame);
      if (index === currentFrame) return;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ratioX = canvas.width / img.naturalWidth;
      const ratioY = canvas.height / img.naturalHeight;
      // From 768px down, "contain" the whole missile (no crop / full view).
      const contain = window.innerWidth <= 768;
      const scale = contain ? Math.min(ratioX, ratioY) : Math.max(ratioX, ratioY);

      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, dx, dy, dw, dh);
      currentFrame = index;
    };

    // Preload + decode every frame so drawing never stalls mid-scroll.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.decode?.().catch(() => {});
      img.onload = () => {
        // Redraw if the just-loaded image is the frame we currently need.
        if (i === Math.round(state.frame)) {
          currentFrame = -1;
          render();
        }
      };
      images[i] = img;
    }

    // Size the canvas up front so the first paint is correct regardless
    // of when frames finish loading.
    resize();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        resize();
        render();
        return;
      }

      const mm = gsap.matchMedia();

      // Shared: caption fades out and the image lifts to full opacity as the
      // sequence begins. Uses a plain scroll range (no pin) so it behaves
      // identically on every device.
      const introReveal = () =>
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=30%",
              scrub: true,
            },
          })
          .to(introRef.current, { autoAlpha: 0, y: -20, ease: "none" }, 0)
          .to(canvasRef.current, { opacity: 1, ease: "none" }, 0)
          .to(scrimRef.current, { autoAlpha: 0, ease: "none" }, 0);

      // Desktop / laptop: pin the stage and scrub the frames over a long
      // scroll distance.
      mm.add("(min-width: 1025px)", () => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
          },
        });
        introReveal();
      });

      // Mobile / tablet: no pinning (pinning + smooth-scroll is unreliable on
      // touch). The section is taller than the viewport; the sticky stage
      // stays in view while the frames scrub against the section's own
      // scroll progress. This plays the full sequence smoothly on phones.
      mm.add("(max-width: 1024px)", () => {
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
        introReveal();
      });
    }, sectionRef);

    // Decouple drawing from scroll: the ticker draws the latest frame once
    // per animation frame, which removes the per-scroll-event jerk.
    gsap.ticker.add(render);

    // On resize, re-size the canvas and let ScrollTrigger recompute the
    // pinned scroll distance so the scrub stays correct at every width.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      resize();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Featured Platform"
    >
      <div ref={stageRef} className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div ref={scrimRef} className={styles.scrim} aria-hidden="true" />

        <div ref={introRef} className={styles.intro}>
          <span className={styles.eyebrow}>FEATURED PLATFORM</span>
          <h2 className={styles.title}>A Glimpse of What We Build</h2>
          <p className={styles.subline}>
            The details are classified, the capability is not.
          </p>
        </div>
      </div>
    </section>
  );
}
