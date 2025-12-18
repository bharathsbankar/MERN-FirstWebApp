import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import dotenv from "dotenv";

//creating a rate limitter that allows 10 requests for every 20 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;
