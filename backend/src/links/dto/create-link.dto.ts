import { IsString, IsUrl, IsOptional, Length } from "class-validator";

export class CreateLinkDto {
  @IsUrl({}, { message: "Please provide a valid URL" })
  originalUrl: string;

  @IsOptional()
  @IsString()
  @Length(3, 20, { message: "Custom code must be between 3 and 20 characters" })
  customCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title?: string;
}
