import { Inject, Service } from "typedi";
import { UsuarioService } from "../services/user.service";
import { JwtService } from "./jwt.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { Logger } from "../../config/logger/logger";
import { PasswordService } from "./password.service";
import { BadRequestError } from "routing-controllers";

@Service()
export class AuthService {
  @Inject("logger") private logger: Logger;
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private usuarioService: UsuarioService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      registerDto.password
    );
    registerDto.password = hashedPassword;

    try {
      const user = await this.usuarioService.create(registerDto);
      return user;
    } catch (error) {
      this.logger.error("Error al crear el usuario");
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateLogin(loginDto.email, loginDto.password);
  }

  private async validateLogin(email: string, password: string) {
    const user = await this.usuarioService.findThis({
      where: { email: email },
    });

    if (
      !user ||
      !(await this.passwordService.validate(password, user.password))
    ) {
      throw new BadRequestError("Email o contraseña incorrectos");
    }

    return user;
  }
}
