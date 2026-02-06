/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repo.split("/")[1] ?? "";
const isUserSite = repoName.endsWith(".github.io");
const basePath = isGithubActions && !isUserSite ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.nnormal.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.nnormal.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
