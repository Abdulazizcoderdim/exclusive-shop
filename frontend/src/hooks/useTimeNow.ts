import { useEffect, useState } from 'react';

export const useTimeNow = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Vaqtni yangilash uchun interval o'rnatamiz
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000); // Har soniyada yangilash (1000ms)

    // Komponent unmount bo'lganda intervalni tozalash
    return () => clearInterval(intervalId);
  }, []);

  return time;
};

export default useTimeNow;
