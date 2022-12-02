import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Divider, Box } from '@mui/material'

const Confirmation = ({ user, order }) => {
  return (
    <>
            <Box sx={{ marginTop: '15vh' }}>
                <Typography variant='h5' gutterBottom>Thanks for your visit at GenMed, {user.displayName}</Typography>
                <Divider />
                <Typography variant='subtitle2' sx={{ marginTop: '5vh' }}>Order Ref: {order.id} </Typography>
                <Typography variant='subtitle1'>Check your Orders for further details!</Typography>
            </Box>
            <br />
            <Button variant='outlined' type='button' component={Link} to='/'>Back to GenMed</Button>
        </>
  )
}

export default Confirmation