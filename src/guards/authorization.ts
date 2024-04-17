import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { error } from "console";
import { Request } from "express";
import { Observable } from "rxjs";
import { DecryptJwt } from "src/functions/decrypt";
import EncryptToken from "src/functions/encrypt-token";
import { DataSource } from "typeorm";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly ds: DataSource) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp()
        const req = http.getRequest<Request>()
        const jwt = req.headers["authorization"].toString() ?? null
        if (!jwt) throw new UnauthorizedException("jwt not found")
        const validationJwt = await DecryptJwt(jwt).catch(e => {
            if(e.name == 'AxiosError') throw new UnauthorizedException(e.response.data.message)
        })
        if (!Object.keys(validationJwt).includes("idKelas") && validationJwt['idKelas'] == "") throw new UnauthorizedException("access denied")


        const kelas = await this.ds.query("SELECT * FROM student_class WHERE id=? AND deleted_at IS NULL", [+validationJwt["idKelas"]])
        if (kelas.length <= 0) throw new UnauthorizedException("access denied")
        return true
    }
}