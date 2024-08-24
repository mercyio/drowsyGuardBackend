import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, GoogleAuthDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../common/utils/helper.util';
import { InterestService } from '../interest/interest.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private interestService: InterestService,
  ) {}

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await BaseHelper.hashData(payload.password);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(`${Object.keys(e.keyValue)} already exists`);
      } else {
        throw new InternalServerErrorException(e.response?.message || 'Something went wrong');
      }
    }
  }

  async getUserByEmailIncludePassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async getUser(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).populate('interests');
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
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

  async updateUser(payload: UpdateUserDto, userId: string): Promise<UserDocument> {
    const { username, interests } = payload;

    if (username) {
      const usernameUsed = await this.userModel.countDocuments({
        username,
        _id: { $ne: userId },
      });

      if (usernameUsed) {
        throw new BadRequestException('Username already used, kindly select a new username');
      }
    }

    let interestsFromDb = [];

    if (interests && interests.length > 0) {
      const fetchedInterests = await Promise.all(interests.map(item => this.interestService.getById(item)));
      interestsFromDb = fetchedInterests.filter(item => item !== null).map(item => item._id);
    }

    return this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        ...payload,
        interests: interestsFromDb,
      },
      { new: true },
    );
  }

  async createUserFromGoogle(payload: GoogleAuthDto) {
    return await this.userModel.create({
      ...payload,
      emailVerified: true,
      wallet: 100,
      isGoogleAuth: true,
    });
  }
}
