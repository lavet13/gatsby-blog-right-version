import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';

type TextFieldProps = {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  id?: string;
} & InputProps;

const TextField: FC<TextFieldProps> = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  // field { name, value, onChange, onBlur }
  // meta { value, error, touched, initialValue, initialError, initialTouched }
  // helpers { setValue, setTouched, setError }

  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel htmlFor={props.id || name}>{label}</FormLabel>
      <Input {...field} {...props} id={props.id} />
      <ErrorMessage name={name} component={FormErrorMessage} />
    </FormControl>
  );
};

export default TextField;
