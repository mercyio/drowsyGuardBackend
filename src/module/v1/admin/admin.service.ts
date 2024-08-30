/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../common/utils/helper.util';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { AdminLoginDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from '../repository/dto/repository.dto';
import { RepositoryService } from '../repository/repository.service';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { User, UserDocument } from '../user/schemas/user.schema';
import { UserRoleEnum } from 'src/common/enums/user.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private repositoryService: RepositoryService,
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

  // async getAdminByEmailIncludePassword(email: string): Promise<AdminDocument> {
  //   return this.userModel.findOne({ email }).select('+password');
  // }

  // async getAdmin(id: string): Promise<AdminDocument> {
  //   return this.adminModel.findOne({ _id: id });
  // }

  // async getAllAdmins(query: PaginationDto) {
  //   return await this.repositoryService.paginate(this.adminModel, query);
  // }

  // async getAdminByEmail(email: string): Promise<AdminDocument> {
  //   return this.adminModel.findOne({ email });
  // }
}
