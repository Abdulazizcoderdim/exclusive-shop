import { useEffect, useState } from 'react';

const TimeCategories = ({ daysToCount }: { daysToCount: number }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let targetDate: Date;
    const savedTargetDate = localStorage.getItem('countdownTargetDate');

    if (savedTargetDate) {
      targetDate = new Date(savedTargetDate);
    } else {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysToCount);
      localStorage.setItem('countdownTargetDate', targetDate.toISOString());
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        clearInterval(intervalId);
        localStorage.removeItem('countdownTargetDate'); // Vaqt tugaganda localStorage ni tozalash
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [daysToCount]);

  return (
    <div className="flex items-center sm:gap-5 gap-2 text-white">
      <div className="leading-10 bg-white text-black text-center sm:w-16 sm:h-16 w-14 h-14 flex items-center justify-center flex-col rounded-full">
        <h1 className="font-semibold sm:text-base text-sm">
          {String(timeRemaining.days).padStart(2, '0')}
        </h1>
        <h2 className="font-medium text-xs">Days</h2>
      </div>
      <div className="leading-10 bg-white text-black text-center sm:w-16 sm:h-16 w-14 h-14 flex items-center justify-center flex-col rounded-full">
        <h1 className="font-semibold sm:text-base text-sm">
          {String(timeRemaining.hours).padStart(2, '0')}
        </h1>
        <h2 className="font-medium text-xs">Hours</h2>
      </div>
      <div className="leading-10 bg-white text-black text-center sm:w-16 sm:h-16 w-14 h-14 flex items-center justify-center flex-col rounded-full">
        <h1 className="font-semibold sm:text-base text-sm">
          {String(timeRemaining.minutes).padStart(2, '0')}
        </h1>
        <h2 className="font-medium text-xs">Minutes</h2>
      </div>
      <div className="leading-10 bg-white text-black text-center sm:w-16 sm:h-16 w-14 h-14 flex items-center justify-center flex-col rounded-full">
        <h1 className="font-semibold sm:text-base text-sm">
          {String(timeRemaining.seconds).padStart(2, '0')}
        </h1>
        <h2 className="font-medium text-xs">Seconds</h2>
      </div>
    </div>
  );
};

export default TimeCategories;
