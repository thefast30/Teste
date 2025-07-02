import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TimerButton: React.FC<TimerButtonProps> = ({ href, children, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg mb-3 sm:mb-4 inline-flex items-center gap-2 text-sm sm:text-base">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-bold">Oferta expira em: {formatTime(timeLeft)}</span>
      </div>
      <a
        href={href}
        className={`inline-block ${className}`}
      >
        {children}
      </a>
    </div>
  );
};

export default TimerButton;