import React from "react";
import anime from "animejs";

const GRID_WIDTH = 17;
const GRID_HEIGHT = 17;
const BASE_OPACITY = 0.4;

const DotGrid = () => {
  const triggerInitialAnimation = React.useCallback(() => {
    const halfWidth = Math.floor(GRID_WIDTH / 2);
    const targetIndex = halfWidth * GRID_WIDTH + halfWidth;
    const element = document.querySelector(`[data-index="${targetIndex}"]`);
    if (element) {
      element.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    }
  }, []);

  const slideInAnimation = React.useCallback(() => {
    anime({
      targets: '.dot-grid-container',
      translateY: [140, 0],
      scale: [0.95, 1],
      rotate: [45, 45],
      opacity: [0, 1],
      easing: 'easeOutCubic',
      duration: 800,
      complete: () => {
        // Trigger click animation after slide in completes
        setTimeout(triggerInitialAnimation, 0);
      }
    });
  }, [triggerInitialAnimation]);

  // Defer initial animation until after LCP to improve performance
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Use requestIdleCallback to run during idle time, fallback to setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(slideInAnimation);
      } else {
        setTimeout(slideInAnimation, 0);
      }
    }, 500); // Increased delay to avoid blocking LCP
    
    return () => clearTimeout(timer);
  }, [slideInAnimation]);

  const handleDotClick = React.useCallback((e: any) => {
    const clickedIndex = parseInt(e.target.dataset.index);
    const clickedRow = Math.floor(clickedIndex / GRID_WIDTH);
    const clickedCol = clickedIndex % GRID_WIDTH;
    
    // Pre-calculate intensity for all dots to avoid repeated calculations
    const intensities = new Array(GRID_WIDTH * GRID_HEIGHT);
    
    for (let i = 0; i < intensities.length; i++) {
      const currentRow = Math.floor(i / GRID_WIDTH);
      const currentCol = i % GRID_WIDTH;
      // Use squared distance for intensity decay
      const distanceSquared = (currentRow - clickedRow) ** 2 + (currentCol - clickedCol) ** 2;
      // Intensity decays with square of distance (slower falloff)
      const intensity = Math.max(0, 1 / (1 + distanceSquared * 0.02));
      intensities[i] = intensity;
    }
    
    // Create wave animation (simple approach that works reliably)
    anime({
      targets: ".dot-point",
      scale: [
        {
          value: function(el: any, i: number) {
            return 1.0 + (0.25 * intensities[i]);
          },
          easing: "easeOutSine", 
          duration: 250
        },
        { value: 1, easing: "easeInOutQuad", duration: 250 }
      ],
      translateY: [
        {
          value: function(el: any, i: number) {
            return -15 * intensities[i];
          },
          easing: "easeOutSine", 
          duration: 250
        },
        { value: 0, easing: "easeInOutQuad", duration: 270 }
      ],
      translateX: [
        {
          value: function(el: any, i: number) {
            return -15 * intensities[i];
          },
          easing: "easeOutSine", 
          duration: 250
        },
        { value: 0, easing: "easeInOutQuad", duration: 270 }
      ],
      opacity: [
        {
          value: function(el: any, i: number) {
            return BASE_OPACITY + ((1 - BASE_OPACITY) * intensities[i]);
          },
          easing: "easeOutSine", 
          duration: 200
        },
        { value: BASE_OPACITY, easing: "easeInOutQuad", duration: 300 }
      ],
      delay: function(el: any, i: number) {
        const row = Math.floor(i / GRID_WIDTH);
        const col = i % GRID_WIDTH;
        
        // Distance calculations for wave pattern:
        const chebyshevDistance = Math.max(Math.abs(row - clickedRow), Math.abs(col - clickedCol));
        const euclideanDistance = Math.sqrt(Math.pow(row - clickedRow, 2) + Math.pow(col - clickedCol, 2));
        const blendedDistance = chebyshevDistance * 0.1 + euclideanDistance * 0.9;
        
        return Math.round(blendedDistance) * 20 + Math.round(blendedDistance) * 3;
      },
      complete: function() {
        // Force correct final state to override any inline style issues
        const dots = document.querySelectorAll('.dot-point');
        dots.forEach(dot => {
          (dot as HTMLElement).style.opacity = BASE_OPACITY.toString();
        });
      }
    });
  }, []);

  // Memoize dots generation to prevent re-renders
  const dots = React.useMemo(() => {
    const dotsArray = [];
    let index = 0;

    for (let i = 0; i < GRID_WIDTH; i++) {
      for (let j = 0; j < GRID_HEIGHT; j++) {
        dotsArray.push(
          <div
            className="group cursor-crosshair rounded-none p-1 sm:p-2 transition-colors hover:bg-zinc-600"
            data-index={index}
            key={`${i}-${j}`}
          >
            <div
            className="dot-point size-2 sm:size-3 rounded-none bg-gradient-to-tl from-secondary-dark to-secondary-light opacity-50 group-hover:from-primary-dark group-hover:to-primary-light"
              data-index={index}
            />
          </div>
        );
        index++;
      }
    }
    return dotsArray;
  }, []);

  return (
    <div
      onClick={handleDotClick}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="dot-grid-container absolute right-[5%] sm:right-[10%] top-[10%] z-0 grid max-w-[60%] sm:max-w-[75%] -translate-y-[50%] rotate-45 opacity-0"
    >
      {dots}
    </div>
  );
};

export default DotGrid;
