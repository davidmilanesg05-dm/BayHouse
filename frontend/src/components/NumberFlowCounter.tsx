import { useEffect, useState } from 'react';

interface NumberCounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

export default function NumberCounter({ target, suffix = '', className = '' }: NumberCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 2000; // 2 segundos

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('counter-root');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [target]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
}