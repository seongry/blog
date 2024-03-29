import Typography from "typography";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: ["IBMPlexSansKR-Regular"],
  bodyFontFamily: ["IBMPlexSansKR-Regular"],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export const { scale, rhythm, options } = typography;
export default typography;
