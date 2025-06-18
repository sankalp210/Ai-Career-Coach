import 'dotenv/config';

const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || '';

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    scheme: "mobile", // ✅ this fixes the linking warning
    extra: {
      clerkPublishableKey: CLERK_PUBLISHABLE_KEY,
    },
  },
};
