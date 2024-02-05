import * as z from 'zod'

// Create zod validation schema for the

const priceSchema = z
  .object({
    type: z.enum(['range', 'fixed']),
    amount: z.union([
      z.number(),
      z.object({
        min: z.number(),
        max: z.number(),
      }),
    ]),
  })
  .superRefine((schema, ctx) => {
    const { type, amount } = schema
    if (type === 'range') {
      if (amount?.min > amount.max) {
        ctx.addIssue({
          code: 'custom',
          message: 'Min must be less than max',
          path: ['price_error'],
        })
      }
    }
  })

export const formSchema = z.object({
  name: z
    .string()
    .max(10, { message: 'String must contain at most 10 character(s)' })
    .min(1, { message: 'String must contain at least 1 character(s)' }),
  email: z.string().email({ message: 'Invalid email' }),
  price: priceSchema.optional(),
})
