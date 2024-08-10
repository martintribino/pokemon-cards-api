import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, id, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name
    };
  }

  async register(email: string, password: string, name: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new ConflictException('User already exist');
    }
    const userCreated = await this.userService.createUser(email, password, name);
    return {
      email: userCreated.email,
      name: userCreated.name
    };
  }
}
