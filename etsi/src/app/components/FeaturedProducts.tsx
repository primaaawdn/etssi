"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Handmade Necklace",
    price: "$25",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 2,
    name: "Wooden Cutting Board",
    price: "$30",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 3,
    name: "Ceramic Vase",
    price: "$45",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: "$50",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 5,
    name: "Woven Basket",
    price: "$35",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 6,
    name: "Handmade Soap",
    price: "$10",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 7,
    name: "Cotton Towels",
    price: "$20",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 8,
    name: "Wooden Coasters",
    price: "$15",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 9,
    name: "Canvas Tote Bag",
    price: "$40",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
  {
    id: 10,
    name: "Essential Oil Set",
    price: "$55",
    image:
      "https://i.etsystatic.com/26714463/r/il/293c6f/6238453931/il_794xN.6238453931_qlx0.jpg",
  },
];

const FeaturedProducts: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(e.clientX);
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    const moveX = e.clientX - startX;
    scrollRef.current.scrollLeft = scrollLeft - moveX;
  };

  return (
    <div className="my-8 px-4 py-5 bg-white">
      <h2 className="text-2xl text-black font-bold mb-4 bg-white">Featured Products</h2>
      <div
        ref={scrollRef}
        className="overflow-x-auto cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          scrollBehavior: "smooth",
        }}
      >
        <div className="flex space-x-4">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-64">
              <div className="card shadow-md text-center p-4 rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-xl w-full h-40 object-cover mb-2"
                />
                <h3 className="font-semibold text-black text-lg">{product.name}</h3>
                <p className="text-black">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-6">
        <Link href="/products">
          <button className="btn btn-primary">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
