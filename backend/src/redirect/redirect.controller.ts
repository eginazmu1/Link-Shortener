import { Controller, Get, Param, Res, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { LinksService } from "../links/links.service";

@Controller("redirect")
export class RedirectController {
  constructor(private linksService: LinksService) {}

  // API endpoint yang return JSON (untuk frontend API route)
  @Get("api/:shortCode")
  async getRedirect(@Param("shortCode") shortCode: string) {
    const link = await this.linksService.findByShortCode(shortCode);

    if (!link) {
      throw new NotFoundException("Link not found");
    }

    // Increment click count
    await this.linksService.incrementClicks(shortCode);

    return {
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      clicks: link.clicks + 1,
      title: link.title,
    };
  }

  // HTML redirect endpoint (untuk direct browser access)
  @Get(":shortCode")
  async redirect(@Param("shortCode") shortCode: string, @Res() res: Response) {
    const link = await this.linksService.findByShortCode(shortCode);

    if (!link) {
      // Return a 404 HTML page
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Link Not Found - QuickLink</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              text-align: center;
              background: rgba(255, 255, 255, 0.95);
              padding: 60px 40px;
              border-radius: 20px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              max-width: 500px;
            }
            h1 {
              color: #333;
              font-size: 3em;
              margin-bottom: 20px;
              font-weight: 700;
            }
            p {
              color: #666;
              font-size: 1.2em;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 10px;
              font-weight: 600;
              font-size: 1.1em;
              transition: transform 0.2s, box-shadow 0.2s;
            }
            .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
            .icon {
              font-size: 4em;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🔗</div>
            <h1>Link Not Found</h1>
            <p>The short link you're looking for doesn't exist or has been removed. Please check the URL and try again.</p>
            <a href="http://localhost:3000" class="btn">Go to Homepage</a>
          </div>
        </body>
        </html>
      `);
    }

    // Increment click count
    await this.linksService.incrementClicks(shortCode);

    // Redirect to original URL
    return res.redirect(301, link.originalUrl);
  }
}
