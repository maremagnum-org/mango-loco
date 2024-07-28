import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/models/base-entity";
import { Usuario } from "./user.entity";
import { IsDate, IsString } from "class-validator";

@Entity()
export class Token extends BaseEntity {
  @Column()
  @IsString()
  agent: string;

  @Column()
  @IsString()
  value: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.tokens)
  @JoinColumn({ name: "usuarioId" })
  usuario: Usuario;

  @Column()
  @IsDate()
  last_time_refreshed: Date;

  static fromId(id: number) {
    const token = new Token();
    token.id = id;
    return token;
  }
}
