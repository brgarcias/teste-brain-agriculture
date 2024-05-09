// NEST COMMON
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
  BadRequestException,
  Query,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  ParseIntPipe,
  Delete,
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
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
// LODASH
import { isEmpty } from 'lodash';
// INTERCEPTORS
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import Serialize from '@decorators/serialization.decorator';
// ENTITIES
import { AllProducersResponseEntity } from '@v1/producers/entities/producer-response.entity';
// INTERFACES
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedProducersInterface } from '@interfaces/paginatedEntity.interface';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';
// UTILS
import PaginationUtils from '@utils/pagination.utils';
import ResponseUtils from '@utils/response.utils';
// SCHEMA
import ProducerEntity from './schemas/producer.entity';
// DTO`S
import CreateProducerDto from './dto/create-producer.dto';
import UpdateProducerDto from './dto/update-producer.dto';
// SERVICES
import ProducerService from './producers.service';

@ApiTags('Producer')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(ProducerEntity)
@Controller()
export default class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  /**
   * * Post Method for Producer Creation
   * @api {post} /producers
   * @body Data to send in body - @see CreateProducerDto
   * @description Create one Producer
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiBody({ type: CreateProducerDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProducerEntity),
        },
      },
    },
    description: '201. Success. Returns a producer',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              name: 'string',
              document: 'string',
              documentType: 'string',
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
    @Body() producer: CreateProducerDto,
  ): Promise<SuccessResponseInterface | never> {
    await this.producerService.createOne(producer);
    return ResponseUtils.success('producer', {
      message: 'success! producer created.',
    });
  }

  /**
   * * Get Method for Producer Retrieval by id
   * @api {get} /producers/:id
   * @param {id} id of the producer
   * @description Get one Producer by id
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {NotFoundException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProducerEntity),
        },
      },
    },
    description: '200. Success. Returns a producer',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Producer was not found',
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
  @Serialize(AllProducersResponseEntity)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseInterface> {
    const foundProducer = await this.producerService.findOne(id);

    if (!foundProducer) {
      throw new NotFoundException('The producer does not exist');
    }

    return ResponseUtils.success('producer', foundProducer);
  }

  /**
   * * Get Method for Producer Retrieval
   * @api {get} /producers
   * @description Get all Producers
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProducerEntity),
        },
      },
    },
    description: '200. Success. Returns all producers',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Producer was not found',
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
  @Serialize(AllProducersResponseEntity)
  @Get()
  async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false =
      PaginationUtils.normalizeParams({ page: query.page, limit: query.limit });
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedProducer: PaginatedProducersInterface =
      await this.producerService.findAll(paginationParams);

    return ResponseUtils.success(
      'producer',
      paginatedProducer.paginatedResult,
      {
        location: 'producer',
        paginationParams,
        totalCount: paginatedProducer.totalCount,
      },
    );
  }

  /**
   * * Update Method for Producer by id
   * @api {update} /producers/:id
   * @param {id} id of the producer
   * @body Data to send in body - @see UpdateProducerDto
   * @description Update one Producer by id
   * @returns Promise<SuccessResponseInterface | never>
   * @throws {BadRequestException}
   */
  @ApiBody({ type: UpdateProducerDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(ProducerEntity),
        },
      },
    },
    description: '201. Success. Returns a producer',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              name: 'string',
              document: 'string',
              documentType: 'string',
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
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String })
  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProducerDto,
  ): Promise<SuccessResponseInterface | never> {
    await this.producerService.updateOne(id, data);
    return ResponseUtils.success('producer', {
      message: 'success! producer updated.',
    });
  }

  /**
   * * Delete Method for Producer Deletion by id
   * @api {delete} /producers/:id
   * @param {id} id of the producer
   * @description Delete one Producer by id
   * @returns Promise<Record<string, never>>
   * @throws {NotFoundException}
   */
  @ApiNoContentResponse({
    description: '204. Success! Producer removed.',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Producer was not found',
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
  @ApiParam({ name: 'id', type: Number })
  @Serialize(AllProducersResponseEntity)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Record<string, never>> {
    const foundProducer = await this.producerService.findOne(id);

    if (isEmpty(foundProducer) || !foundProducer) {
      throw new NotFoundException('The producer does not exist');
    }

    const result = await this.producerService.remove(id);

    if (isEmpty(result)) {
      throw new NotFoundException();
    }

    return {};
  }
}
