/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../common/utils/helper.util';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { User, UserDocument } from '../user/schemas/user.schema';
import { UserRoleEnum } from 'src/common/enums/user.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,-m ''
  ) {}

  async create(): Promise<UserDocument> {
    try {
      const payload = {
        password: ENVIRONMENT.ADMIN.PASSWORD,
        email: ENVIRONMENT.ADMIN.EMAIL,
      };

      const hashedPassword = await BaseHelper.hashData(payload.password);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
        emailVerified: true,
        role: UserRoleEnum.ADMIN,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      throw new InternalServerErrorException(
        e.response?.message || 'Something went wrong',
      );
    }
  }
}
