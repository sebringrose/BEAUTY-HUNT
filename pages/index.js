import { useRouter } from 'next/router';
import { getCount, getProducts } from '../config/firebase';
import ProductItem from '../components/ProductItem';
import CollectionLayout from "../layouts/Collection";
import { LOCALES_MAP, FILTER_OPTS, SORT_OPTS } from '../config/data';

import { createClient } from "contentful";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const products = await getProducts({});

  let productCount;
  try {
    productCount = await getCount("products");
  } catch(e) {
    console.log(e);
    productCount = "X";
  }

  // CONTENFULL STUFF
  const contentfulClient = createClient({
    space: "sxs4kku9i19c",
    accessToken: "PfDl7g6jDx4_T0m0K1I_JDpNncxTOKbJhlkGxgILz38"
  });
  const response = await contentfulClient.getEntries();
  const pageContentful = response.items.filter(item => item.fields.pageRoute === "/")[0];

  // filtering categories passed in for filter drawer options
  return {
    props: {
      data: {
        items: products,
        itemCount: productCount,
        pageContentful
      },
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  };
};

export default function Home({ data, theme }) {
  const { locale } = useRouter();
  const DEFAULT_SORT = SORT_OPTS.products[0];
  const currencyCode = LOCALES_MAP[locale].currencyCode;
  const currencySymbol = LOCALES_MAP[locale].currencySymbol;

  const loadMoreProducts = async (items=[], sort=DEFAULT_SORT, filters=[]) => {
    // specific handling for prices as it's locale based
    sort = sort !== "Price"
      ? sort 
      : `${sort} (${currencyCode})`

    const products = await getProducts({ 
      orderWith: sort, 
      startFrom: items[0] ? items[items.length-1][sort] : null,
      filters
    });
    
    return [ ...items ? items : [], ...products ];
  };
  
  return <CollectionLayout 
    pageContentful={data.pageContentful}
    itemsData={data.items} 
    itemCount={data.itemCount}
    loadMore={loadMoreProducts} 
    ItemComponent={ProductItem} 
    filterOpts={FILTER_OPTS.product} 
    sortOpts={SORT_OPTS.products} 
    DEFAULT_SORT={DEFAULT_SORT}
    currencyCode={currencyCode}
    currencySymbol={currencySymbol}
    linkRoot={"/"} 
    theme={theme} 
  />;
};