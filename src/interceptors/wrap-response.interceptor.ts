import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializer } from 'jsonapi-serializer';
import * as _ from 'lodash';
import { camelCase } from 'lodash';
import PaginationUtils from '../utils/pagination.utils';

@Injectable()
export default class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((...args) => {
        const serializeOptions: any = {};
        const { data, options, collectionName } = args[0];

        if (data && collectionName) {
          if (data.length) {
            serializeOptions.attributes = Object.keys(_.omit(data[0]));
          } else {
            serializeOptions.attributes = Object.keys(_.omit(data));
          }
          if (options) {
            serializeOptions.topLevelLinks = PaginationUtils.getPaginationLinks(
              options.location,
              options.paginationParams,
              options.totalCount,
            );
            serializeOptions.meta = { totalCount: options.totalCount };
          }

          const serializedObject = new Serializer(collectionName, {
            ...serializeOptions,
            keyForAttribute: camelCase,
          }).serialize(data);

          if (Array.isArray(serializedObject?.data)) {
            serializedObject?.data?.forEach((item: any) => {
              delete item.id;
            });
          }

          return serializedObject;
        }

        return {
          data: args[0].data ?? args[0],
        };
      }),
    );
  }
}
