import { useState } from "react";
import { useRouter } from "next/router";
import { LOCALES_MAP } from "../config/data";
import Image from "next/image";
import ImageGallery from "../components/ImageGallery";
import CompareDupeSection from "../components/CompareDupeSection";
import SocialSection from "../components/SocialSection";
import ScoreSection from "../components/ScoreSection";

import { 
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Link
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import 'react-circular-progressbar/dist/styles.css';

export default function ProductLayout({ item, review, dupes, content, theme }) {
  console.log(item)
  console.log(review)

  const { locale } = useRouter();
  const currencyCode = LOCALES_MAP[locale].currencyCode;
  const [rating] = useState(review["Rating"]);

  const images = item["Product Image URLs"] !== "Missing" && item["Product Image URLs"]
    ? item["Product Image URLs"].split(",").filter(img => img && img !== " ")
    : [ "/No_image_available.svg" ]

  return <Grid 
    container
    component="main"
    sx={{ 
      pt: 2,
      px: { xs: 2, sm: 0 },
      maxWidth: 1366,
      margin: "auto"
    }}
  >
    <Grid item xs={12}>
      {/* NAME & PRICE (only visible on mobile) */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Typography fontWeight={600} sx={{ my: 1 }}>
          {item["Brand Name"]}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography variant="h4" fontWeight={600} sx={{ flex: 1, minWidth: "150px" }}>
            {item["Product Name"]}
          </Typography>
          <Typography variant="h4" fontWeight={300}>
            {item[`Price (${currencyCode})`]}
          </Typography>
        </Box>
      </Box>

      {/* REVIEW & FAVOURITE (only visible on mobile) */}
      <Box sx={{ margin: "2rem 0", display: { xs: "flex", sm: "none" }, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledRating 
            readOnly 
            value={rating} 
            precision={0.1} 
            size="small" 
          />
          {/* <Link href="#reviews">
            <Typography variant="caption" fontWeight={600}>
              Read reviews
            </Typography>
          </Link> */}
        </Box>
        <Button variant="outlined" size="disc">
          <FavoriteBorderIcon />
        </Button>
      </Box>
    </Grid>

    <Grid item sm={1} />
    <Grid item xs={12} sm={5} sx={{ display: "flex", justifyContent: "center" }}>
      <ImageGallery 
        images={images.map(image => ({
          src: image, alt: image
        }))}
      />
    </Grid>
    <Grid item sm={1} />
    <Grid item xs={12} sm={4}>
      
      {/* NAME & PRICE (only visible on desktop) */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography fontWeight={600}>
          {item["Brand Name"]}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography variant="h4" fontWeight={600} sx={{ flex: 1, minWidth: "150px" }}>
            {item["Product Name"]}
          </Typography>
          <Typography variant="h4" fontWeight={300}>
            {item[`Price (${currencyCode})`]}
          </Typography>
        </Box>
      </Box>

      {/* REVIEW & FAVOURITE (only visible on desktop) */}
      <Box sx={{ margin: "2rem 0", display: { xs: "none", sm: "flex" }, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledRating 
            readOnly 
            value={rating} 
            precision={0.1} 
            size="small" 
          />
          {/* <Link href="#reviews">
            <Typography variant="caption" fontWeight={600}>
              Read reviews
            </Typography>
          </Link> */}
        </Box>
        <Button variant="outlined" size="disc">
          <FavoriteBorderIcon />
        </Button>
      </Box>

      {/* COLOR OPTIONS */}

      {/* DIMENSIONS */}
      {item["Package Specifications"] && <Box sx={{ margin: "1rem 0", display: "flex" }}>
        <Typography fontWeight={600} sx={{ marginRight: "1rem" }}>
          SIZE
        </Typography>
        <Typography>
          {item["Package Specifications"]}
        </Typography>
      </Box>}

      {/* BUY BUTTON */}
      <Button 
        variant="contained" 
        size="massive" 
        sx={{ margin: "2rem 0" }}
        onClick={() => window.open(item[`Source URL (${currencyCode})`], '_blank')}
      >
        <Typography fontWeight={500}>
          BUY
        </Typography>
      </Button>

      {/* DESCRIPTION */}
      {item["Product description"] && <Box sx={{ margin: "1rem 0" }}>
          <Typography fontWeight={600} sx={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
            <Image src="/Info.svg" alt="info" width="24px" height="24px" />
            DESCRIPTION
          </Typography>
        <Typography>
          {item["Product description"]}
        </Typography>
      </Box>}

      {/* PRODUCT CLAIMS */}

      {/* PRODUCT CREATORS */}
    </Grid>
    <Grid item sm={1} />
    
    {/* SCORE SECTION */}
    <Grid item sm={1} />
    <Grid item xs={12} sm={10} sx={{ my: 2 }}>
      <ScoreSection review={review} theme={theme} />
    </Grid>
    <Grid item sm={1} />
    
    {/* COMPARE DUPE SECTION */}
    {/* Carousel sections have their own internal grid so don't wrap like above score section */}
    <Grid item xs={12} sx={{ my: 2 }}>
      <CompareDupeSection item={item} review={review} dupes={dupes} theme={theme} />
    </Grid>

    {/* SOCIAL SECTION */}
    <Grid item xs={12} sx={{ my: 2 }}>
      <SocialSection content={content} />
    </Grid>
  </Grid>
}

const StyledRating = styled(Rating)(({ theme }) => ({
  marginRight: "20px",
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  }
}));