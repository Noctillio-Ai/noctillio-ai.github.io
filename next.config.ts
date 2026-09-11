import type { NextConfig } from "next";

// Deployed as the Noctillio AI org's GitHub Pages site (Noctillio-Ai.github.io),
// so it lives at the domain root — no basePath/assetPrefix needed. If this ever
// moves to a regular project-page repo (org/some-repo), set basePath/assetPrefix
// to "/some-repo" here.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
