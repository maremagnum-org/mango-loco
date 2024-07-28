import "reflect-metadata";
import { NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { FindOneOptions } from "typeorm";
import { PaginatedDto } from "../../common/pagination/dtos/paginated.dto";
import { PasswordService } from "../auth/password.service";
import { CreateUsuarioDto } from "../dtos/usuario/create-user.dto";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { UpdateUserDto } from "../dtos/usuario/update-user.dto";
import { UsuarioDTO } from "../dtos/usuario/usuario.dto";
import { Usuario } from "../models/user.entity";
import { UsuarioRepository } from "../repositories/user.repository";
import { Logger } from "../../config/logger/logger";
import { RegisterDto } from "../auth/dtos/register.dto";

@Service()
export class UsuarioService {
  @Inject("logger") private logger: Logger;
  constructor(
    private userRepository: UsuarioRepository,
    private passwordService: PasswordService
  ) {}

  async search(
    searchUserDto: SearchUsuarioDto
  ): Promise<PaginatedDto<Usuario>> {
    return await this.userRepository.search(searchUserDto);
  }

  async findThis(criteria?: FindOneOptions): Promise<Usuario | null> {
    const res = await this.userRepository.findOne(criteria);
    return res || null;
  }

  async findOne(id: number): Promise<UsuarioDTO> {
    //TODO: parsear response a dto
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async create(request: CreateUsuarioDto | RegisterDto): Promise<any> {
    const user = await this.findThis({
      where: { email: request.email },
    });

    if (user) {
      this.logger.error("Usuario ya existe");
      return "Usuario ya existe";
    }

    return await this.userRepository.save(request);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UsuarioDTO> {
    const user = await this.findThis({ where: { id: id } });
    await this.userRepository.update(id, updateUserDto);

    await this.userRepository.save(user);

    //TODO: parsear response a dto

    return this.findThis({ where: { id: id } });
  }

  async delete(id: number): Promise<string> {
    const user = await this.findThis({ where: { id: id } });
    await this.userRepository.softRemove(user);
    return "Usuario eliminado.";
  }
}
