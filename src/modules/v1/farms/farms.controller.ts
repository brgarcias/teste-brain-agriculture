// NEST COMMON
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
// API SWAGGER
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiParam,
} from '@nestjs/swagger';
// INTERCEPTORS
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
// SCHEMA
import FarmEntity from './schemas/farm.entity';
// SERVICES
import FarmService from './farms.service';
import { PaginatedFarmsInterface } from '@interfaces/paginatedEntity.interface';
import Serialize from '@decorators/serialization.decorator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
import { AllFarmsResponseEntity } from './entities/farm-response.entity';
import responseUtils from '@utils/response.utils';
import paginationUtils from '@utils/pagination.utils';

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
  @HttpCode(HttpStatus.FOUND)
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
  @HttpCode(HttpStatus.FOUND)
  @Get('acres')
  async findAllInAcre(@Query() query: any): Promise<number> {
    const paginationParams: PaginationParamsInterface | false =
      paginationUtils.normalizeParams({ page: query.page, limit: query.limit });
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }
    return this.farmService.findAllInAcre(paginationParams);
  }

  /**
   * * Get Method for Farm Retrieval
   * @api {get} /farms
   * @description Get all Farms
   * @returns Promise<SuccessResponseInterface | never>
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
  @Serialize(AllFarmsResponseEntity)
  @HttpCode(HttpStatus.FOUND)
  @Get()
  async findAll(@Query() query: any): Promise<SuccessResponseInterface> {
    const paginationParams: PaginationParamsInterface | false =
      paginationUtils.normalizeParams({ page: query.page, limit: query.limit });
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedFarm: PaginatedFarmsInterface =
      await this.farmService.findAll(paginationParams);

    return responseUtils.success('farm', paginatedFarm.paginatedResult, {
      location: 'farm',
      paginationParams,
      totalCount: paginatedFarm.totalCount,
    });
  }

  /**
   * * Get Method for Farm Retrieval by id
   * @api {get} /farms/:id
   * @param {id} id of the farm
   * @description Get one Farm by id
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {NotFoundException}
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
    description: '200. Success. Returns a farm',
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
  @ApiParam({ name: 'id', type: String })
  @Serialize(AllFarmsResponseEntity)
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseInterface> {
    const foundFarm = await this.farmService.findOne(id);

    if (!foundFarm) {
      throw new NotFoundException('The farm does not exist');
    }

    return responseUtils.success('farm', foundFarm);
  }
}
