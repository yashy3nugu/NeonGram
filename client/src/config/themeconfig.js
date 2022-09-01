import { theme as originalTheme, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  primary: {
    900: "#020a0f",
    800: "#05131e",
    700: "#394d5b",
    600: "#526370",
    500: "#6b7984",
    400: "#849099",
    300: "#9ca6ad",
    200: "#b5bcc2",
    100: "#e2e4e6",
  },

  secondary: {
    50: "#fff",
    100: "#ecf1fe",
    200: "#d8e3fd",
    300: "#c5d5fc",
    400: "#adc4fb",
    500: "#9eb9fa",
    600: "#8aacf9",
    700: "#779ef9",
    800: "#6390f8",
    900: "#99a3ab",
  },

  // secondary: '#adc4fb',
  tertiary: "#7a27ff",

  tertiaryScheme: {
    900: "#491799",
    800: "#551bb3",
    700: "#621fcc",
    600: "#6e23e6",
    500: "#7a27ff",
    400: "#873dff",
    300: "#9552ff",
    200: "#7a27ff",
    100: "#873dff",
    50: "#7a27ff",
  },
  crimsonScheme: {
    100: "#e02c50",
    200: "#dc143c",
    300: "#c61236",
    400: "#b01030",
    500: "#9a0e2a",
    600: "#840c24",
    700: "#6e0a1e",
    800: "#580818",
    900: "#420612",
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("primary.800", "primary.800")(props),
    },
    button: {
      color: mode("gray.100", "gray.100")(props),
    },
    "&::-webkit-scrollbar": {
      width: "6px",
      // backgroundColor: 'primary.900',
    },
    "&::-webkit-scrollbar-track": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "whiteAlpha.50",
      borderRadius: "24px",
    },
  }),
};

// const IconButton = {
//   // The styles all button have in common
//   baseStyle: {

//     position: 'static',
//   },
// }

const Alert = {
  variants: {
    solid: (props) => {
      // only applies to `subtle` variant
      const { colorScheme: c } = props;

      if(c==="red" ) {
        return {
          container: {
            bg: "crimsonScheme.500",
            color: "gray.50",
          },
        };
      }
      else {
        return originalTheme.components.Alert.variants.solid(props)
      }

      
    },
  },
};

const theme = extendTheme({ colors, config, styles, components: { Alert } });

export default theme;
