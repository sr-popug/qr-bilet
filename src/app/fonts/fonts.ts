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
export default circe;
