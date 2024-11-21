import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PolicyService } from '../services';
import {
  PolicyRequestDto,
  UpdatePolicyDto,
  PolicyApproveRequestDto,
  PolicyRejectRequestDto,
  PolicyCancelRequestDto,
} from '../dtos';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPolicy(@Body() dto: PolicyRequestDto) {
    return this.policyService.createPolicy(dto);
  }

  @Get()
  async findAllPolicies() {
    return this.policyService.findAllPolicies();
  }

  @Get(':id')
  async findPolicyById(@Param('id') id: string) {
    return this.policyService.findPolicyById(id);
  }

  @Put(':id')
  async updatePolicy(@Param('id') id: string, @Body() dto: UpdatePolicyDto) {
    return this.policyService.updatePolicy(id, dto);
  }

  @Patch(':id/approve')
  async approvePolicy(
    @Param('id') id: string,
    @Body() dto: PolicyApproveRequestDto,
  ) {
    return this.policyService.approvePolicy(id, dto);
  }

  @Patch(':id/reject')
  async rejectPolicy(
    @Param('id') id: string,
    @Body() dto: PolicyRejectRequestDto,
  ) {
    return this.policyService.rejectPolicy(id, dto);
  }

  @Patch(':id/cancel')
  async cancelPolicy(
    @Param('id') id: string,
    @Body() dto: PolicyCancelRequestDto,
  ) {
    return this.policyService.cancelPolicy(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePolicy(@Param('id') id: string) {
    return this.policyService.deletePolicy(id);
  }
}
