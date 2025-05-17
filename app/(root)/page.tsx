import Carousel from "@/components/Carousel";
import Catnavbar from "@/components/Catnavbar";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth"


export default async function Home({ searchParams }: { searchParams: { search?: string; category?: string; sort?: "price-asc" | "price-desc" | "rating-asc" | "rating-desc"; } }) {
  const searchQuery = await searchParams.search?.toLowerCase() || "";
  const categoryQuery = await searchParams.category?.toLowerCase() || "";
  const sortQuery = await searchParams.sort || "";

  let orderBy: any = {};

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
  }


  const filters: any[] = [];

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
      

      <div className="pt-20">
        {!searchQuery && !categoryQuery && <div className="z-0">
          <div className="flex flex-row gap-10 mt-10">
            <div className="w-2/3"><Carousel /></div>
            <div className="w-1/3"><img src='/offer.png' className="w-[400px] "/></div>
            </div>


          </div>}
      </div>
      
      {(searchQuery) && (
        <div className="text-3xl px-20 py-10 bg-gray-200">
          Search result for "{searchQuery}"
        </div>
      )}
      {(categoryQuery) && (
        <div className="text-3xl px-20 py-10 bg-gray-200">
          Category result for "{categoryQuery}"
        </div>
      )}
      


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-gray-100 px-20 pt-10">
        {products.length > 0 ? (
          products.map((item: any) => (
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
