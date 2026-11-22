"use client";

import { useEffect, useRef } from "react";
import { makeBinaryGrid, radialFalloff, type BinaryDigit } from "@/lib/binary-field";

const MOBILE_BREAKPOINT = 640;
const POINTER_RADIUS = 155;
const TOUCH_RADIUS = 135;
const MAX_ILLUMINATION = 0.44;
const POSITION_EASING = 0.22;
const OPACITY_EASING = 0.16;

type PointerPosition = { x: number; y: number; strength: number };

/**
 * Decorative Canvas 2D texture. Nothing animates at rest; frames are only
 * requested while the pointer is moving or the light is fading.
 */
export function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    const staticCanvas = document.createElement("canvas");
    const staticContext = staticCanvas.getContext("2d", { alpha: true });
    if (!context || !staticContext) return;

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

    const current: PointerPosition = { x: 0, y: 0, strength: 0 };
    const target: PointerPosition = { x: 0, y: 0, strength: 0 };

    function paintSettings(ctx: CanvasRenderingContext2D) {
      ctx.font = "300 8px ui-monospace, SFMono-Regular, Consolas, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
    }

    function draw() {
      if (!context || width === 0 || height === 0) return;

      context.clearRect(0, 0, width, height);
      context.drawImage(staticCanvas, 0, 0, width, height);

      if (current.strength < 0.005 || reducedMotion.matches) return;

      const rgb = darkTheme.matches ? "174, 184, 187" : "77, 88, 91";
      const radiusSquared = radius * radius;

      for (const digit of digits) {
        const dx = digit.x - current.x;
        const dy = digit.y - current.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared >= radiusSquared) continue;

        const glow = radialFalloff(Math.sqrt(distanceSquared), radius);
        const opacity = glow * current.strength * MAX_ILLUMINATION;
        if (opacity < 0.006) continue;

        context.fillStyle = `rgba(${rgb}, ${opacity})`;
        context.fillText(digit.value, digit.x, digit.y);
      }
    }

    function cancelFrame() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    function scheduleFrame() {
      if (frame === null && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function animate(now: number) {
      frame = null;

      // Cap active animation to about 30fps on high-refresh-rate screens.
      if (now - lastFrameTime < 30) {
        scheduleFrame();
        return;
      }
      lastFrameTime = now;

      current.x += (target.x - current.x) * POSITION_EASING;
      current.y += (target.y - current.y) * POSITION_EASING;
      current.strength += (target.strength - current.strength) * OPACITY_EASING;

      const moving =
        Math.abs(current.x - target.x) > 0.4 ||
        Math.abs(current.y - target.y) > 0.4 ||
        Math.abs(current.strength - target.strength) > 0.006;

      if (!moving) {
        current.x = target.x;
        current.y = target.y;
        current.strength = target.strength;
      }

      draw();
      if (moving) scheduleFrame();
    }

    function rebuild() {
      if (!canvas || !context || !staticContext) return;

      const bounds = canvas.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (width === 0 || height === 0) return;

      // Respect device resolution without allocating oversized GPU buffers.
      ratio = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.max(0.75, Math.sqrt(2_600_000 / (width * height))),
      );
      const pixelWidth = Math.max(1, Math.round(width * ratio));
      const pixelHeight = Math.max(1, Math.round(height * ratio));

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      staticCanvas.width = pixelWidth;
      staticCanvas.height = pixelHeight;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      staticContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      paintSettings(context);
      paintSettings(staticContext);

      const mobile = width <= MOBILE_BREAKPOINT;
      const spacing = mobile ? 40 : 32;
      radius = mobile ? TOUCH_RADIUS : POINTER_RADIUS;
      digits = makeBinaryGrid(width, height, spacing);

      staticContext.clearRect(0, 0, width, height);
      const baseRgb = darkTheme.matches ? "153, 164, 168" : "78, 88, 91";

      for (const digit of digits) {
        staticContext.fillStyle = `rgba(${baseRgb}, ${digit.opacity})`;
        staticContext.fillText(digit.value, digit.x, digit.y);
      }

      draw();
      if (target.strength > 0) scheduleFrame();
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
      if (!reducedMotion.matches) return;
      cancelFrame();
      active = false;
      target.strength = 0;
      current.strength = 0;
      draw();
    }

    function onVisibilityChange() {
      if (!document.hidden) return;
      cancelFrame();
      active = false;
      target.strength = 0;
      current.strength = 0;
      draw();
    }

    const observer = new ResizeObserver(rebuild);
    observer.observe(canvas.parentElement ?? canvas);
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
