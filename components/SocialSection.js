import { 
  Box,
  Grid,
  Typography
} from "@mui/material";

import Carousel from "./Carousel";

export default function SocialSection({ content }) {
  const ytVideos = content.filter(cntnt => cntnt["Source"] === "YouTube" && cntnt["Source Link"]);
  const igPosts = content.filter(cntnt => cntnt["Source"] === "Instagram" && cntnt["Source Link"]);

  console.log(ytVideos);
  console.log(igPosts);

  return <Grid container sx={{ margin: { xs: "2rem auto", sm: "6rem auto" } }}>
    {ytVideos[0] && <>
      <Grid item sm={1} />
      <Grid item xs={12} sm={10}>
        <Typography variant="h4" fontWeight={600} sx={{ textAlign: { xs: "center", sm: "start" } }}>
          YouTube
        </Typography>
      </Grid>
      <Grid item sm={1} />

      <Carousel>
        {ytVideos.map(vid => {
          const VIDEO_ID = getYTID(vid["Video Link"]);

          return <div key={vid["UGC Number"]} className="flex-center" style={{ width: "100%", height: "250px" }}>
            <iframe style={{ border: "none", width: "100%" }} src={`https://www.youtube.com/embed/${VIDEO_ID}`} />;
          </div>
        })}
      </Carousel>
    </>}
  </Grid>
};

const getYTID = (vidLink) => {
  const vidURL = new URL(vidLink);

  if (vidURL.host === "youtu.be") {
    return vidURL.pathname.substr(1);
  }

  const vidURLParams = new URLSearchParams(vidURL.search);

  return vidURLParams.get("v");
}