import type { NextConfig } from "next";
import withLitSSR from "@lit-labs/nextjs";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
};

module.exports = withLitSSR()(nextConfig);
