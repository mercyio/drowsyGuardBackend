import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/repository.dto';
import {
  IPaginationPayload,
  IPaginationResponse,
} from 'src/common/interfaces/repository.interface';

@Injectable()
export class RepositoryService {
  async paginate<T>({
    model,
    query,
    options,
    populateFields,
    selectFields,
  }: IPaginationPayload<T>): Promise<IPaginationResponse<T>> {
    const {
      page = 1,
      size = 10,
      sortBy = 'createdAt',
      sortDirection = 'desc',
    } = query;

    const skip = (page - 1) * size;
    const sort = sortBy ? { [sortBy]: sortDirection } : null;

    const [data, total] = await Promise.all([
      model
        .find({
          ...options,
        })
        .skip(skip)
        .limit(size > 100 ? 100 : size)
        .populate(populateFields)
        .select(selectFields)
        .sort(sort),
      model.countDocuments({
        ...options,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        size: Number(size),
        lastPage: Math.ceil(total / size),
      },
    };
  }
}
