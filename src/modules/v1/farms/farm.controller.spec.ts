import { Test, TestingModule } from '@nestjs/testing';
import FarmsController from './farms.controller';
import FarmsService from './farms.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PaginatedFarmsInterface } from '@interfaces/paginatedEntity.interface';
import { FindAllFarmsUseCase } from './use-cases/find-all-farms.use-case';
import { IFarmRepository } from './interfaces/farms.interface';
import { FindAllInAcreFarmsUseCase } from './use-cases/find-all-in-acre-farms.use-case';
import { DocumentsEnum } from '@v1/producers/enum/document-type.enum';

describe('FarmsController', () => {
  let farmController: FarmsController;
  let farmService: FarmsService;
  let repositoryMock: jest.Mocked<IFarmRepository>;

  beforeEach(async () => {
    repositoryMock = {
      findAll: jest.fn(),
      countAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [
        FarmsService,
        {
          provide: 'IFarmRepository',
          useValue: repositoryMock,
        },
        FindAllFarmsUseCase,
        FindAllInAcreFarmsUseCase,
      ],
    }).compile();

    farmController = module.get<FarmsController>(FarmsController);
    farmService = module.get<FarmsService>(FarmsService);
  });

  describe('findQuantity', () => {
    it('should return the quantity of all farms', async () => {
      const quantity = 10; // Example quantity
      jest.spyOn(farmService, 'findQuantity').mockResolvedValue(quantity);

      expect(await farmController.findQuantity()).toBe(quantity);
    });
  });

  describe('findAllInAcre', () => {
    it('should return all farms in acres', async () => {
      const query = { page: 1, limit: 10 }; // Example query
      const expectedResult = 20; // Example result
      jest
        .spyOn(farmService, 'findAllInAcre')
        .mockResolvedValue(expectedResult);

      expect(await farmController.findAllInAcre(query)).toBe(expectedResult);
    });

    it('should throw BadRequestException for invalid pagination parameters', async () => {
      const invalidQuery = { page: 'invalid', limit: 10 }; // Invalid query
      await expect(
        farmController.findAllInAcre(invalidQuery),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all farms with pagination data', async () => {
      const mockPaginatedFarms: PaginatedFarmsInterface = {
        paginatedResult: [],
        totalCount: 0,
      };

      jest.spyOn(farmService, 'findAll').mockResolvedValue(mockPaginatedFarms);

      return expect(
        farmController.findAll({ page: 1, limit: 10 }),
      ).resolves.toEqual(
        expect.objectContaining({
          data: mockPaginatedFarms.paginatedResult,
        }),
      );
    });

    it('should throw BadRequestException for invalid pagination parameters', async () => {
      const invalidQuery = { page: 'invalid', limit: 10 }; // Invalid query
      await expect(farmController.findAll(invalidQuery)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a farm by id', async () => {
      const mockedFoundFarm = {
        id: 1,
        name: 'Farm 1',
        city: 'São Paulo',
        state: 'SP',
        agriculturalArea: 4,
        vegetationArea: 3,
        totalArea: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        producer: {
          id: 1,
          name: 'Bruno Garcia',
          document: '90497249065',
          documentType: DocumentsEnum.CPF,
          createdAt: new Date(),
          updatedAt: new Date(),
          farms: [],
          productions: [],
        },
        productions: [],
      };
      const toBeEqual = {
        collectionName: 'farm',
        data: { ...mockedFoundFarm },
        options: undefined,
      };
      jest.spyOn(farmService, 'findOne').mockResolvedValue(mockedFoundFarm);

      const result = await farmController.findOne(mockedFoundFarm.id);

      expect(result).toEqual(toBeEqual);
    });

    it('should throw NotFoundException if farm does not exist', async () => {
      const id = 999;
      jest.spyOn(farmService, 'findOne').mockResolvedValue(null);

      await expect(farmController.findOne(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
