import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user.enum';

export interface ILoggedInUser {
  _id: string;
  email: string;
  role: UserRoleEnum;
}

export const LoggedInUserDecorator = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
