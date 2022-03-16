import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useRef, useCallback } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { 
  Container, 
  Box, 
  Button, 
  Grid,
  Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Search from "../components/Search";


export default function CollectionLayout({ itemsData, itemCount, pageContentful, loadMore, ItemComponent, filterOpts, sortOpts, DEFAULT_SORT, currencyCode, currencySymbol, linkRoot, theme }) {
  const router = useRouter();
  const [items, setItems] = useState(itemsData);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [moreItems, setMoreItems] = useState(true);
  const [maxPrice, setMaxPrice] = useState(Math.max(...itemsData.map(item => Number(item[`Price (${currencyCode})`].slice(1))).filter(i => i)));

  // useEffect(() => {

  // }, [itemsData])

  const drawerWidth = 240;
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    let newItems;
    try {
      newItems = await loadMore(items, sort);
    } catch(e) {
      console.log(e);
    }
    if (newItems.length == items.length) setMoreItems(false);
    setItems(newItems);
    setLoading(false);
  };

  const handleSort = async (e) => {   
    setSort(e.target.value);
    setLoading(true);
    let newItems;
    try {
      newItems = await loadMore(undefined, e.target.value);
    } catch(e) {
      console.log(e);
    }
    setItems(newItems);
    setLoading(false);
  }

  const updateTimeout = useRef();
  const priceFilterHandler = useCallback((e) => {
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      console.log("doing it")
      loadMore(undefined, "Price", [ [`Price (${currencyCode})`, "<", `${currencySymbol}${e.target.value}`] ]);
    }, 100);
  }, [loadMore, currencyCode, currencySymbol]);

  const drawer = <Container sx={{ py: 2 }}>
    <Button variant="outlined" size="massive" sx={{ margin: "0.5rem auto", padding: "0.5rem" }} onClick={() => router.push({ pathname: linkRoot }, undefined, { scroll: false })}>
      RESET FILTERS
    </Button>

    <Typography fontWeight="bold" fontSize="14px" my={2}>
      PRICE
    </Typography>
    <Slider 
      sx={{ mb: 4 }}
      defaultValue={maxPrice} 
      aria-label="Price slider"
      getAriaValueText={(value) => `${currencySymbol}${value}`}
      step={1}
      max={maxPrice}
      marks={[ { value: 0, label: `${currencySymbol}0` } ]}
      valueLabelDisplay="on"
      valueLabelFormat={(value) => `${currencySymbol}${value}`}
      onChange={priceFilterHandler}
    />
    {filterOpts && Object.values(filterOpts).map(filterGroup => {
      return Object.keys(filterGroup).map(cat => <Box key={cat}>
        <Divider />
        <Typography fontWeight="bold" fontSize="14px" my={2}>
          {cat}
        </Typography>
        <List sx={{ pt: 0 }}>
          {filterGroup[cat] && Object.keys(filterGroup[cat]).map(subCat => (
            <ListItem key={subCat} sx={{ padding: 0, margin: "5px 0" }}>
              {filterGroup[cat][subCat].comingSoon
                ? <FilterItem sx={{ '&:hover': { textDecoration: "none", cursor: "unset" } }}>
                  {subCat}
                  &nbsp;
                  <span style={{ fontSize: "8px", color: "black" }}>
                    COMING SOON
                  </span>
                </FilterItem>
                : <Link href={`${linkRoot}${filterGroup[cat][subCat].code}`} scroll={false} passHref>
                  <FilterItem>
                    {subCat}
                  </FilterItem>
                </Link>
              }
            </ListItem>
          ))}
        </List>
      </Box>)
    })}
  </Container>;

  return <>
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { sm: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box', 
          width: drawerWidth,
          border: "none"
        },
      }}
    >
      {drawer}
    </Drawer>

    <Box 
      className="flex-center" 
      sx={{ 
        height: "295px",
        backgroundColor: "#eaeaea", 
        backgroundImage: `url(${pageContentful.fields.image.fields.file.url})` || "unset",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <Box sx={{ margin: "3rem", maxWidth: "500px" }}>
        <Typography fontSize="60px" fontWeight="bold" align="center" sx={{ lineHeight: "66px" }}>
          {pageContentful.fields.titleText || "Our Store"}
        </Typography>
        <Typography fontSize="14px" color="inherit" align="center" paragraph>
        {pageContentful.fields.subtitleText || "Find the perfect creator for you, learn how to do it and buy the products you need."}
        </Typography>
      </Box>
    </Box>

    <Grid
      container
      component="main"
      sx={{ margin: "auto", maxWidth: "1366px" }}
    > 
      <Grid item md={3}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              height: "100%",
              position: "relative",
              boxSizing: 'border-box',
              border: "none"
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Grid>

      <Grid item sm={12} md={9}>
        <Search />
        
        <Toolbar sx={{ alignItems: "stretch", my: { xs: 0, md: 2 }, border: { xs: `1px solid ${theme.palette.primary.lighter}`, md: "none" } }}>
          <Box className="flex-center" sx={{ py: 1 }}>
            <Button
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: 'none' } }}
            >
              <Image src="/Filter.svg" alt="filter" width="24px" height="24px" />
              &nbsp;FILTERS
            </Button> 
          </Box>
          <Box className="flex-center">
            <Typography 
              variant="caption" 
              color="primary.light" 
              fontWeight={500} 
              noWrap 
              component="div"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Showing 1-{items && items.length} of {itemCount} results
            </Typography>
            {/* <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={infiniteScroll}
                    onChange={() => setInfiniteScroll(infiniteScroll => !infiniteScroll)}
                    inputProps={{ 'aria-label': 'infitine-scroll-toggle' }}
                  />
                }
                label="Infinite scroll"
              />
            </FormControl> */}
          </Box>
          <Box sx={{ 
            pl: 1, 
            flex: 1, 
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" }, 
            minHeight: "100%", 
            borderLeft: { xs: `1px solid ${theme.palette.primary.lighter}`, md: "none" } 
          }}>
            <label id="sort-selector-label" htmlFor="sort-selector">
              <Typography variant="caption" color="primary.light" fontWeight={500}>
                SORT BY:&nbsp;
              </Typography>
            </label>
            <StyledSelect
              labelid="sort-selector"
              id="sort-selector"
              onChange={handleSort}
              value={sort}
            >
              {sortOpts.map(sort => <option key={sort} value={sort}>
                {sort}
              </option>)}
            </StyledSelect>
          </Box>
        </Toolbar>
        <Toolbar sx={{ display: { xs: "flex", md: "none", justifyContent: "center" } }}>
          <Typography 
            variant="caption" 
            color="primary.light" 
            fontWeight={500} 
            noWrap 
            component="div"
          >
            Showing 1-{items && items.length} of {itemCount} results
          </Typography>
        </Toolbar>
        { // infiniteScroll 
          // ? <InfiniteScroll
          //   dataLength={items.length} //This is important field to render the next data
          //   next={handleLoadMore}
          //   hasMore={moreItems}
          //   loader={<Box className="flex-center" sx={{ width: "100%" }}>
          //     <Button onClick={handleLoadMore} disabled={loading}>
          //       <Image src="/Loading.svg" alt="loading" width={64} height={64} />
          //     </Button>
          //   </Box>}
          //   scrollThreshold="500px"
          //   style={{ width: "100%", flexWrap: "wrap", alignItems: "stretch" }}
          //   className="flex-center"
          // >
          //   {items && items.map(item => <ItemComponent data={item} key={item["Product Ref"]} />)}
          // </InfiniteScroll>
          // :
          <Box className="flex-center" sx={{ flexWrap: "wrap", alignItems: "stretch !important" }}>
            {items && items.map(item => <ItemComponent data={item} key={item["Product Ref"]} />)}
            <Box className="flex-center" sx={{ width: "100%", padding: "1rem" }}>
              {loading
                ? <Image src="/Loading.svg" alt="loading" width={64} height={64} />
                : <Button sx={{ maxWidth: "300px" }} variant="contained" size="massive" onClick={handleLoadMore} disabled={loading || !moreItems}>LOAD MORE PRODUCTS</Button>
              }
            </Box>
          </Box>
        }
      </Grid>
    </Grid>
  </>;
};

const FilterItem = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "bold",
  padding: 0,
  cursor: "pointer", 
  color: theme.palette.primary.light,
  '&:hover': { textDecoration: "underline" }
}));

const StyledSelect = styled("select")(({ theme }) => ({
  border: "none",
  background: "none",
  fontWeight: 600,
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  cursor: "pointer"
}));