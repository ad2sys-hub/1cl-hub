import { useEffect, useRef } from 'react';
import { useSovereign } from '../context/SovereignContext';

export default function GlobalLoupe() {
  const { isGlobalLoupeActive, toggleGlobalLoupe } = useSovereign();
  const loupeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGlobalLoupeActive) {
      if (contentRef.current) contentRef.current.innerHTML = ''; // Cleanup
      return;
    }

    const loupe = loupeRef.current;
    const content = contentRef.current;
    if (!loupe || !content) return;

    // Clone the main root application to display inside the loupe
    const rootEl = document.getElementById('root');
    if (!rootEl) return;
    
    // Create a clone
    const clone = rootEl.cloneNode(true) as HTMLElement;
    clone.id = 'loupe-clone'; // avoid ID collisions
    
    // Remove the loupe itself from the clone to prevent infinite recursion
    const loupeInClone = clone.querySelector('#global-loupe-container');
    if (loupeInClone) loupeInClone.remove();

    // Inject
    content.innerHTML = '';
    content.appendChild(clone);

    const handleMouseMove = (e: MouseEvent) => {
      // Position the loupe
      const x = e.clientX;
      const y = e.clientY;
      const size = 300; // Match Tailwind w-72 approx
      
      loupe.style.left = `${x - size / 2}px`;
      loupe.style.top = `${y - size / 2}px`;

      // Position the cloned content inside the loupe inversely and apply scale x3
      const zoom = 3;
      content.style.transform = `translate(${-x * zoom + size / 2}px, ${-y * zoom + size / 2}px) scale(${zoom})`;
      content.style.transformOrigin = '0 0';
    };

    // Close on ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleGlobalLoupe();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGlobalLoupeActive, toggleGlobalLoupe]);

  if (!isGlobalLoupeActive) return null;

  return (
    <div 
      id="global-loupe-container"
      ref={loupeRef}
      className="fixed pointer-events-none z-[9999] w-72 h-72 rounded-full overflow-hidden border-2 border-clGold shadow-[0_0_50px_rgba(212,175,55,0.5)] bg-clDarkGrey"
      style={{ left: '-999px', top: '-999px' }}
    >
      <div 
         ref={contentRef}
         className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
      />
    </div>
  );
}
