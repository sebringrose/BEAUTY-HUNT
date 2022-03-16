import Image from "next/image";
import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function ImageGallery({ images }) {
  const [selected, setSelected] = useState(images[0]);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setSelected(images[0]);
  }, [images]);

  // https://stackoverflow.com/questions/67573924/next-js-vercel-dynamic-images-displaying-locally-but-not-in-production
  // @juliomalves: Thanks a lot! You helped me to find the issue: the URLs of the images were incorrect (all lowercase). This wasn't a problem in development, but in production.. 

  return <>
    {/* full-screen ting */}
    <Box 
      className="flex-center" 
      onClick={() => setFullscreen(false)}
      sx={{ 
        display: fullscreen
          ? "flex !important"
          : "none !important",
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 2
      }}
    > 
      <Box>
        <Box 
          onClick={() => setFullscreen(false)}
          sx={{ 
            position: "relative",
            width: "24px", 
            height: "24px", 
            margin: "0px 5px -29px auto", 
            zIndex: 1, 
            cursor: "pointer",
            backgroundColor: "white"
          }}
        >
          <FullscreenExitIcon />
        </Box>
        <Image onClick={(e) => e.stopPropagation()} src={selected.src} alt={selected.alt} width={1000} height={1000} />
      </Box>
    </Box>

    <Grid 
      container
      spacing={2}
    >
      <Grid item xs={12} className="flex-center">
        <Box sx={{ width: "100%" }}>
          <Image src={selected.src} alt={selected.alt} width={500} height={500} layout="responsive" />
          <Box 
            onClick={() => setFullscreen(true)}
            sx={{ 
              position: "relative",
              width: "24px", 
              height: "24px", 
              margin: "-35.5px 5px 0 auto", 
              zIndex: 1, 
              cursor: "pointer",
            }}
          >
            <FullscreenIcon />
          </Box>
        </Box>
      </Grid>

      {images.map(image => <Grid 
        key={image.alt}
        item 
        xs={3} 
        onClick={() => setSelected(image)} 
      >
        <Box className="flex-center" sx={{ border: selected.src === image.src 
          ? "solid 1px black"
          : "none"
        }}>
          <Image 
            src={image.src} 
            alt={image.alt} 
            width={130} 
            height={130} 
          />
        </Box>
      </Grid>)}
    </Grid>
  </>;
};