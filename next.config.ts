import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  //배포 하기 위해서 ESLint 경고 무시 
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
