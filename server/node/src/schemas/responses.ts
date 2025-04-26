import { z } from 'zod'

export const ErrorResponseSchema = z.object({
  error: z.string()
})

export const MessageResponseSchema = z.object({
  message: z.string()
})

export const NotFoundResponseSchema = ErrorResponseSchema
export const BadRequestResponseSchema = ErrorResponseSchema
export const GoneResponseSchema = ErrorResponseSchema
export const InternalServerErrorResponseSchema = ErrorResponseSchema 
