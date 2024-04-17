import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { DataSource } from 'typeorm';
import * as bcrypt from "bcrypt"
import axios from "axios"
import { axiosA } from 'src/functions/privateAxios';
import { Response } from 'express';
import EncryptToken from 'src/functions/encrypt-token';
// const {axiosA} = require("../functions/privateAxios")
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService, private readonly ds: DataSource) { }

  @Post("/login")
  async login(@Body() { username, password }: CreateLoginDto, @Res() res: Response) {
    const users = await this.ds.query("SELECT students.studentClassIdId as stc_id, users.password as password FROM users JOIN roles ON users.roleIdId=roles.id JOIN students ON students.userIdId=users.id JOIN student_class ON student_class.id=students.studentClassIdId WHERE users.name=? AND roles.name=? AND users.deleted_at IS NULL", [username, "siswa"])

    if (users.length <= 0) throw new BadRequestException("wrong username")
    bcrypt.compare(password, users[0].password).then(async (result) => {
      if (!result) throw new BadRequestException("wrong password")
      try {
        const jwt = await EncryptToken({
          name: username,
          idKelas: users[0].stc_id,
        },43200000)
        res.status(200).send({ jwt: jwt.data })
        return true
      } catch (error) {
        throw new BadRequestException(error)
      }
    }).catch(err => { throw new BadRequestException(err.message) })
  }

}
