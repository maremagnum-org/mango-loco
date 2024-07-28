import { IsString } from "class-validator";
import { UsuarioDTO } from "../usuario/usuario.dto";
import { Type } from "class-transformer";

export class CreateTokenDto {
  @IsString()
  agent: string;
  @IsString()
  token: string;
  // @Type(() => UsuarioDTO)
  // usuario: UsuarioDTO;
}
