import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';

import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';

/**
 * The pagination provider.
 */
@Injectable()
export class PaginationProvider {
  /**
   * The pagination provider constructor.
   * @param request The request.
   */
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * Paginate the query.
   * @param {PaginationQueryDto} paginationQuery The pagination query.
   * @param {Repository<T>} repository The entity repository.
   * @returns {Promise<Paginated<T>>} The paginated results.
   */
  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      take: paginationQuery.limit,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
    });

    // Create the request URLS
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newURL = new URL(this.request.url, baseURL);

    // Create the pagination meta data
    const currentPage = paginationQuery.page;
    const itemsPerPage = paginationQuery.limit;
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      data: results,
      meta: {
        currentPage: paginationQuery.page,
        itemsPerPage: paginationQuery.limit,
        totalItems,
        totalPages,
      },
      links: {
        previous:
          currentPage > 1
            ? `${newURL.origin}${newURL.pathname}?page=${currentPage - 1}&limit=${itemsPerPage}`
            : null,
        next:
          currentPage < totalPages
            ? `${newURL.origin}${newURL.pathname}?page=${currentPage + 1}&limit=${itemsPerPage}`
            : null,
        current: `${newURL.origin}${newURL.pathname}?page=${currentPage}&limit=${itemsPerPage}`,
        first: `${newURL.origin}${newURL.pathname}?page=1&limit=${itemsPerPage}`,
        last: `${newURL.origin}${newURL.pathname}?page=${totalPages}&limit=${itemsPerPage}`,
      },
    } satisfies Paginated<T>;
  }
}
