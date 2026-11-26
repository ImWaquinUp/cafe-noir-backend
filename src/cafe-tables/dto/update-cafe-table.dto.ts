import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeTableDto } from './create-cafe-table.dto';

export class UpdateCafeTableDto extends PartialType(CreateCafeTableDto) {}
