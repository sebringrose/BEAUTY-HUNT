import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid
} from "@mui/material";
import { SCORE_HEADINGS } from "../config/data";
import VisibilitySensor from 'react-visibility-sensor';
import LoadingBar from '../components/LoadingBar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function ScoreSection({ review, theme }) {
  const [fired, setFired] = useState(false);
  const [overallScore, setOverallScore] = useState(
    review["Overall Score"] && review["Overall Score"] !== -1 
      ? Math.floor(review["Overall Score"] * 10)
      : "N/A"
  );

  const [scores, setScores] = useState(
    Object.keys(review).some(reviewHeading => SCORE_HEADINGS.includes(reviewHeading)) 
      ? Object.keys(review)
        .filter(key => SCORE_HEADINGS.includes(key))
        .sort((a,b) => a > b)
        .map(key => ({ name: key, score: review[key] }))
      : SCORE_HEADINGS.map(heading => ({ name: heading, score: -1 }))
  );

  useEffect(() => {
    const overallScore = review["Overall Score"] && review["Overall Score"] !== -1 
      ? Math.floor(review["Overall Score"] * 10) 
      : "N/A"

    const scoreData = Object.keys(review)
      .filter(key => SCORE_HEADINGS.includes(key))
      .sort((a,b) => a > b)
      .map(key => ({ name: key, score: review[key] }));

    setOverallScore(overallScore);
    setScores(scoreData);
  }, [review])

  return <VisibilitySensor partialVisibility onChange={(isVisible) => setFired(isVisible)}>
    <Box sx={{ margin: { xs: "2rem auto", sm: "6rem auto" } }}>
      <Box sx={{ display: 'flex', justifyContent: { xs: "center", sm: "flex-start" }, alignItems: "center" }}>
        <Typography variant={'h4'} display="inline-block" sx={{ fontWeight: 'bold', lineHeight: 'unset' }}>The Score</Typography>
        <Box sx={{ width: 45, height: 45, display: 'inline-block', marginLeft: { xs: "10px", sm: "40px" } }}> 
          {/* {review["Overall"] &&  */}
          <CircularProgressbar 
            value={(fired && overallScore)} 
            text={`${(fired && overallScore)}`} 
            styles={buildStyles({
              textSize: "38px",
              textColor: theme.palette.secondary.main,
              pathColor: theme.palette.secondary.main,
              trailColor: theme.palette.secondary.light,
            })}
          />
          {/* } */}
        </Box>
      </Box>
      <Box sx={{margin: '30px 0px'}}>
        <Grid container columnSpacing={10} rowSpacing={3}>
          {scores[0] && scores.map(({ name, score }) => <Grid key={name} item xs={12} sm={4}>
            <LoadingBar name={name} isFired={fired} isGrey={(score == -1) ? true : false} score={Math.floor(score)} theme={theme}/>
          </Grid>)}
        </Grid>
      </Box>
    </Box>
  </VisibilitySensor>
}