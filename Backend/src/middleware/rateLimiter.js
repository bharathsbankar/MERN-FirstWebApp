import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // userid or ipadress can be used in replace with "my-little-key" to limit  based on userid or ipadress
    const { success } = await ratelimit.limit("my-liitle");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};
export default rateLimiter;
