import { InstantSearch, SearchBox, Hits, Stats } from "react-instantsearch-dom";
import {
  Typography, 
  Link 
} from "@mui/material";
import { searchClient } from "../../config/typesense";

export default function SearchInterface() {
  const Hit = ({ hit }) => {
    return <Link href={`/EY/${hit["Product Ref"]}`}>
      <Typography fontWeight="bold">{hit["Product Name"]}</Typography>
      <Typography>{hit["Brand Name"]}</Typography>
    </Link>
  }

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox />
      <Stats />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}