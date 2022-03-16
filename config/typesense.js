import { SORT_OPTS, LOCALES_MAP } from "./data";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

// Initialize Typesense <- is this products specific?
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.TYPESENSE_SEARCH_API_KEY, // Be sure to use a Search API Key
    nodes: [
      {
        host: process.env.TYPESENSE_CLUSTER_ID, // where xxx is the ClusterID of your Typesense Cloud cluster
        port: '443',
        protocol: 'https'
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "Product Category, Product Ref, Brand Name, Product Name, Product description, Product colours, Product claims, Product ingredients, Package Specifications, Price (GBP), Price (USD)",
  },
});

export const { searchClient } = typesenseInstantsearchAdapter;

const BATCH_SIZE = 24;
const DEFAULT_SORT = SORT_OPTS.products[0];
export const getProducts = async ({ orderWith = DEFAULT_SORT, startFrom = null, filters = [] }) => {
    if (filters[0] && !filters.every(filterOpts => filterOpts.length === 3)) {
      throw new Error("Incorrect filter object passed into getProducts filters array.")
    }

    // typesense query goes here - use BATCH_SIZE
    let products = [];

    // filter out bad price strings & fix img src links with  prefix &  suffix (in future remedy in the data)
    const srcPrefix = "";
    const srcSuffix = "";
    const preName = "";

    products = products.map(product => {
      Object.keys(LOCALES_MAP).forEach(locale => {
        const itemPrice = product[`Price (${LOCALES_MAP[locale].currencyCode})`];
        if (itemPrice[0] !== LOCALES_MAP[locale].currencySymbol) {
          product = { ...product, [`Price (${LOCALES_MAP[locale].currencyCode})`]: "N/A" };
        }
      });

      product["Product Image URLs"] = product["Product Image URLs"]
        .split(",")
        .map(url => {
          const filename = url.slice(url.indexOf(preName) + preName.length);
          return `${srcPrefix}${filename}${srcSuffix}`;
        })
        .join(",");

      return product;
    })

    return products;
};
export const getDupes = getProducts;