import { useEffect, useState } from 'react';

const StatCard = ({ icon: Icon, label, value, suffix = '', color = 'primary' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stats shadow-lg hover-lift">
      <div className="stat">
        <div className={`stat-figure text-${color}`}>
          <Icon size={48} />
        </div>
        <div className="stat-title body-base">{label}</div>
        <div className={`stat-value text-${color} heading-xl`}>
          {count.toLocaleString()}{suffix}
        </div>
      </div>
    </div>
  );
};

export default StatCard;