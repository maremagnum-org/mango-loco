import { DataSource, Repository } from "typeorm";
import { Token } from "../models/token.entity";
import { Service } from "typedi";
import { PaginatedDto } from "../../common/pagination/dtos/paginated.dto";

@Service()
export class TokenRepository extends Repository<Token> {
  constructor(dataSource: DataSource) {
    super(Token, dataSource.createEntityManager());
  }
  async getTokenWithUser(token: string): Promise<Token | undefined> {
    return this.createQueryBuilder("token")
      .leftJoinAndSelect("token.usuario", "usuario")
      .where("token.token = :token", { token })
      .getOne();
  }

  // async search(request: string) {
  //   const queryBuilder = this.createQueryBuilder("token");

  //   if (request.id) {
  //     queryBuilder.andWhere("token.id = :id", { id: request.id });
  //   }

  //   queryBuilder.orderBy("token.id", "DESC");

  //   const [list, count] = await queryBuilder
  //     .skip(request.getOffset())
  //     .take(request.getTake())
  //     .getManyAndCount();

  //   return new PaginatedDto<Token>(list, count);
  // }
}
