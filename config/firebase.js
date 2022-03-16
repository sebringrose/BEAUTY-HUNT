import { SORT_OPTS, LOCALES_MAP } from "./data";
import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  where
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);

// these hardcoded hacky values could be erased by sorting the storage links in the spreadsheet but works for now
const srcPrefix = "";
const srcSuffix = "";
const preName = "";

// GET functions
export const getReview = async (pRef) => {
  const reviewsCollection = collection(firestore, 'reviews');
  const q = await query(reviewsCollection, where("Product Ref", "==", pRef));
  const qSnap = await getDocs(q);
  if (!qSnap.docs[0]) throw new Error(`No review document found for product ref: ${pRef}`);
  const review = await qSnap.docs[0].data();
  return review;
}

export const getProduct = async (pRef) => {
  const productsCollection = collection(firestore, 'products');
  const q = await query(productsCollection, where("Product Ref", "==", pRef));
  const qSnap = await getDocs(q);
  let product = await qSnap.docs[0].data();
  product["Product_Site_Link"] = `/${product["Product Category"]}/${product["Product Ref"]}`;

  Object.keys(LOCALES_MAP).forEach(locale => {
    const itemPrice = product[`Price (${LOCALES_MAP[locale].currencyCode})`];
    if (itemPrice[0] !== "£" && itemPrice[0] !== "$") {
      product = { ...product, [`Price (${LOCALES_MAP[locale].currencyCode})`]: "N/A" };
    }
  })

  product["Product Image URLs"] = product["Product Image URLs"]
    .split(",")
    .map(url => {
      const filename = url.slice(url.indexOf(preName) + preName.length);
      return `${srcPrefix}${filename}${srcSuffix}`;
    })
    .join(",");

  return product;
};

export const getContent = async (pRef) => {
  const content = [];
  const contentCollection = collection(firestore, 'content');
  const q = await query(contentCollection, where("Product Reference", "==", pRef));
  const qSnap = await getDocs(q);
  await qSnap.docs.forEach(doc => content.push(doc.data()));
  
  return content;
};

export const getCount = async (id) => {
  const countCollection = collection(firestore, 'counters');
  const countDocRef = await doc(countCollection, `/${id}`);
  const countDoc = await getDoc(countDocRef);

  if (!countDoc.exists()) throw new Error(`No counter document found for provided id: ${id}`)

  return countDoc.data().count;
};

const BATCH_SIZE = 24;
const DEFAULT_SORT = SORT_OPTS.products[0];
export const getProducts = async ({ orderWith = DEFAULT_SORT, startFrom = null, filters = [] }) => {
    const productsCollection = collection(firestore, 'products');
    let products = [];

    if (filters[0] && !filters.every(filterOpts => filterOpts.length === 3)) {
      throw new Error("Incorrect filter object passed into getProducts filters array.")
    }

    const q = await query(
      productsCollection,
      ...filters.map(filterOpts => where(filterOpts[0], filterOpts[1], filterOpts[2])),
      orderBy(orderWith),
      startAfter(startFrom ? startFrom : null),
      limit(BATCH_SIZE)
    )

    const qSnap = await getDocs(q);
    qSnap.forEach(doc => {
      const data = doc.data();
      data["Product_Site_Link"] = `/${data["Product Category"]}/${data["Product Ref"]}`;
      products.push(data);
    });

    // filter out bad price strings & fix img src links with  prefix &  suffix
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

// export const getLooks = async () => await getDocs(collection(firestore, 'looks'));
// export const getCreators = async () => await getDocs(collection(firestore, 'creators'));