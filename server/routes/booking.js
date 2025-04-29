const express = require('express')
const router = express.Router()
const { CommonUser } = require('../models/commonUser')

router.post('/checkout-session/:doctorId', async (req, res) => {
  try {
    const doctor = await CommonUser.findById(req.param.id)
    const user = await CommonUser.findById(req.id)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.id,
      line_items: [
        {
          price_data: {
            currency: 'azn',
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: `${doctor.firstname} ${doctor.lastname}`,
              description: doctor.biography,
              images: [doctor.image],
            },
            quantity: 1,
          },
        },
      ],
    })
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    })

    await booking.save()
    res.send(200).json({ success: true, message: 'Successfully paid', session })
  } catch (error) {
    res.send(500).json({
      success: false,
      message: 'Error occured during checkout session',
    })
  }
})

module.exports = router
