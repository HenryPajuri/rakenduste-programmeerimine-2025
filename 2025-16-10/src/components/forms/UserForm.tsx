'use client';

import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Stack } from '@mantine/core';

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function UserForm() {
  const form = useForm<UserFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    validate: {
      firstName: (value) =>
        value.trim().length < 2 ? 'First name must have at least 2 characters' : null,
      lastName: (value) =>
        value.trim().length < 2 ? 'Last name must have at least 2 characters' : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address',
      phoneNumber: (value) =>
        /^\+?[\d\s\-()]+$/.test(value) && value.replace(/\D/g, '').length >= 7
          ? null
          : 'Invalid phone number',
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    console.log('Form submitted:', values);
  };

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps('firstName')}
            required
          />

          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            {...form.getInputProps('lastName')}
            required
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...form.getInputProps('email')}
            required
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            {...form.getInputProps('phoneNumber')}
            required
          />

          <Button type="submit" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
