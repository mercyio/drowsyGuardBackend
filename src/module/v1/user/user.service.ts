import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, GoogleAuthDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../common/utils/helper.util';
import { RepositoryService } from '../repository/repository.service';
import { PaginationDto } from '../repository/dto/repository.dto';

@Injectable()
export class UserService {
  constructor(
    private repositoryService: RepositoryService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    const { password, confirmPassword } = payload;

    try {
      // Validate the password
      BaseHelper.validatePassword(password);

      if (password !== confirmPassword) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        );
      }

      const hashedPassword = await BaseHelper.hashData(password);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(
          `${Object.keys(e.keyValue)} already exists`,
        );
      } else {
        throw new InternalServerErrorException(
          e.response?.message || 'Something went wrong',
        );
      }
    }
  }

  async getUserByEmailIncludePassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async getUser(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOneById(userId: string) {
    return this.userModel.findById(userId);
  }

  async updateUserByEmail(email: string, details: any) {
    return this.userModel.updateOne({ email }, details);
  }

  async checkUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('No user exist with provided email');
    }

    return true;
  }

  async getAllUsers(userId: string, query: PaginationDto) {
    // Fetches a paginated list of users, excluding the user with the specified userId
    const paginated = await this.repositoryService.paginate(
      this.userModel,
      query,
      {
        _id: { $ne: userId },
      },
    );

    return paginated;
  }

  async createUserFromGoogle(payload: GoogleAuthDto) {
    return await this.userModel.create({
      ...payload,
      emailVerified: true,
      isGoogleAuth: true,
      isLoggedOut: false,
    });
  }
}
