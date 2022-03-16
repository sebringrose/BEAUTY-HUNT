import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    Container,
    Typography,
    Button,
    Paper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Carousel from "../Carousel";
import ProductItem from "../ProductItem";
import { styled } from '@mui/material/styles';
import VisibilitySensor from 'react-visibility-sensor';
import LoadingBar from '../LoadingBar.js';
import { SCORE_HEADINGS } from "../../config/data";

export default function CompareDupeSection({ item, review, dupes, theme }) {
  const [compareItem, setCompareItem] = useState({});
  const [compareReview, setCompareReview] = useState({});

  const compareScoreData1 = review && Object.keys(review)
    .filter(key => SCORE_HEADINGS.includes(key))
    .sort((a,b) => a > b)
    .map(key => ({ name: key, score: review[key] }));

  const [scores1, setScores1] = useState(compareScoreData1);
  const [scores2, setScores2] = useState([]);

  // for animation on scroll
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!compareItem || item["Product Ref"] === compareItem["Product Ref"]) {
      setCompareItem({});
      setCompareReview({});
    }

    // get review of selected item when "compare" button clicked
    // item and review arrays in dupes data will be same length so can use the index method below
    const reviewIndex = dupes.items.findIndex(dupeItem => dupeItem["Product Ref"] === compareItem["Product Ref"]);
    setCompareReview(dupes.reviews[reviewIndex]);
  }, [item, dupes, compareItem, setCompareItem, setCompareReview]);

  useEffect(() => {
    if (!compareReview) return setScores2([]);

    if (Object.keys(compareReview).some(reviewHeading => SCORE_HEADINGS.includes(reviewHeading))) {
      setScores2(
        Object.keys(compareReview)
          .filter(key => SCORE_HEADINGS.includes(key))
          .sort((a,b) => a > b)
          .map(key => ({ name: key, score: compareReview[key] }))
      )
    } else {
      setScores2(SCORE_HEADINGS.map(heading => ({ name: heading, score: -1 })))
    }
  },[compareReview])

  return <Grid 
    container
  >
    <Grid item sm={1} />
    <Grid item xs={12} sm={10}>
      <Typography variant="h4" fontWeight={600} sx={{ textAlign: { xs: "center", sm: "start" } }}>
        Dupe Gallery
      </Typography>
    </Grid>
    <Grid item sm={1} />

    <Grid item xs={12}>
      <Carousel>
        {dupes.items && dupes.items[0] && dupes.items.map((dupe, i) => <ItemWrapper key={i}>
          <ProductItem data={dupe} resize={false} />
          <Button variant="outlined" disabled={compareItem["Product Ref"] === dupe["Product Ref"]} size="massive" onClick={() => setCompareItem(dupe)}>
            COMPARE
          </Button>
        </ItemWrapper>)}
      </Carousel>
    </Grid>

    {compareItem["Product Ref"] && <ComparePaper variant="outlined">
      <StyledCloseIcon onClick={() => setCompareItem({})} />
      <CompareGridContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", margin: "2rem 0" }}>
          <Typography variant="h5" fontWeight={600}>
            Product Comparison
          </Typography>
          <StyledButton onClick={() => setCompareItem({})}>
            <Typography 
              variant="caption" 
              fontWeight={600} 
              color={theme.palette.primary.light}
            >
              CLEAR
            </Typography>
          </StyledButton>

        </Box>
        <Grid container>
          <GridItem item xs={6} sx={{ paddingRight: { xs: "5px", sm: "10px" } }}>
            <Box sx={{ minHeight: "437.5px", width: { xs: "unset", md: "300px" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
              <ProductItem data={item} resize={false} noMargin/>
              <Button variant="contained" size="massive" sx={{ maxWidth: "300px" }}>BUY</Button>
            </Box>
            <VisibilitySensor partialVisibility onChange={(isVisible) => setFired(isVisible)}>
              <Box sx={{margin: '30px 0px'}}>
              <Grid container columnSpacing={10} rowSpacing={3}>
                {scores1 && scores1.map(({ name, score }) => 
                  <Grid key={name} item xs={12}>
                    <LoadingBar name={name} isFired={fired} isGrey={(score == -1) ? true : false} score={score} theme={theme}/>
                  </Grid>)}
              </Grid>
              </Box>
            </VisibilitySensor>
          </GridItem>
          <GridItem item xs={6} sx={{ paddingLeft: { xs: "5px", sm: "10px" } }}>
            <Box sx={{ minHeight: "437.5px", width: { xs: "unset", md: "300px" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
              <ProductItem data={compareItem} resize={false} noMargin/>
              <Button variant="contained" size="massive" sx={{ maxWidth: "300px" }}>BUY</Button>
            </Box>
            <VisibilitySensor partialVisibility onChange={(isVisible) => setFired(isVisible)}>
              <Box sx={{margin: '30px 0px'}}>
              <Grid container columnSpacing={10} rowSpacing={3}>
                {scores2 && scores2.map(({ name, score }) => 
                  <Grid key={name} item xs={12}>
                    <LoadingBar name={name} isFired={fired} isGrey={(score == -1) ? true : false} score={score} theme={theme}/>
                  </Grid>)}
              </Grid>
              </Box>
            </VisibilitySensor>
          </GridItem>
        </Grid>
      </CompareGridContainer>
    </ComparePaper>}
  </Grid>;
};

const ItemWrapper = styled(Box)({
  width: "100%",
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
});

const ComparePaper = styled(Paper)({
  margin: "2rem auto",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 600px)": {
    margin: "0",
    padding: "0",
    border: "none"
  },
});

const CompareGridContainer = styled(Box)({
  width: "100%",
  maxWidth: "1000px"
});

const GridItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const StyledCloseIcon = styled(CloseIcon)({
  alignSelf: "flex-end",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    display: "none"
  },
})

const StyledButton = styled(Button)({
  display: "none",
  "@media (max-width: 600px)": {
    display: "block"
  }
})