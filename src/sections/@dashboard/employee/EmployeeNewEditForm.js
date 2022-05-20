import * as Yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
// Hook
import useEmployee from '../../../hooks/useEmployee';

// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function EmployeeNewEditForm() {
  const { addEmployee } = useEmployee();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewEmployeeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    garage: Yup.string().required('Garage is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      phoneNumber: '',
      garage: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await addEmployee({ data });
      enqueueSnackbar('Sucess create new employee!');
      navigate(PATH_DASHBOARD.employee.employeelist);
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} sx={{ margin: '0 auto' }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                my: 5,
              }}
            >
              <RHFTextField name="name" label="Employee Name" />
              <RHFTextField name="phoneNumber" label="Phone Number" sx={{ my: 2 }} />
              <RHFTextField name="garage" label="Garage" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Create Employee'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
