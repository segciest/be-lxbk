import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post("/login")
  async login(
    @Body() body
  ){

    try {
      let {email,password} = body
      let checkUser = await this.userService.findUserOne(email)
      console.log(password);
      console.log(checkUser?.password);
      if(checkUser){
        if(password == checkUser.password){
          let token = this.jwtService.sign(
          {data:checkUser.email},
          {algorithm:"HS256", expiresIn:"7d", secret:"BI_MAT"},
          )
          return { access_token: token }
        }
        else{
          throw new HttpException("Sai mat khau",403)
        }
        
      } else {
        throw new HttpException("Khong tim thay user",403)
      }
      
    } catch (error) {
      throw error
      // throw new HttpException("Loi dang nhap",403)
    }
    
  }

  @Post("/register")
  logout(){

  }
}
