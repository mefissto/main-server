import type { ObjectLiteral, Repository } from 'typeorm';

/**
 * Include all columns
 * @param repository
 * @returns
 */
export function includeAll<T extends ObjectLiteral>(
  repository: Repository<T>,
): Array<keyof T> {
  return repository.metadata.columns.map((col) => col.propertyName) as Array<
    keyof T
  >;
}

/**
 * Include only the selected columns
 * @param repository
 * @param selectedColumns
 * @returns
 */
export function include<T extends ObjectLiteral>(
  repository: Repository<T>,
  unselectedColumnsToAdd: Array<keyof T>,
): Array<keyof T> {
  return repository.metadata.columns
    .filter(
      (col) =>
        col.isSelect ||
        (!col.isSelect &&
          unselectedColumnsToAdd.includes(col.propertyName as keyof T)),
    )
    .map((col) => col.propertyName) as Array<keyof T>;
}
