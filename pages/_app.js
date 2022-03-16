import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from 'nextjs-breadcrumbs';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';

import I18nWidget from '../components/I18nWidget';
import { 
  MUI_PALETTE,
  MUI_COMPONENTS
} from "../config/mui";

import '../styles/runda.css';
import '../styles/breadcrumbs.css';
import '../styles/helpers.css';

// get this from pages data?
const sections = [
  'Dupes',
  'Looks',
  'Creators'
];

function MyApp({ Component, pageProps }) {
  let theme = createTheme({ 
    palette: MUI_PALETTE, 
  });
  theme = createTheme({ 
    ...theme, 
    components: MUI_COMPONENTS(theme),
    typography: {
      fontFamily: [
        'Runda',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  let darkTheme = createTheme({ palette: { mode: "dark", primary: { ...MUI_PALETTE.primary, lighter: MUI_PALETTE.primary.light }, ...MUI_PALETTE } });
  darkTheme = createTheme({
    ...darkTheme, 
    components: MUI_COMPONENTS(darkTheme),
    typography: {
      fontFamily: [
        'Runda',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>BEAUTY HUNT</title>
    </Head>

    <Grid
      container
      component="main"
      sx={{ margin: "auto", maxWidth: "1366px" }}
    > 
      <Grid item xs={12}>
        <Toolbar sx={{ mt: 2, padding: { md: "0 44px" } }}>
          <Link href="/about" passHref>
            <Button size="small">About Us</Button>
          </Link>
          <Box sx={{ flex: 1, padding: "0 10px", height: "100%", display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", sm: "center" } }}>
            <Image src="/Logo.svg" alt="MWB-logo" width={218} height={48} />
          </Box>
          <Box className="flex-center">
            <Button size="disc">
              <Image src="/Account.svg" width={24} height={24} alt="account" />
            </Button>
          </Box>
        </Toolbar>
      </Grid>

      {/* <Toolbar variant="dense" sx={{ justifyContent: "center", padding: 0 }}>
        {sections.map(section => (
          <Typography color="inherit" noWrap key={section} sx={{ margin: "0 1rem" }}>
            {section}
          </Typography>
        ))}
      </Toolbar> */}
      <Grid item xs={12}>
        <Toolbar variant="dense" sx={{ padding: { md: "0 44px" } }}>
          <Breadcrumbs 
            listClassName="nextjs-breadcrumbs-list" 
            activeItemStyle={{ color: theme.palette.primary.main }}
            inactiveItemStyle={{ color: theme.palette.primary.light }} 
          />
        </Toolbar>
      </Grid>
    </Grid>
    
    <Component {...pageProps} theme={theme} />

    <ThemeProvider theme={darkTheme}>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main, pt: 6, pb: 4 }}>
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column" }}>
          <Box className="flex-center" sx={{ width: "100%", justifyContent: "space-between !important", flexWrap: "wrap" }}>
            <Typography variant="h6" fontWeight="bold" align="left" sx={{ color: theme.palette.primary.contrastText }}>
              BEAUTY HUNT
            </Typography>

            <Box className="flex-center" sx={{ my: 2, mx: "auto" }}>
              <a style={{ margin: "0 10px" }} href={process.env.FACEBOOK_LINK} target="_blank" rel="noreferrer">
                <Button size="disc">
                  <FacebookIcon color="white" />
                </Button>
              </a>
              <a style={{ margin: "0 10px" }} href={process.env.TWITTER} target="_blank" rel="noreferrer">
                <Button size="disc">
                  <TwitterIcon color="white" />
                </Button>
              </a>
              <a style={{ margin: "0 10px" }} href={process.env.INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                <Button size="disc">
                  <InstagramIcon color="white" />
                </Button>
              </a>
              <a style={{ margin: "0 10px" }} href={process.env.TIKTOK_LINK} target="_blank" rel="noreferrer">
                <Button size="disc">
                  <Image src="/tiktok-icon.svg" alt="tiktok" width="20px" height="20px" />
                </Button>
              </a>
            </Box>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography align="left" sx={{ color: theme.palette.primary.contrastText }}>
              Links
            </Typography>
          </Box>

          <Box sx={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between !important" }}>
            <Typography align="left" fontSize="12px" sx={{ color: theme.palette.primary.light }}>
              Copyright &copy; {new Date().getFullYear()} {process.env.COMPANY_NAME}. All Rights Reserved.
            </Typography>

            <I18nWidget />
          </Box>
        </Container>
      </Toolbar>
    </ThemeProvider>
  </ThemeProvider>
}

export default MyApp;
