import Carousel from "@/components/Carousel";
import Catnavbar from "@/components/Catnavbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Catnavbar/>
      <Carousel/>
      <ProductCard
        image="https://images.unsplash.com/photo-1606813902914-0ce867f059c9?auto=format&fit=crop&w=600&q=80"
        title="Wireless Headphones"
        price={79.99}
        rating={4.3}
        sold={230}
      />
      home</div>
  );
}
