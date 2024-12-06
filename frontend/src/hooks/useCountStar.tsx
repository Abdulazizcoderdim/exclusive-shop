import { FaStarHalfStroke } from 'react-icons/fa6';
import { FiStar } from 'react-icons/fi';

export function valueCount(value: number) {
  switch (5 - value) {
    case 0.5:
      return <FaStarHalfStroke className="text-star" />;
    case 1:
      return <FiStar className="text-star" />;

    case 1.5:
      return (
        <>
          <FaStarHalfStroke className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 2:
      return (
        <>
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 2.5:
      return (
        <>
          <FaStarHalfStroke className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 3:
      return (
        <>
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 3.5:
      return (
        <>
          <FaStarHalfStroke className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 4:
      return (
        <>
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    case 4.5:
      return (
        <>
          <FaStarHalfStroke className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
          <FiStar className="text-star" />
        </>
      );
    default:
      return null;
  }
}
