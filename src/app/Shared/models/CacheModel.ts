import { BaseModel } from "src/base/model/base.model";

export class CacheModel extends BaseModel
{
   UserId!: string;
   override UserName!: string;
   Token!: string;
   RefreshToken!: string;
   Role!: string;
   RoleId!: string;
}
