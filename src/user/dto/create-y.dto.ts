import { Roles } from "../../enum"

export class CreateYDto {
    username!: string
    phone!: string
    password!:string
    role!: Roles
}
