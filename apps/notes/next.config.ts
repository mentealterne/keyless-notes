// next.config.ts
import type { NextConfig } from 'next'
import withLitSSR from '@lit-labs/nextjs'

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
};

export default withLitSSR()(nextConfig);
