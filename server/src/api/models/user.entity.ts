import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/models/base-entity";
import { Token } from "./token.entity";
import { IsString } from "class-validator";

@Entity("usuario")
export class Usuario extends BaseEntity {
  @Column()
  @IsString()
  name: string;
  @Column()
  @IsString()
  email: string;
  @Column()
  @IsString()
  password: string;

  @OneToMany(() => Token, (token) => token.usuario)
  @JoinColumn()
  tokens: Token[];

  static fromId(id: number) {
    const usuario = new Usuario();
    usuario.id = id;
    return usuario;
  }
}
