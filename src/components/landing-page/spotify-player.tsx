"use client";

import { useEffect, useRef, useState } from "react";

const SPOTIFY_PLAYLIST_ID = "5DSYXOzFnD5AK9tW69lEFy";
const SPOTIFY_SRC = `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`;
const SPOTIFY_LOAD_TIMEOUT_MS = 12000;

type SpotifyStatus = "loading" | "ready" | "failed";

let iframeNode: HTMLIFrameElement | null = null;
let parkingNode: HTMLDivElement | null = null;
let sharedStatus: SpotifyStatus = "loading";
let loadTimeout: number | null = null;
const subscribers = new Set<(status: SpotifyStatus) => void>();

function emitStatus(nextStatus: SpotifyStatus) {
  sharedStatus = nextStatus;
  subscribers.forEach((notify) => notify(nextStatus));
}

function clearLoadTimeout() {
  if (loadTimeout === null) return;
  window.clearTimeout(loadTimeout);
  loadTimeout = null;
}

function markFailed() {
  if (sharedStatus === "failed") return;
  clearLoadTimeout();
  iframeNode?.remove();
  iframeNode = null;
  emitStatus("failed");
}

function ensureParkingNode() {
  if (typeof window === "undefined") return null;
  if (parkingNode) return parkingNode;

  const node = document.createElement("div");
  node.setAttribute("aria-hidden", "true");
  node.style.position = "fixed";
  node.style.left = "-9999px";
  node.style.top = "-9999px";
  node.style.width = "1px";
  node.style.height = "1px";
  node.style.opacity = "0";
  node.style.pointerEvents = "none";
  node.style.overflow = "hidden";
  document.body.appendChild(node);

  parkingNode = node;
  return parkingNode;
}

function ensureIframe() {
  if (typeof window === "undefined" || iframeNode || sharedStatus === "failed")
    return;

  const node = document.createElement("iframe");

  node.src = SPOTIFY_SRC;
  node.width = "100%";
  node.height = "100%";
  node.allow =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  node.loading = "lazy";
  node.title = "Bad Dresser — Diamond Dogs playlist";
  node.className = "h-full w-full border-0";

  node.addEventListener("load", () => {
    if (sharedStatus === "failed") return;
    clearLoadTimeout();
    emitStatus("ready");
  });

  node.addEventListener("error", markFailed);

  iframeNode = node;
  loadTimeout = window.setTimeout(() => {
    if (sharedStatus === "loading") markFailed();
  }, SPOTIFY_LOAD_TIMEOUT_MS);
}

export function SpotifyPlayer({
  className,
  draggable,
  onUnavailable,
}: {
  className: string;
  draggable?: boolean;
  onUnavailable?: () => void;
}) {
  const [overlayActive, setOverlayActive] = useState(true);
  const [status, setStatus] = useState<SpotifyStatus>(sharedStatus);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef({ x: 0, y: 0 });
  const reportedUnavailable = useRef(false);

  useEffect(() => {
    const parking = ensureParkingNode();
    ensureIframe();
    subscribers.add(setStatus);

    return () => {
      if (iframeNode && parking) {
        parking.appendChild(iframeNode);
      }
      subscribers.delete(setStatus);
    };
  }, []);

  useEffect(() => {
    if (status !== "failed" || reportedUnavailable.current) return;
    reportedUnavailable.current = true;
    onUnavailable?.();
  }, [onUnavailable, status]);

  useEffect(() => {
    if (!containerRef.current || sharedStatus === "failed") return;

    ensureIframe();
    if (!iframeNode) return;

    const container = containerRef.current;
    container.appendChild(iframeNode);

    return () => {
      const parking = ensureParkingNode();
      if (iframeNode && parking && iframeNode.parentElement === container) {
        parking.appendChild(iframeNode);
      }
    };
  }, []);

  useEffect(() => {
    if (!iframeNode) return;
    iframeNode.style.opacity = status === "ready" ? "1" : "0";
    iframeNode.style.transition = "opacity 180ms ease-in-out";
  }, [status]);

  if (status === "failed") return null;

  return (
    <div
      ref={containerRef}
      className={`${className} relative`}
      onPointerLeave={draggable ? () => setOverlayActive(true) : undefined}
    >
      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-label="Loading Spotify player"
            role="status"
          />
        </div>
      )}
      {draggable && overlayActive && status === "ready" && (
        <div
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            pointerStart.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const dx = Math.abs(e.clientX - pointerStart.current.x);
            const dy = Math.abs(e.clientY - pointerStart.current.y);
            if (dx < 5 && dy < 5) setOverlayActive(false);
          }}
        />
      )}
    </div>
  );
}
