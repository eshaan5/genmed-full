import React from 'react'
import { Typography, Grid, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'

import { Box } from '@mui/system'

const AddressForm = ({ next }) => {

    const methods = useForm()

  return (
    <Box sx={{ padding: '3vw' }}>
    <Typography variant='h4' sx={{ marginTop: '2vh' }}>Help us with your Address!</Typography>
        <Typography variant='h6' gutterBottom sx={{ marginTop: '2vh' }}>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({...data}))}>
                <Grid container spacing={3}>
                    <FormInput name='fName' label='First Name' />
                    <FormInput name='lName' label='Last Name' />
                    <FormInput name='address' label='Address' />
                    <FormInput name='city' label='City' />
                    <FormInput name='state' label='State' />
                    <FormInput name='pin' label='Pin Code' />
                    <FormInput name='phone' label='Phone' />
                </Grid>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/* <Button component={Link} to='/' variant='outlined'>Cancel Order</Button> */}
                    <Button type='submit' variant='contained' color='primary'>Proceed</Button>
                </div>
            </form>
        </FormProvider>
    </Box>
  )
}

export default AddressForm