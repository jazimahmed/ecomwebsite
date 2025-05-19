import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth"
import { Prisma } from "@prisma/client";


export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string; category?: string; sort?: "price-asc" | "price-desc" | "rating-asc" | "rating-desc" }> }) {
  const {search , category, sort} = await searchParams;
  const searchQuery = search?.toLowerCase() || "";
  const categoryQuery = category?.toLowerCase() || "";
  const sortQuery = sort?.toLowerCase() || "";

  let orderBy: { [key: string]: "asc" | "desc" } = {};

  if (sortQuery === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sortQuery === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sortQuery === "rating-asc") {
    orderBy = { rating: "asc" };
  } else if (sortQuery === "rating-desc") {
    orderBy = { rating: "desc" };
  } else {
    orderBy = { id: "desc" }; 
  };
  type ProductItem = {
    id: string;
    title: string;
    price: number;
    rating: number;
    sold?: number;
    thumbnail: string;
  };
  


  const filters: Prisma.ecomItemsWhereInput[] = [];

  if (searchQuery) {
    filters.push({
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (categoryQuery) {
    filters.push({
      category: {
        contains: categoryQuery,
        mode: "insensitive",
      },
    });
  }

  const [session, products] = await Promise.all([
    auth(),
    prisma.ecomItems.findMany({
      where: filters.length > 0 ? { AND: filters } : {},
      orderBy,
    }),
  ]);
  //console.log(session,'1000');

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">

      <Navbar search={searchQuery} session={session?true:false} />
      </div>
      

      <div className="pt-20 bg-gray-100">
        {!searchQuery && !categoryQuery && <div className="z-0">
          <div className="flex md:flex-row flex-col gap-10 mt-10 justify-center item-center">
            <div className="w-full p-3 md:w-2/3"><Carousel /></div>
            <div className="w-full  md:w-1/3"><img src='/offer.png' className="w-[400px] " alt="offerpic"/></div>
            </div>


          </div>}
      </div>
      
      {(searchQuery) && (
        <div className="text-3xl px-20 py-10 bg-gray-200">
          Search result for “{searchQuery}”

        </div>
      )}
      {(categoryQuery) && (
        <div className="text-3xl px-20 py-10 bg-gray-200">
          Category result for “{categoryQuery}”
        </div>
      )}
      


      <div className="grid grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-gray-100 md:px-20 pt-10">
        {products.length > 0 ? (
          products.map((item: ProductItem) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <ProductCard
                image={item.thumbnail}
                title={item.title}
                price={item.price}
                rating={item.rating}
                sold={item.sold || 0}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600 py-20">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
