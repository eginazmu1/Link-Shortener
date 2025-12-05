import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("/")
  health() {
    return { status: "ok", message: "Backend is running" };
  }

  @Get("/health")
  healthCheck() {
    return { status: "ok", message: "Backend is healthy" };
  }
}
