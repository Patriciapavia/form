import { testProps } from '../utils/testProps'
import { RadioGroup, Stack, Radio } from '@chakra-ui/react'
type RadioInputProps = {
  register?: any
  id?: string
  value?: string
  radioSelect?: string
  label?: string
  onChange?: (value: string) => void
}

const RadioInputComponent = ({
  register,
  id,
  value,
  radioSelect,
  label,
  onChange,
}: RadioInputProps) => {
  return (
    <RadioGroup mb={4} onChange={onChange} value={radioSelect}>
      <Stack direction="row">
        <Radio {...register} {...testProps(id as string)} value={value}>
          {label}
        </Radio>
      </Stack>
    </RadioGroup>
  )
}

export default RadioInputComponent
