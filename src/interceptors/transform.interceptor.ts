/**
 * Transform interceptor.
 * @file 请求流拦截器
 * @module interceptor/transform
 */

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { THttpSuccessResponse, IHttpResultPaginate, EHttpStatus, TMessage } from '../interfaces/http.interface';
import * as META from '../constants/meta.constant';
import * as TEXT from '../constants/text.constant';

// 转换为标准的数据结构
export function transformDataToPaginate<T>(data: any, request?: any): IHttpResultPaginate<T[]> {
  return {
    data: data.docs,
    params: request ? request.queryParams : null,
    pagination: {
      total: data.total,
      current_page: data.page,
      total_page: data.pages,
      per_page: data.limit,
    },
  };
}

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 IHttpResultPaginate
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, THttpSuccessResponse<T>> {

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const message = this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || TEXT.HTTP_DEFAULT_SUCCESS_TEXT;
    return call$.pipe(map((item: any) => {
      return { status: EHttpStatus.Success, message, data: item || [] };
    }));
  }
}
