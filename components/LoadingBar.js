import { Box, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';

export default function LoadingBar({isFired, score, theme, isGrey, name}) {
	return <Box>
		<Typography sx={{fontWeight: 'bold'}}>{name}</Typography>
		<Box width={'100%'} height={'30px'} sx={{ backgroundColor: isGrey ? 'lightgrey' : theme.palette.secondary.light, overflow: 'hidden'}}>
      		{!isGrey && <InnerSlideBox width={`${Math.floor(score)}%`} height={'30px'} fired={isFired} sx={{position: 'relative', backgroundColor: theme.palette.secondary.main, transition: 'all 0.6s', display:'flex', justifyContent: 'center'}}><Typography sx={{color: 'white', textAlign: 'center', lineHeight: '1.8', 'fontWeight': 'bold'}} >{Math.floor(score)} %</Typography></InnerSlideBox>}
    	</Box>
    </Box>
}

const InnerSlideBox = styled(Box)(({fired, theme}) => ({
  left: `${fired ? '0px' : '-100%'}`,
}))


