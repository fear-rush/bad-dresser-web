"use client";

import React, { useRef, useCallback, Children } from "react";
import Draggable from "react-draggable";

// Card positions as percentages of the viewport (matching Pencil design)
const cardPositions = [
  { left: "2.36%", top: "3.22%", width: "22.92%", height: "13.78%" },   // Brand
  { left: "6.25%", top: "18.89%", width: "18.40%", height: "28.89%" },  // Journal
  { left: "28.61%", top: "3.22%", width: "34.72%", height: "70.78%" },  // Feature
  { left: "58.75%", top: "2.22%", width: "27.78%", height: "54.11%" },  // Lookbook
  { left: "73.33%", top: "38.89%", width: "25.35%", height: "58.89%" }, // Quiz
  { left: "2.36%", top: "61.11%", width: "31.25%", height: "36.67%" }, // Collections
];

let globalMaxZ = 10;

function DraggableCard({
  children,
  position,
  initialZ,
}: {
  children: React.ReactNode;
  position: (typeof cardPositions)[0];
  initialZ: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null!);
  const zRef = useRef(initialZ);

  const bringToFront = useCallback(() => {
    globalMaxZ++;
    zRef.current = globalMaxZ;
    if (nodeRef.current) {
      nodeRef.current.style.zIndex = String(globalMaxZ);
    }
  }, []);

  return (
    <Draggable nodeRef={nodeRef} onStart={bringToFront}>
      <div
        ref={nodeRef}
        className="absolute cursor-grab active:cursor-grabbing select-none"
        style={{
          left: position.left,
          top: position.top,
          width: position.width,
          height: position.height,
          zIndex: zRef.current,
          WebkitUserDrag: "none",
        } as React.CSSProperties}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </div>
    </Draggable>
  );
}

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  const childArray = Children.toArray(children);

  return (
    <div className="relative w-full h-full">
      {childArray.map((child, i) => (
        <DraggableCard
          key={i}
          position={cardPositions[i]}
          initialZ={10 + i}
        >
          {child}
        </DraggableCard>
      ))}
    </div>
  );
}
