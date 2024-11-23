import FeaturedProducts from "@/components/FeaturedProducts";
import Detail from "../components/Detail";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Banner from "../components/banner";
import PopularTags from "@/components/PopularTags";
import { ProductType } from "@/types";

type HomeProps = {
  products: ProductType[];
};

export default function Home({ products }: HomeProps) {
  return (
    <main>
      <Navbar />
      <Banner />
      <FeaturedProducts products={products}/>
      <PopularTags products={products}/>
      <Detail />
      <Footer />
    </main>
  );
}
