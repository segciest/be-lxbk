import { Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post("/login")
  login(){

    try {
      let token = this.jwtService.sign(
      {data:"abc"},
      {algorithm:"HS256", expiresIn:"5d", secret:"BI_MAT"},
    )
    return token;
    } catch (error) {
      throw new error
      // throw new HttpException("Loi dang nhap",403)
    }
    
  }

  @Post("/register")
  logout(){

  }
}
