export const MUI_PALETTE = {
  primary: {
    main: "#1D1D1B",
    light: "#979797",
    lighter: "#DFDFDF"
  },
  secondary: {
    main: "#F2BEB3",
    light: "#FAE5DF"
  },
  white: {
    main: "#fff"
  }
};

export const MUI_COMPONENTS = (theme) => ({
  MuiSlider: {
    styleOverrides: {
      root: {
        '& .MuiSlider-thumb': {
          height: 20,
          width: 20,
          backgroundColor: '#fff',
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
          '&:focus, &:hover, &.Mui-active': {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
          },
          '@media (hover: none)': {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
          },
        },
        '& .MuiSlider-track': {
          borderRadius: 0,
        },
        '& .MuiSlider-rail': {
          height: 6,
          opacity: 1,
          borderRadius: 0,
          backgroundColor: '#DFDFDF',
        },
        '& .MuiSlider-markLabel': {
          fontSize: 14,
          fontWeight: 500,
          position: 'relative',
          top: "14px",
          marginLeft: "-9px"
        },
        '& .MuiSlider-valueLabel': {
          fontSize: 14,
          fontWeight: 500,
          top: 48,
          backgroundColor: 'unset',
          '&:before': {
            display: 'none',
          },
          '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          },
        },
      }
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        padding: "auto 16px"
      }
    },
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          border: `2px solid ${theme.palette.primary.lighter}`
        },
      },
    ]
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "0px"
      }
    }
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        objectFit: "contain"
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "0px",
        textTransform: "none"
      }
    },
    variants: [
      {
        props: { size: 'massive' },
        style: {
          borderStyle: "inset",
          width: "100%",
          maxWidth: "100%",
          padding: "15px",
          fontWeight: "bold"
        },
      },
      {
        props: { size: 'disc' },
        style: {
          width: "41px",
          minWidth: "unset",
          height: "41px",
          borderRadius: "50%",
          border: `0.5px solid ${theme.palette.primary.lighter}`
        },
      },
    ]
  }
});