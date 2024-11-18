import React from "react";
import { HeartIcon, GiftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-10">
      <div className="flex-1">
      <div className="flex items-center">
					<Image src="/logo.svg" alt="Logo" width={100} height={100} />
				</div>
      </div>
      <div className="flex-none gap-4">
        <div className="form-control">
        <input
  type="text"
  placeholder="Search for anything"
  className="input bg-white border-2 border-black w-full max-w-xs text-black"
/>

        </div>
        <div>
        <button className="btn btn-circle btn-ghost">
          <HeartIcon className="w-6 h-6 text-black" />
        </button>
        <button className="btn btn-circle btn-ghost">
          <GiftIcon className="w-6 h-6 text-black" />
        </button>
        <button className="btn btn-circle btn-ghost">
          <ShoppingCartIcon className="w-6 h-6 text-black" />
        </button>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
