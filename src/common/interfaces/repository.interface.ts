import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { PaginationDto } from '../../module/v1/repository/dto/repository.dto';

export interface IFindQuery<T> {
  query?: FilterQuery<T>;
  showDeleted?: boolean;
}

export interface IPaginationPayload<T> {
  model: Model<T>;
  query?: PaginationDto;
  options?: FilterQuery<T>;
  populateFields?: string;
  selectFields?: string;
}

export interface IAggregatePaginationQuery<T> {
  model: Model<T>;
  query?: PaginationDto;
  options?: PipelineStage[];
}

export interface IPaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    size: number;
    lastPage: number;
  };
}
