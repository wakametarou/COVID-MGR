import { createTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: pink[100]
    },
    secondary: {
      main: "#00bcd4"
    }
  }
});
