import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
@UseGuards(JwtAuthGuard)
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post()
  async createLink(@Body() createLinkDto: CreateLinkDto, @Request() req) {
    return this.linksService.createLink(createLinkDto, req.user._id);
  }

  @Get()
  async getUserLinks(@Request() req) {
    return this.linksService.getUserLinks(req.user._id);
  }

  @Delete(':id')
  async deleteLink(@Param('id') id: string, @Request() req) {
    return this.linksService.deleteLink(id, req.user._id);
  }

  @Get(':id/analytics')
  async getLinkAnalytics(@Param('id') id: string, @Request() req) {
    return this.linksService.getLinkAnalytics(id, req.user._id);
  }
}