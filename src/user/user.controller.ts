import {Controller, Get, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDecorator} from "../decorators/user.decorator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController{
 constructor(private userService:UserService) {}

 @UseGuards(AuthGuard)
 @Get("/me")
 async create(@UserDecorator("id")id:number){
  console.log(id)
     return this.userService.userMe(id)
 }
}