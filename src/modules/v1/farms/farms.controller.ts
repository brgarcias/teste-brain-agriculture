// NEST COMMON
import { Controller, Get, UseInterceptors } from '@nestjs/common';
// API SWAGGER
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
// INTERCEPTORS
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
// SCHEMA
import FarmEntity from './schemas/farm.entity';
// SERVICES
import FarmService from './farms.service';

@ApiTags('Farm')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(FarmEntity)
@Controller()
export default class FarmController {
  constructor(private readonly farmService: FarmService) {}

  /**
   * * Get Method for Farm Retrieval
   * @api {get} /farms/quantity
   * @description Get quantity of all Farms
   * @returns Promise<number | null>
   * @throws {BadRequestException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(FarmEntity),
        },
      },
    },
    description: '200. Success. Returns all farms',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Farm was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get('quantity')
  async findQuantity(): Promise<number> {
    return this.farmService.findQuantity();
  }

  /**
   * * Get Method for Farm Retrieval
   * @api {get} /farms/acres
   * @description Get all Farms in acres
   * @returns Promise<number | null>
   * @throws {BadRequestException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(FarmEntity),
        },
      },
    },
    description: '200. Success. Returns all farms',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Farm was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get('acres')
  async findAllInAcre(): Promise<number> {
    return this.farmService.findAllInAcre();
  }
}
