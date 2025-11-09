const LoadingSpinner = ({ 
  size = 'medium', 
  variant = 'spinner', 
  text = '', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-16 w-16'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-75 flex flex-col justify-center items-center z-50'
    : 'flex flex-col justify-center items-center p-4';

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`bg-primary rounded-full animate-pulse ${sizeClasses.small}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div className={`bg-primary rounded-full animate-pulse ${sizeClasses[size]}`} />
        );
      default:
        return (
          <div 
            className={`animate-spin rounded-full border-2 border-gray-200 border-t-primary ${sizeClasses[size]}`}
            role="status"
            aria-label="Loading"
          />
        );
    }
  };

  return (
    <div className={containerClass}>
      {renderSpinner()}
      {text && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;