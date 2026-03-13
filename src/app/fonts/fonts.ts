import localFont from "next/font/local";

const circe = localFont({
  src: [
    {
      path: "./Circe-Regular.ttf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./Circe-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const tbank = localFont({
  src: [
    {
      path: "./t-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./t-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./t-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./t-super-bold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});
export default circe;
export { tbank };
