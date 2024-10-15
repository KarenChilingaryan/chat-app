import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signup(createUserDto: CreateUserDto): Promise<{
    message: string;
  }> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
    }

    return { message: 'User created successfully' };
  }


  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
