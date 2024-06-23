import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enum/role.enum';

export type UserDocument = File & Document;

@Schema()
export class User {
  @Prop()
  user_name: string;
  @Prop()
  password: string;
  @Prop()
  email: string;

  @Prop()
  phone_number: string;
  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
