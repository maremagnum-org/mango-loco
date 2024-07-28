import { Service } from "typedi";
import { Repository, DataSource } from "typeorm";
import { PaginatedDto } from "../../common/pagination/dtos/paginated.dto";
import { SearchUsuarioDto } from "../dtos/usuario/search-user.dto";
import { Usuario } from "../models/user.entity";
import { UsuarioDTO } from "../dtos/usuario/usuario.dto";

@Service()
export class UsuarioRepository extends Repository<Usuario> {
  constructor(dataSource: DataSource) {
    super(Usuario, dataSource.createEntityManager());
  }

  async search(request: SearchUsuarioDto) {
    const queryBuilder = this.createQueryBuilder("usuario");

    if (request.id) {
      queryBuilder.andWhere("usuario.id = :id", { id: request.id });
    }

    queryBuilder.orderBy("usuario.id", "DESC");

    const [list, count] = await queryBuilder
      .skip(request.getOffset())
      .take(request.getTake())
      .getManyAndCount();

    return new PaginatedDto<Usuario>(list, count);
  }
}
