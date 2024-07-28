import { DeepPartialType } from "../../../common/types/deep_partial.type";
import { CreateUsuarioDto } from "./create-user.dto";

export class UpdateUserDto extends DeepPartialType(CreateUsuarioDto) {}
