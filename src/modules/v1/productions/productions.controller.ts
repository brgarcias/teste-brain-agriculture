// NEST COMMON
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
  BadRequestException,
  Query,
  ParseIntPipe,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
// API SWAGGER
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiParam,
  ApiExtraModels,
  getSchemaPath,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
// INTERCEPTORS
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import Serialize from '@decorators/serialization.decorator';
// ENTITIES
import { AllProductionsResponseEntity } from '@v1/productions/entities/production-response.entity';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedProductionsInterface } from '@interfaces/paginatedEntity.interface';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
// UTILS
import PaginationUtils from '@utils/pagination.utils';
import ResponseUtils from '@utils/response.utils';
// SCHEMA
import ProductionEntity from './schemas/production.entity';
// SERVICES
import ProductionService from './productions.service';
import CreateProductionDto from './dto/create-production.dto';

@ApiTags('Production')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(ProductionEntity)
@Controller()
export default class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  /**
   * * Post Method for Production Creation
   * @api {post} /productions
   * @body Data to send in body - @see CreateProductionDto
   * @description Create one Production
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiBody({ type: CreateProductionDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProductionEntity),
        },
      },
    },
    description: '201. Success. Returns a production',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              producer_id: 'number',
              farm_id: 'number',
              plantation_id: 'number',
            },
            value: 'string',
            property: 'string',
            children: [],
            constraints: {},
          },
        ],
        error: 'Bad Request',
      },
    },
    description: '400. ValidationException',
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '409. ConflictResponse',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createOne(
    @Body() production: CreateProductionDto,
  ): Promise<SuccessResponseInterface | never> {
    await this.productionService.createOne(production);
    return ResponseUtils.success('production', {
      message: 'success! production created.',
    });
  }

  /**
   * * Get Method for Production Retrieval by id
   * @api {get} /productions/:id
   * @param {id} id of the production
   * @description Get one Production by id
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {NotFoundException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProductionEntity),
        },
      },
    },
    description: '200. Success. Returns a production',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Production was not found',
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
  @Serialize(AllProductionsResponseEntity)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseInterface> {
    const foundProduction = await this.productionService.findOne(id);

    if (!foundProduction) {
      throw new NotFoundException('The production does not exist');
    }

    return ResponseUtils.success('production', foundProduction);
  }

  /**
   * * Get Method for Production Retrieval
   * @api {get} /productions
   * @description Get all Productions
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProductionEntity),
        },
      },
    },
    description: '200. Success. Returns all productions',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Production was not found',
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
  @Serialize(AllProductionsResponseEntity)
  @Get()
  async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false =
      PaginationUtils.normalizeParams({ page: query.page, limit: query.limit });
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedProduction: PaginatedProductionsInterface =
      await this.productionService.findAll(paginationParams);

    return ResponseUtils.success(
      'production',
      paginatedProduction.paginatedResult,
      {
        location: 'production',
        paginationParams,
        totalCount: paginatedProduction.totalCount,
      },
    );
  }
}
