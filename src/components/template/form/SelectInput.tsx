import { Select, SelectProps } from '@mantine/core'

export function SelectInput(props: SelectProps) {
  return (
    <Select
      label={props.label}
      placeholder={props.placeholder}
      data={props.data}
    />
  )
}
