import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

// 👉 Letakkan tipe LinkDocument di sini
export type LinkDocument = Link &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: {
    currentTime: () => {
      return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );
    },
  },
})
export class Link {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({
    default: null,
    set: (value: Date) => {
      if (!value) return null;
      return new Date(
        value.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );
    },
  })
  lastClicked: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
