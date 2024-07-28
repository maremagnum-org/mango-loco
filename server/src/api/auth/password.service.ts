import * as bcrypt from "bcrypt";
import { Service } from "typedi";

@Service()
export class PasswordService {
  async hashPassword(password: string, sr?: number): Promise<string> {
    if (!password) {
      throw new Error("Password no puede ser undefined");
    }

    const rounds = sr ?? 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
  }

  async validate(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
