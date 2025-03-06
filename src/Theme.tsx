import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: "#FFCC80", // Orange 300
            main: "#FFA726", // Orange 400
            dark: "#FB8C00", // Orange 700
        },
        secondary: {
          main: "#FFC107", // Amber 500
        },
        error: {
          main: "#FF0000",
        },
        background: {
          default: "#FFF8E1", // Amber 50, a light amber for background
        },
      },
  });

function Theme(props: any){
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default Theme;