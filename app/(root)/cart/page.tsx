import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import Subcartpage from "@/components/Subcartpage"

import { prisma } from "@/lib/prisma"


const Page = async() => {

  const [cartproducts, session] = await Promise.all([
    prisma.ecomCart.findMany(),
    auth()

  ])
  const ids = cartproducts.map((product)=>((product.prodId)));
  
  const products = await prisma.ecomItems.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  //console.log("cartproducts",cartproducts,"prodId",ids,"products",products);
  return (
    <>
    <Navbar search={''} session={session?true:false}/>
    <Subcartpage products={products} quantity={cartproducts}/>
    </>
    )
    
}

export default Page
