import { rateLimit } from "express-rate-limit";

const isProd = process.env.NODE_ENV === "production";

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: isProd ? process.env.RATELIMIT : 1000,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	ipv6Subnet: 56
});