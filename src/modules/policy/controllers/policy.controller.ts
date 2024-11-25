import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PolicyService } from '../services';
import { PaginationDto } from '../../../shared/pagination';
import {
  PolicyRequestDto,
  UpdatePolicyDto,
  PolicyRejectRequestDto,
  PolicyCancelRequestDto,
} from '../dtos';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: PolicyRequestDto) {
    return this.policyService.create(payload);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.policyService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.policyService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdatePolicyDto) {
    return this.policyService.update(id, payload);
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    return this.policyService.approve(id);
  }

  @Patch(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() payload: PolicyRejectRequestDto,
  ) {
    return this.policyService.reject(id, payload);
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string,
    @Body() payload: PolicyCancelRequestDto,
  ) {
    return this.policyService.cancel(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.policyService.remove(id);
  }
}
