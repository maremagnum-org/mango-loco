import { BadRequestError, Body, Controller, Post } from "routing-controllers";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "../auth/dtos/login.dto";
import { RegisterDto } from "../auth/dtos/register.dto";
import { Inject, Service } from "typedi";
import { Logger } from "../../config/logger/logger";

@Service()
@Controller("/auth")
export class AuthController {
  @Inject("logger") private logger: Logger;
  constructor(private authService: AuthService) {}

  //----------------------//
  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  //----------------------//

  @Post("/login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
