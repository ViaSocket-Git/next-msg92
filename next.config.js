/** @type {import('next').NextConfig} */
module.exports = {
  // Can be safely removed in newer versions of Next.js
  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  
      fs: false, // the solution
    };
    return config;
  },
};
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://test.msg91.com',
    GOOGLE_CLIENT_ID: "467164479375-7gh8a9joi6isk7qbfj4tj1p3srqo66m5.apps.googleusercontent.com",
    ZOHO_CLIENT_ID: "1000.TULN05SRMPWS74404W4PL31U0GA46H",
    GITHUB_CLIENT_ID: "6ee6d0268be4aab8c594",
    msalClientId: "164d09e1-531c-427d-9358-9d1347c74170",
    msalTenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    REDIRECT_URL: "http://localhost:9999",
    OTP_WIDGET_TOKEN: "336843745072363038383330",
    WIDGET_AUTH_TOKEN: "278060T5b78OzKKr964edc975P1",
    WIDGET_SCRIPT:
      "https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js",
  },
};

module.exports = nextConfig;
