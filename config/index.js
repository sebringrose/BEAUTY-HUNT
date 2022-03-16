const dev = process.env.NODE_ENV !== 'production';

export const ROOT = dev
  ? 'http://localhost:3000'
  : process.env.ROOT;