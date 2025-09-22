import React from "react";
import anime from "animejs";
import { useTimeout } from "@/hooks/useTimeout";

const GRID_WIDTH = 17;
const GRID_HEIGHT = 17;

const DotGrid = () => {
  const triggerInitialAnimation = React.useCallback(() => {
    const targetIndex = 8 * GRID_WIDTH + 8;
    const element = document.querySelector(`[data-index="${targetIndex}"]`);
    if (element) {
      element.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    }
  }, []);

  useTimeout(triggerInitialAnimation, 800);

  const handleDotClick = (e: any) => {
    const clickedIndex = parseInt(e.target.dataset.index);
    const clickedRow = Math.floor(clickedIndex / GRID_WIDTH);
    const clickedCol = clickedIndex % GRID_WIDTH;

    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -8, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateX: [
        { value: -8, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: function(el: any, i: number) {
        const row = Math.floor(i / GRID_WIDTH);
        const col = i % GRID_WIDTH;
        
        // Distance calculations for wave pattern:
        // 1. Chebyshev Distance: max(|Δx|, |Δy|) - creates sharp diamond shapes
        // 2. Euclidean Distance: √(Δx² + Δy²) - creates circular shapes
        // 3. Blended Distance: weighted combination for rounded diamond effect
        const chebyshevDistance = Math.max(Math.abs(row - clickedRow), Math.abs(col - clickedCol));
        const euclideanDistance = Math.sqrt(Math.pow(row - clickedRow, 2) + Math.pow(col - clickedCol, 2));
        
        // Blend: 80% diamond + 20% circle = rounded diamond
        // Adjust weights to control corner roundness (higher euclidean = more rounded)
        const blendedDistance = chebyshevDistance * 0.8 + euclideanDistance * 0.2;
        
        // Round to ensure dots at similar distances animate together
        return Math.round(blendedDistance) * 30;
      },
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group cursor-crosshair rounded-none p-2 transition-colors hover:bg-zinc-600"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point size-1 sm:size-2 rounded-none bg-gradient-to-tl from-secondary-dark to-secondary-light opacity-50 group-hover:from-primary-dark group-hover:to-primary-light"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      onClick={handleDotClick}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="absolute right-[10%] top-[50%] z-0 grid max-w-[75%] -translate-y-[50%] rotate-45"
    >
      {dots}
    </div>
  );
};

export default DotGrid;
