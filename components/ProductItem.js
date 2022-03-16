import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { LOCALES_MAP } from "../config/data";

export default function ProductItem({ data, resize=true, noMargin }) {
  const router = useRouter();
  const currencyCode = LOCALES_MAP[router.locale].currencyCode;

  const EXCERPT_LENGTH = 50;

  const images = data["Product Image URLs"] !== "Missing" && data["Product Image URLs"]
    ? data["Product Image URLs"].split(",")
    : [ "/No_image_available.svg" ]

  return <StyledCard 
    sx={{ 
      maxWidth: { xs: resize ? "150px" : "270px", sm: "270px" },
      margin: noMargin ? "0" : "20px 10px",
    }}
    onMouseUp={() => router.push(data["Product_Site_Link"])}
  >
    <CardActionArea>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
        {data["Hero or Dupe"] === "H"
          ? "HERO"
          : "DUPE"
        }
      </div>
      <CardMedia 
        component="div" 
        className="flex-center" 
        sx={{ 
          margin: "auto",
          position: "relative",
          height: { xs: resize ? "150px" : "220px", sm: "220px" },
          width: { xs: resize ? "150px" : "270px", sm: "270px" }
        }}
      >
        <Image layout="fill" src={images[0]} alt={images[0]} />
      </CardMedia>
      {/* <CardMedia
        component="img"
        height="220"
        image={images[0]}
        alt={images[0]}
        sx={{ height: { xs: resize ? "150px" : "220px", sm: "220px" } }}
      /> */}
      {/* Use commented bits for responsive view eventually */}
      <CardContent sx={{ padding: 0, display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ width: "70%" }}>
          <Typography fontSize="14px" color="text.secondary">
            {data["Brand Name"]}
          </Typography>
          <Typography fontWeight="bold" sx={{ fontSize: { xs: resize ? "16px" : "22px", sm: "22px" } }}>
            {data["Product Name"][EXCERPT_LENGTH]
              ? `${data["Product Name"].slice(0,EXCERPT_LENGTH)}...`
              : data["Product Name"]}
          </Typography>
        </Box>
        <Typography fontWeight={400} sx={{ marginLeft: "auto", fontSize: { xs: resize ? "14px" : "20px", sm: "20px" } }}>
          {data[`Price (${currencyCode})`]}
        </Typography>
      </CardContent>
    </CardActionArea>
  </StyledCard>
}

const StyledCard = styled(Card)({
  width: "100%",
  maxWidth: "270px",
  border: "none",
  boxShadow: "none"
});