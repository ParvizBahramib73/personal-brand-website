"use client";

import { useEffect, useRef } from "react";
import { ambientWave, makeBinaryGrid, radialFalloff, type BinaryDigit } from "@/lib/binary-field";

const MOBILE_BREAKPOINT = 640;
const POINTER_RADIUS = 155;
const TOUCH_RADIUS = 135;
const MAX_ILLUMINATION = 0.46;
const AMBIENT_WAVE_OPACITY = 0.1;
const DESKTOP_SPACING = 26;
const MOBILE_SPACING = 34;
const DESKTOP_FRAME_MS = 1000 / 14;
const MOBILE_FRAME_MS = 1000 / 10;
const POSITION_EASING = 0.22;
const OPACITY_EASING = 0.16;

type PointerPosition = { x: number; y: number; strength: number };

/**
 * Lightweight, low-frame-rate ambient motion with a responsive pointer light.
 * Motion pauses when out of view and is disabled for reduced-motion users.
 */
export function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const maybeContext = element.getContext("2d", { alpha: true });
    if (!maybeContext) return;

    // Non-null aliases remain narrowed inside event handlers and animation callbacks.
    const canvas = element;
    const context = maybeContext;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    let width = 0;
    let height = 0;
    let ratio = 1;
    let digits: BinaryDigit[] = [];
    let frame: number | null = null;
    let radius = POINTER_RADIUS;
    let lastFrameTime = 0;
    let active = false;
    let inView = true;
    let frameInterval = DESKTOP_FRAME_MS;
    let baseRgb = "65, 81, 88";
    let highlightRgb = "45, 87, 100";

    const current: PointerPosition = { x: 0, y: 0, strength: 0 };
    const target: PointerPosition = { x: 0, y: 0, strength: 0 };

    function paintSettings(ctx: CanvasRenderingContext2D) {
      ctx.font = "300 8px ui-monospace, SFMono-Regular, Consolas, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
    }

    function draw(now: number) {
      if (width === 0 || height === 0) return;

      const still = reducedMotion.matches;
      const seconds = now / 1000;
      const radiusSquared = radius * radius;

      context.clearRect(0, 0, width, height);

      for (const digit of digits) {
        const x = still
          ? digit.x
          : digit.x + Math.sin(seconds * 0.24 * digit.speed + digit.phase) * digit.driftX;
        const y = still
          ? digit.y
          : digit.y + Math.cos(seconds * 0.21 * digit.speed + digit.phase) * digit.driftY;
        const wave = still ? 0 : ambientWave(x, y, seconds);
        const opacity = Math.min(0.3, digit.opacity + AMBIENT_WAVE_OPACITY * wave);

        context.fillStyle = `rgba(${baseRgb}, ${opacity})`;
        context.fillText(digit.value, x, y);

        if (still || current.strength < 0.005) continue;

        const dx = x - current.x;
        const dy = y - current.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared >= radiusSquared) continue;

        const glow =
          radialFalloff(Math.sqrt(distanceSquared), radius) * current.strength * MAX_ILLUMINATION;
        if (glow < 0.006) continue;

        context.fillStyle = `rgba(${highlightRgb}, ${glow})`;
        context.fillText(digit.value, x, y);
      }
    }

    function cancelFrame() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function scheduleFrame() {
      if (frame === null && inView && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function animate(now: number) {
      frame = null;

      // Low frame rate is enough for slow ambient waves and saves battery.
      if (now - lastFrameTime < frameInterval) {
        scheduleFrame();
        return;
      }
      lastFrameTime = now;

      current.x += (target.x - current.x) * POSITION_EASING;
      current.y += (target.y - current.y) * POSITION_EASING;
      current.strength += (target.strength - current.strength) * OPACITY_EASING;

      draw(now);
      scheduleFrame();
    }

    function rebuild() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (width === 0 || height === 0) {
        cancelFrame();
        return;
      }

      // Limit high-density canvas allocations on small and large screens.
      ratio = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.max(0.75, Math.sqrt(2_600_000 / (width * height))),
      );
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paintSettings(context);

      const mobile = width <= MOBILE_BREAKPOINT;
      radius = mobile ? TOUCH_RADIUS : POINTER_RADIUS;
      frameInterval = mobile ? MOBILE_FRAME_MS : DESKTOP_FRAME_MS;
      digits = makeBinaryGrid(width, height, mobile ? MOBILE_SPACING : DESKTOP_SPACING);

      const tokens = getComputedStyle(document.documentElement);
      const fallbackBase = darkTheme.matches ? "137, 186, 195" : "65, 81, 88";
      const fallbackHighlight = darkTheme.matches ? "160, 215, 225" : "45, 87, 100";
      baseRgb = tokens.getPropertyValue("--binary-base-rgb").trim() || fallbackBase;
      highlightRgb = tokens.getPropertyValue("--binary-highlight-rgb").trim() || fallbackHighlight;

      if (reducedMotion.matches) {
        cancelFrame();
        active = false;
        target.strength = 0;
        current.strength = 0;
        draw(0);
      } else {
        draw(performance.now());
        scheduleFrame();
      }
    }

    function clearLight() {
      target.strength = 0;
      if (active) scheduleFrame();
      active = false;
    }

    function illuminate(clientX: number, clientY: number) {
      if (!canvas || document.hidden || reducedMotion.matches) return;

      const bounds = canvas.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;
      if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
        clearLight();
        return;
      }

      if (!active && current.strength < 0.01) {
        current.x = x;
        current.y = y;
      }

      active = true;
      target.x = x;
      target.y = y;
      target.strength = 1;
      scheduleFrame();
    }

    function onPointerMove(event: PointerEvent) {
      // During native touch scrolling, pointer events can be cancelled;
      // passive touchmove below continues following the finger.
      if (event.pointerType === "touch") return;
      illuminate(event.clientX, event.clientY);
    }

    function onPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) clearLight();
    }

    function onTouch(event: TouchEvent) {
      const finger = event.touches[0];
      if (finger) illuminate(finger.clientX, finger.clientY);
    }

    function onTouchEnd(event: TouchEvent) {
      if (event.touches.length > 0) {
        onTouch(event);
      } else {
        clearLight();
      }
    }

    function onReducedMotionChange() {
      rebuild();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelFrame();
        active = false;
        target.strength = 0;
        current.strength = 0;
      } else {
        scheduleFrame();
      }
    }

    const observer = new ResizeObserver(rebuild);
    observer.observe(canvas.parentElement ?? canvas);
    const visibilityObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            inView = Boolean(entry?.isIntersecting);
            if (!inView) {
              cancelFrame();
              active = false;
              target.strength = 0;
              current.strength = 0;
            } else {
              scheduleFrame();
            }
          })
        : null;
    visibilityObserver?.observe(canvas);
    rebuild();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", clearLight, { passive: true });
    window.addEventListener("blur", clearLight);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onReducedMotionChange);
    darkTheme.addEventListener("change", rebuild);

    return () => {
      observer.disconnect();
      visibilityObserver?.disconnect();
      cancelFrame();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", clearLight);
      window.removeEventListener("blur", clearLight);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      darkTheme.removeEventListener("change", rebuild);
    };
  }, []);

  return <canvas ref={canvasRef} className="minimal-binary-field" aria-hidden="true" />;
}
