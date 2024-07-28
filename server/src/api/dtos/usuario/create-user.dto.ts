import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
