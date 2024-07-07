export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_BASE_PRODUCTION_URL;
