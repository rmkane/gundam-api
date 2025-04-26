import { z } from 'zod'

export const BooleanParamSchema = z.enum(['true', 'false']).transform((v) => v === 'true')

export const NumberParamSchema = z.string().transform(Number)
