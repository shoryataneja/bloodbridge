import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, quote, image }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover-lift">
      <div className="card-body">
        <Quote size={32} className="text-primary mb-4" />
        <p className="text-base text-gray-700 italic mb-6">"{quote}"</p>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <h4 className="heading-sm text-neutral">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;