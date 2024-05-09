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
} from '@nestjs/swagger';
// INTERCEPTORS
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import Serialize from '@decorators/serialization.decorator';
// ENTITIES
import { AllPlantationsResponseEntity } from '@v1/plantations/entities/plantation-response.entity';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedPlantationsInterface } from '@interfaces/paginatedEntity.interface';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
// UTILS
import PaginationUtils from '@utils/pagination.utils';
import ResponseUtils from '@utils/response.utils';
// SCHEMA
import PlantationEntity from './schemas/plantation.entity';
// SERVICES
import PlantationService from './plantations.service';

@ApiTags('Plantation')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(PlantationEntity)
@Controller()
export default class PlantationController {
  constructor(private readonly plantationService: PlantationService) {}

  /**
   * * Get Method for Plantation Retrieval by id
   * @api {get} /plantations/:id
   * @param {id} id of the plantation
   * @description Get one Plantation by id
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {NotFoundException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlantationEntity),
        },
      },
    },
    description: '200. Success. Returns a plantation',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Plantation was not found',
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
  @Serialize(AllPlantationsResponseEntity)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseInterface> {
    const foundPlantation = await this.plantationService.findOne(id);

    if (!foundPlantation) {
      throw new NotFoundException('The plantation does not exist');
    }

    return ResponseUtils.success('plantation', foundPlantation);
  }

  /**
   * * Get Method for Plantation Retrieval
   * @api {get} /plantations
   * @description Get all Plantations
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlantationEntity),
        },
      },
    },
    description: '200. Success. Returns all plantations',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Plantation was not found',
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
  @Serialize(AllPlantationsResponseEntity)
  @Get()
  async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false =
      PaginationUtils.normalizeParams({ page: query.page, limit: query.limit });
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedPlantation: PaginatedPlantationsInterface =
      await this.plantationService.findAll(paginationParams);

    return ResponseUtils.success(
      'plantation',
      paginatedPlantation.paginatedResult,
      {
        location: 'plantation',
        paginationParams,
        totalCount: paginatedPlantation.totalCount,
      },
    );
  }
}
