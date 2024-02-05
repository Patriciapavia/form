import React from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Box,
} from '@chakra-ui/react'
import { testProps } from '../utils/testProps'
import {
  Merge,
  FieldError,
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  FieldPath,
} from 'react-hook-form'

// type MyType<T extends FieldValues> = {
//   register: UseFormRegister<T>;
// }

interface InputProps {
  isInvalid?: boolean
  FieldValues
  register?: (
    name?: FieldValues,
    options?: RegisterOptions
  ) => UseFormRegisterReturn
  // resgister?: UseFormRegister<FieldValues>
  // resgister?: UseFormRegisterReturn['register']
  id?: string
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl>
    | undefined
  customErrorMessage?: string
  formControlId?: string
  inputType?: string | number
  formLabel?: string
  leftInputAddon?: string
  name?: string
  control?: any
  onBlur?: (value: string) => void
}

const InputComponent: React.FC<InputProps> = ({
  isInvalid,
  register,
  id,
  formControlId,
  errorMessage,
  customErrorMessage,
  inputType,
  formLabel,
  leftInputAddon,
}) => {
  return (
    <Box mb={4}>
      <FormLabel {...testProps(id as string)}>{formLabel}</FormLabel>
      <FormControl id={formControlId} isInvalid={isInvalid}>
        <InputGroup>
          {leftInputAddon && <InputLeftAddon>{leftInputAddon}</InputLeftAddon>}
          <Input type={inputType} {...register} id={id} />
        </InputGroup>

        {customErrorMessage ? (
          <Box mt={2}>
            <Text color="red.500">{customErrorMessage?.message}</Text>
          </Box>
        ) : (
          <FormErrorMessage>
            {errorMessage && errorMessage.message}
          </FormErrorMessage>
        )}
        {/* {customError && rangeAmountSelected && (
              <Box mt={2}>
                <Text color="red.500">{customError.message} from box</Text>
              </Box>
            )} */}
      </FormControl>
    </Box>
  )
}

export default InputComponent
