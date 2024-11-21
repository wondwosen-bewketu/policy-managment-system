import {
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsEnum,
  MaxLength,
  Min,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PolicyPaymentFrequency } from '../../../shared/enums';

export class PolicyRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  @Type(() => String)
  vehicleModel: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  vehiclePlateNumber: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  policyNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  coverageAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  premiumAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  deductibleAmount: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  isActive: boolean;

  @IsEnum(PolicyPaymentFrequency)
  @IsNotEmpty()
  paymentFrequency: PolicyPaymentFrequency;
}

export class PolicyApproveRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  isActive: boolean;
}

export class PolicyRejectRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2400)
  @Type(() => String)
  rejectedReason: string;
}

export class PolicyCancelRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2400)
  @Type(() => String)
  cancledReason: string;
}

export class UpdatePolicyDto {
  @IsString()
  @IsOptional()
  @Length(2, 64)
  @Type(() => String)
  vehicleModel?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  vehiclePlateNumber?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  policyNumber?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  coverageAmount?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  premiumAmount?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  deductibleAmount?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsEnum(PolicyPaymentFrequency)
  @IsOptional()
  paymentFrequency?: PolicyPaymentFrequency;
}
