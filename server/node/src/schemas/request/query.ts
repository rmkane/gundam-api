import { z } from 'zod'

/**
 * A boolean parameter that accepts 'true'/'false' strings from HTTP queries,
 * but appears as a boolean in the OpenAPI schema.
 *
 * @example
 * // In HTTP query: ?includeDeleted=true
 * // In code: includeDeleted === true
 *
 * // In HTTP query: ?includeDeleted=false
 * // In code: includeDeleted === false
 */
export const BooleanParamSchema = z
  .string()
  .transform((v) => v === 'true')
  .describe('Boolean parameter')
  .openapi({ type: 'boolean' })

/**
 * A number parameter that accepts numeric strings from HTTP queries,
 * but appears as a number in the OpenAPI schema.
 *
 * @example
 * // In HTTP query: ?seriesId=1
 * // In code: seriesId === 1
 *
 * // In HTTP query: ?page=2
 * // In code: page === 2
 */
export const NumberParamSchema = z
  .string()
  .transform(Number)
  .describe('Number parameter')
  .openapi({ type: 'number' })
