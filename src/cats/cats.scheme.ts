import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsEmail()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  // virtual type
  readonly clientData: { id: string; email: string; name: string };
}

// class to scheme
export const CatScheme = SchemaFactory.createForClass(Cat);

// client에게 보여줄 데이터를 virtual type으로 설정 => this can't param of arrow function
CatScheme.virtual('clientData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
