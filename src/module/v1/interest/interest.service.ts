import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InterestDocument, Interest } from './schemas/interest.schema';
import { CreateInterestDto, UpdateInterestDto } from './dto/create-interest.dto';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest.name)
    private interestModel: Model<InterestDocument>,
  ) {}

  async create(payload: CreateInterestDto): Promise<InterestDocument> {
    const { name } = payload;

    return this.interestModel.findOneAndUpdate({ name }, payload, {
      upsert: true,
      new: true,
    });
  }

  async update(id: string, payload: UpdateInterestDto) {
    const { name } = payload;

    const [interestWithIdExist, interestWithNameExist] = await Promise.all([
      this.interestModel.findById(id),
      this.interestModel.findOne({ name, _id: { $ne: id } }),
    ]);

    if (!interestWithIdExist) {
      throw new NotFoundException('no interest with such id');
    }

    if (interestWithNameExist) {
      throw new BadRequestException(`interest ${name} already exist in interest category`);
    }

    return this.interestModel.findByIdAndUpdate(id, { name: name }, { new: true, runValidators: true });
  }

  async getAll(): Promise<InterestDocument[]> {
    return this.interestModel.find();
  }

  async getById(id: string): Promise<InterestDocument> {
    return this.interestModel.findById(id);
  }
}
