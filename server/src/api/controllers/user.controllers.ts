import { plainToInstance } from "class-transformer";
import "reflect-metadata";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  QueryParams,
} from "routing-controllers";
import { Service } from "typedi";
import { PaginatedDto } from "../../common/pagination/dtos/paginated.dto";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { UpdateUserDto } from "../dtos/usuario/update-user.dto";
import { UsuarioDTO } from "../dtos/usuario/usuario.dto";
import { UsuarioService } from "../services/user.service";
import { CreateUsuarioDto } from "../dtos/usuario/create-user.dto";

@Service()
@Controller("/users")
export class UserController {
  constructor(private userService: UsuarioService) {}

  // - - - - - //

  @Get("/search")
  async searchUser(
    @QueryParams() request: SearchUsuarioDto
  ): Promise<PaginatedDto<UsuarioDTO>> {
    const res = plainToInstance(SearchUsuarioDto, request);
    const users = await this.userService.search(res);
    return users;
  }

  // - - - - - //

  @Get("/:id")
  async findUser(@Param("id") id: number): Promise<UsuarioDTO> {
    return await this.userService.findOne(id);
  }

  // @Post("/")
  // async createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   return await this.userService.create(createUsuarioDto);
  // }

  @Patch("/:id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UsuarioDTO> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete("/:id")
  async removeUser(@Param("id") id: number) {
    return await this.userService.delete(id);
  }
}
