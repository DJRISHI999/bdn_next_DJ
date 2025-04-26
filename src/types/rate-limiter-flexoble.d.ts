declare module "rate-limiter-flexible" {
  export class RateLimiterMemory {
    constructor(options: {
      points: number;
      duration: number;
    });
    consume(key: string): Promise<void>;
  }
}