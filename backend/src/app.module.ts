import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { LinksModule } from "./links/links.module";
import { RedirectModule } from "./redirect/redirect.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost:27017/linkshortener"
    ),
    AuthModule,
    LinksModule,
    RedirectModule,
  ],
})
export class AppModule {}
