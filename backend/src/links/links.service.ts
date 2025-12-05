import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as shortid from "shortid";
import { Link, LinkDocument } from "./schemas/link.schema";
import { CreateLinkDto } from "./dto/create-link.dto";

@Injectable()
export class LinksService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {}

  // Helper method untuk mendapatkan waktu Jakarta
  private getJakartaTime(): Date {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );
  }

  // Helper method untuk format tanggal ke timezone Jakarta
  private formatToJakartaTime(date: Date): string {
    return date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  // Generate a short, readable code (4-5 characters)
  private generateShortCode(length: number = 5): string {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return code;
  }

  async createLink(createLinkDto: CreateLinkDto, userId: string) {
    let shortCode = createLinkDto.customCode;

    // Generate random short code if custom code is not provided
    if (!shortCode) {
      // Generate a shorter, more readable short code (4-5 characters)
      shortCode = this.generateShortCode();
    }

    // Check if short code already exists
    const existingLink = await this.linkModel.findOne({ shortCode });
    if (existingLink) {
      throw new BadRequestException("Short code already exists");
    }

    // Validate URL format
    try {
      new URL(createLinkDto.originalUrl);
    } catch {
      throw new BadRequestException("Invalid URL format");
    }

    const link = new this.linkModel({
      originalUrl: createLinkDto.originalUrl,
      shortCode,
      userId,
      title: createLinkDto.title || null,
    });

    await link.save();

    // Return dengan format waktu Jakarta
    const linkObj = link.toObject();
    return {
      ...linkObj,
      createdAt: this.formatToJakartaTime(link.createdAt),
      updatedAt: this.formatToJakartaTime(link.updatedAt),
    };
  }

  async getUserLinks(userId: string) {
    const links = await this.linkModel.find({ userId }).sort({ createdAt: -1 });

    // Format semua tanggal ke timezone Jakarta
    return links.map((link) => ({
      ...link.toObject(),
      createdAt: this.formatToJakartaTime(link.createdAt),
      updatedAt: this.formatToJakartaTime(link.updatedAt),
      lastClicked: link.lastClicked
        ? this.formatToJakartaTime(link.lastClicked)
        : null,
    }));
  }

  async deleteLink(linkId: string, userId: string) {
    const link = await this.linkModel.findById(linkId);
    if (!link) {
      throw new NotFoundException("Link not found");
    }

    if (link.userId.toString() !== userId) {
      throw new ForbiddenException("Access denied");
    }

    await this.linkModel.findByIdAndDelete(linkId);
    return {
      message: "Link deleted successfully",
      deletedAt: this.formatToJakartaTime(new Date()),
    };
  }

  async getLinkAnalytics(linkId: string, userId: string) {
    const link = await this.linkModel.findById(linkId);
    if (!link) {
      throw new NotFoundException("Link not found");
    }

    if (link.userId.toString() !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return {
      shortCode: link.shortCode,
      originalUrl: link.originalUrl,
      clicks: link.clicks,
      createdAt: this.formatToJakartaTime(link.createdAt),
      lastClicked: link.lastClicked
        ? this.formatToJakartaTime(link.lastClicked)
        : null,
    };
  }

  async findByShortCode(shortCode: string): Promise<Link | null> {
    return this.linkModel.findOne({ shortCode });
  }

  async incrementClicks(shortCode: string) {
    return this.linkModel.findOneAndUpdate(
      { shortCode },
      {
        $inc: { clicks: 1 },
        $set: { lastClicked: this.getJakartaTime() },
      },
      { new: true }
    );
  }
}
