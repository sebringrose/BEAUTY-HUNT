import Head from 'next/head';
import { getProduct, getProducts, getDupes, getReview, getContent } from '../../config/firebase';
import ProductLayout from "../../layouts/Product";

export async function getStaticPaths() {
  const products = await getProducts({});
  const paths = products.map(product => ({
    params: { filterByCat: product["Product Category"], productId: product["Product Ref"] }
  }))

  return { paths, fallback: "blocking" }
};

export async function getStaticProps({ params }) {
  const item = await getProduct(params.productId);

  // review might not exist for product and undefined will cause build issues
  let review = {};
  try {
    review = await getReview(params.productId);
  } catch(e) {
    console.log(e);
  }

  // getDupes will always return an array so we nae bother with a try catch
  // little complicated here but we are getting dupes of a product
  // if product is a hero we just get the products with its ref as dupe refs
  // if product is a dupe we gotta get other dupes with hero ref & query for hero item
  const isHero = item["Hero or Dupe"] === "H";
  const heroRef = isHero
    ? item["Product Ref"]
    : item["Hero or Dupe refs"];
  let dupes = await getDupes({ 
    filters: [
      [ "Hero or Dupe refs", "==", heroRef ]
    ]
  });
  if (!isHero) dupes = [ ...dupes, await getProduct(heroRef) ];
  dupes = dupes.filter(dupe => dupe["Product Ref"] !== item["Product Ref"]);

  const dupeReviews = await Promise.all(dupes.map(async dupe => {
    let review = {};
    try {
      review = await getReview(dupe["Product Ref"])
    } catch(e) {
      console.log(e);  
    }
    return review;
  }));

  // now we need to get social content related to the product which is simple enough
  const content = await getContent(params.productId);

  return {
    props: {
      data: {
        item,
        review,
        dupes: {
          items: dupes,
          reviews: dupeReviews
        },
        content
      },
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  };
};

export default function Product({ data, theme }) {
  return <>
    <Head>
      <title>BEAUTY HUNT | {data.item["Product Name"]}</title>  
    </Head>
    <ProductLayout item={data.item} review={data.review} dupes={data.dupes} content={data.content} theme={theme}/>
  </>;
};