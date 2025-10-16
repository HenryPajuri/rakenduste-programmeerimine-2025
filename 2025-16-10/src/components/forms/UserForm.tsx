'use client';

import { useForm } from '@mantine/form';
import { TextInput, Button, Box, Stack, Textarea } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: Date | null;
  time: string;
  description: string;
}

export default function UserForm() {
  const form = useForm<UserFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      date: null,
      time: '',
      description: '',
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
      date: (value) => (value ? null : 'Date is required'),
      time: (value) => (value.trim().length > 0 ? null : 'Time is required'),
      description: (value) =>
        value.trim().length >= 10 ? null : 'Description must have at least 10 characters',
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

          <DatePickerInput
            label="Date"
            placeholder="Pick a date"
            {...form.getInputProps('date')}
            required
          />

          <TimeInput
            label="Time"
            value={form.values.time}
            onChange={(event) => form.setFieldValue('time', event.currentTarget.value)}
            error={form.errors.time}
            required
          />

          <Textarea
            label="Description"
            placeholder="Enter a description (minimum 10 characters)"
            minRows={3}
            {...form.getInputProps('description')}
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
