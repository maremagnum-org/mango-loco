// import * as httpctx from "express-http-context";
import * as jwt from "jsonwebtoken";
import { Inject, Service } from "typedi";
import { config } from "../../config/env/environment";
import { Logger } from "../../config/logger/logger";
import { Token } from "../models/token.entity";
import { Usuario } from "../models/user.entity";
import { TokenRepository } from "../repositories/token.repository";
import { UnauthorizedError } from "routing-controllers";

@Service()
export class JwtService {
  @Inject("logger") private logger: Logger;
  private readonly TOKEN_EXPIRATION =
    config.server.nodeEnv === "production" ||
    config.server.nodeEnv === "Production"
      ? "30m"
      : "3d";

  constructor(private tokenRepository: TokenRepository) {}

  private tokenPayload(user: Usuario) {
    return {
      user: {
        id: user.id,
      },
    };
  }

  public async createJwt(user: Usuario, refresh?: boolean): Promise<any> {
    const token = jwt.sign(
      this.tokenPayload(user),
      config.encryptation.jwtSecret,
      {
        expiresIn: this.TOKEN_EXPIRATION,
      }
    );

    if (!refresh) {
      // const userAgent = httpctx.get("useragent");
      const tokenInstance = new Token();
      tokenInstance.value = token;
      // tokenInstance.agent = userAgent;
      tokenInstance.usuario = user; // asign relationship
      console.info(
        `Creando nuevo token para el usuario con ID: ${user.id}, agent: ${undefined}`
      );
      // now we save the token in our token repository
      await this.tokenRepository.save(tokenInstance);
    }
    return token;
  }

  public async deleteTokens(usuario: Usuario): Promise<any> {
    await this.tokenRepository.delete({ usuario: usuario });
  }

  public async refreshToken(token: string): Promise<any> {
    const tokenDB = await this.tokenRepository.getTokenWithUser(token);
    if (!tokenDB) {
      throw new UnauthorizedError(
        "El token ya no es válido (already refreshed)"
      );
    }
    const newToken = await this.createJwt(tokenDB.usuario, true);
    this.logger.info(
      `Refrescando token para user id: ${tokenDB.usuario.id}, agent: ${tokenDB.agent}`
    );
    await this.tokenRepository.update(tokenDB.id, {
      value: newToken,
      last_time_refreshed: new Date(),
    });
    return newToken;
  }

  public async verifyToken(token: string): Promise<object | string> {
    return await jwt.verify(token, config.encryptation.jwtSecret);
  }

  public async decodeToken(token: string): Promise<any> {
    return await jwt.decode(token);
  }
}
