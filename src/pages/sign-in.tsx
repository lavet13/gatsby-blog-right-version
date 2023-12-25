import React, { FC } from 'react';
import SEO from '../components/seo.component';
import type { HeadFC, PageProps } from 'gatsby';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import type { FieldProps } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';

import { object, string, boolean } from 'yup';
import useIsClient from '../common/hooks/use-is-client';
import TextField from '../components/text-field.component';
import Checkbox from '../components/checkbox.component';
import { useDispatch } from 'react-redux';
import { fetchSignInStarted } from '../redux/features/me/me.slice';
// import SelectField from '../components/select.component';

export interface SignInFormValues {
  login: string;
  password: string;
  rememberMe?: boolean;
  acceptedTerms?: boolean;
  // optional?: string;
  // country: string;
}

const validationSchema = object().shape({
  login: string()
    .required('Login is required!')
    .test(
      `loginIsTooShort`,
      'Must be more than 4 characters!',
      value => value.length >= 5
    ),

  password: string()
    .required('Password is required!')
    .test(
      `passwordIsTooShort`,
      'Must be more than 5 characters',
      value => value.length >= 6
    ),

  rememberMe: boolean(),

  acceptedTerms: boolean().oneOf(
    [true],
    'You must accept the terms and conditions.'
  ),

  // optional: string().optional(),

  // country: string().required('Country must be selected!'),
});

const SignIn: FC<PageProps> = () => {
  const { isClient, key } = useIsClient();

  const dispatch = useDispatch();

  const initialValues: SignInFormValues = {
    login: '',
    password: '',
    rememberMe: true,
    acceptedTerms: false,
    // optional: '',
    // country: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        (async () => {
          await new Promise(resolve => setTimeout(() => resolve(''), 1000));
          console.log({ values, actions });

          // if (!values.optional) {
          //   delete values.optional;
          // }

          if (values.acceptedTerms) {
            delete values.acceptedTerms;
          }
          if (values.rememberMe) {
            delete values.rememberMe;
          }

          const token = dispatch(fetchSignInStarted(values));

          console.log({ token });

          actions.setSubmitting(false);
          actions.resetForm();
        })();
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors }) => {
        console.log({ errors });
        return (
          <Form>
            {/* <Field name='login'>
              {(props: FieldProps<any, FormValues>) => {
                console.log({ props });
                const { field, meta } = props;

                return (
                  <FormControl isInvalid={!!meta.error && meta.touched}>
                    <FormLabel htmlFor='login'>Login</FormLabel>
                    <Input {...field} id='login' placeholder='Login' />
                    <ErrorMessage name='login' component={FormErrorMessage} />
                  </FormControl>
                );
              }}
            </Field> */}

            <TextField name='login' label='Login' type='text' />

            <TextField name='password' label='Password' type='password' />

            {/* <TextField name='optional' label='Optional' type='text' /> */}
            {/* <Field name='password'>
              {(props: FieldProps<any, FormValues>) => {
                console.log({ props });
                const { meta, field } = props;

                return (
                  <FormControl isInvalid={!!meta.error && meta.touched}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                      {...field}
                      id='password'
                      type='password'
                      placeholder='Password'
                    />
                    <ErrorMessage
                      name='password'
                      component={FormErrorMessage}
                    />
                  </FormControl>
                );
              }}
            </Field> */}

            <Checkbox name='rememberMe'>Remember me?</Checkbox>
            <Checkbox name='acceptedTerms'>
              I'm accepting the terms and conditions.
            </Checkbox>

            {/* <SelectField
              isRequired
              name='country'
              placeholder='Select country'
              label='Country'
              id='country'
            >
              <option value='1'>Russian</option>
              <option value='2'>Ukraine</option>
            </SelectField> */}

            {isClient && (
              <Button key={key} mt={4} isLoading={isSubmitting} type='submit'>
                Submit
              </Button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export const Head: HeadFC = () => <SEO />;

export default SignIn;
