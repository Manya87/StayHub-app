export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'StayHub',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Smart PG & Hostel Management Platform',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};
