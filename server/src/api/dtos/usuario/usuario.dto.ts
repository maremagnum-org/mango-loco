import { IsString } from "class-validator";
import { BaseDTO } from "../../../common/models/base-dto";

export class UsuarioDTO extends BaseDTO {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
