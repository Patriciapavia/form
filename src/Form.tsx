import { useState, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormLabel,
  Button,
  Container,
  Flex,
  Text,
  Grid,
  Box,
} from '@chakra-ui/react'
import { formSchema } from './schema'
import { testProps } from '../src/utils/testProps'
import InputComponent from '../src/components/InputComponent'
import RadioInputComponent from '../src/components/RadioInputComponent'
export const Form = () => {
  type FormFields = z.infer<typeof formSchema>

  // The callback to use when the form is submitted
  const saveData = (data) => {
    console.log(data)
  }

  const {
    handleSubmit,
    register,
    reset,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const [radioSelect, setRadioSelect] = useState('')

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          resolve(values)
          saveData(values)
        }, 1000)
      })
    } catch (error) {
      //catch error from backend
      setError('root', {
        //message can be direct and more specific from
        message: 'something went wrong',
      })
    }
  }

  const handleOnblur = () => {
    trigger(['name', 'email', 'price.amount'])
  }

  // to ensure the form is reset after successful submit

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return
    }
    setRadioSelect('')
    reset()
  }, [isSubmitSuccessful, reset])

  const handleRadioPriceChange = (newValue: string) => {
    setRadioSelect(newValue)
    // clear errors from price when changing radio butto
    clearErrors(['price.amount', 'price.amount.min', 'price.amount.max'])
  }
  return (
    <Container mt={8} mb={20}>
      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          isInvalid={!!errors.name}
          errorMessage={errors?.name}
          register={{ ...register('name') }}
          id="name"
          formLabel="Name"
          name="name"
          onBlur={handleOnblur}
        />

        <InputComponent
          isInvalid={!!errors.email}
          register={{ ...register('email') }}
          id="email"
          inputType="email"
          formControlId="email"
          errorMessage={errors?.email}
          formLabel="Email"
          name="email"
        />
        <Box>
          <FormLabel>Price type</FormLabel>
          {errors?.price?.type && (
            <Box my={2}>
              <Text color="red.500">{'Please select a price type'}</Text>
            </Box>
          )}
        </Box>
        <Flex gap={1}>
          <RadioInputComponent
            radioSelect={radioSelect}
            onChange={handleRadioPriceChange}
            register={{ ...register('price.type') }}
            label={'Fixed'}
            id={'fixed-type'}
            value={'fixed'}
          />
          <RadioInputComponent
            onChange={handleRadioPriceChange}
            radioSelect={radioSelect}
            register={{ ...register('price.type') }}
            label={'Range'}
            id={'range-type'}
            value={'range'}
          />
        </Flex>
        {radioSelect === 'fixed' && (
          <InputComponent
            isInvalid={!!errors?.price?.amount}
            register={{
              ...register('price.amount', { valueAsNumber: true }),
            }}
            inputType={'number'}
            id="fixed-amount"
            formControlId="price.amount"
            errorMessage={errors?.price?.amount}
            customErrorMessage={errors?.price?.amount?.root}
            formLabel="Amount"
            leftInputAddon={'$'}
            name="price.amount"
            onBlur={handleOnblur}
          />
        )}
        {radioSelect === 'range' && (
          <>
            <Grid templateColumns="1fr 1fr" gap={2}>
              <InputComponent
                isInvalid={!!errors.price?.amount?.min}
                register={{
                  ...register('price.amount.min', { valueAsNumber: true }),
                }}
                id="min-amount"
                inputType="number"
                formControlId="price?.amount?.min"
                errorMessage={errors?.price?.amount?.min}
                customErrorMessage={errors?.price?.price_error}
                formLabel="Min"
                leftInputAddon={'$'}
                name="price.amount.min"
              />
              <InputComponent
                isInvalid={!!errors?.price?.amount?.max}
                register={{
                  ...register('price.amount.max', { valueAsNumber: true }),
                }}
                id="max-amount"
                errorMessage={errors?.price?.amount?.max}
                inputType="number"
                formControlId="price.amount.max"
                formLabel="Max"
                leftInputAddon={'$'}
                name="price.amount.max"
              />
            </Grid>
          </>
        )}

        <Button
          {...testProps('submit-button')}
          type="submit"
          disabled={isSubmitting}
          colorScheme="blue"
          w="full"
        >
          {isSubmitting ? 'Loading' : 'Submit'}
        </Button>
      </form>
    </Container>
  )
}
