import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  sold: number;
}

const ProductCard = ({ image, title, price, rating, sold }: ProductCardProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-1 max-w-xs w-full">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover  mb-4"
      />
      <div className="p-3">
      <h3 className="text-sm md:text-lg font-semibold truncate">{title}</h3>
      <p className="text-primary text-xl font-bold mt-1">${price.toFixed(2)}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2 text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" size={16} />
        ))}
        {hasHalfStar && <Star fill="currentColor" size={16} className="opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
        <span className="text-xs md:text-sm text-gray-600 ml-2">({rating})</span>
      </div>

      {/* Sold count */}
      <p className="text-xs md:text-sm text-gray-500 mt-1">{sold} sold</p>
      </div>
    </div>
  );
};

export default ProductCard;
