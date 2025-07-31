import type { NextConfig } from 'next'
import withLitSSR from '@lit-labs/nextjs'

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withLitSSR()(nextConfig);
