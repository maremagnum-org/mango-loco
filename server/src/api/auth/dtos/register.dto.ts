import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { IsEqual } from "../../../common/decorators/is-equal.decorator";
import { pass_regex } from "../../../common/regex/pass";

export class RegisterDto {
  @IsString()
  // @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  // @IsNotEmpty()
  email: string;

  @IsString()
  // @IsNotEmpty()
  @Matches(pass_regex, { message: "Contraseña Debíl" })
  password: string;

  @IsString()
  // @IsNotEmpty()
  @IsEqual("password")
  repeatPassword: string;
}
