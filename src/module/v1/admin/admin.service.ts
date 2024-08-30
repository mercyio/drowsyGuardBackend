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

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
    private repositoryService: RepositoryService,
  ) {}

  async create(): Promise<AdminDocument> {
    try {
      const payload = {
        password: ENVIRONMENT.ADMIN.PASSWORD,
        email: ENVIRONMENT.ADMIN.EMAIL,
      };

      const hashedPassword = await BaseHelper.hashData(payload.password);

      const result = await this.adminModel.create({
        ...payload,
        password: hashedPassword,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      throw new InternalServerErrorException(
        e.response?.message || 'Something went wrong',
      );
    }
  }

  // async login(payload: AdminLoginDto) {
  //   const { adminId } = payload;

  //   const admin = await this.getAdmin(adminId);

  //   if (!admin) {
  //     throw new BadRequestException('Invalid Credential');
  //   }

  //   const token = this.jwtService.sign({ _id: adminId });
  //   return {
  //     ...admin['_doc'],
  //     accessToken: token,
  //   };
  // }

  async login(payload: AdminLoginDto, adminId: string) {
    const { email, password } = payload;

    const admin = await this.getAdminByEmailIncludePassword(email);

    if (!admin) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordValid = await BaseHelper.compareHashedData(
      password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials');
    }

    const admins = await this.getAdmin(adminId);
    const token = this.jwtService.sign({ _id: admins });

    const adminResponse = { ...admin['_doc'] };
    delete adminResponse.password;

    return {
      ...adminResponse,
      accessToken: token,
    };
  }

  async getAdminByEmailIncludePassword(email: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ email }).select('+password');
  }

  async getAdmin(id: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ _id: id });
    // .populate('interests');
  }

  async getAllAdmins(query: PaginationDto) {
    return await this.repositoryService.paginate(this.adminModel, query);
  }

  async getAdminByEmail(email: string): Promise<AdminDocument> {
    return this.adminModel.findOne({ email });
  }
}
