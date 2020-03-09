import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import calculateCartTotal from '../../utils/calculateCartTotal'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


export default async (req, res) => {
    const { paymentData } = req.body
    try {
        // 1. Verify and get user id from token

        // 2. Find the acrt based on user id, populate it

        // 3. Calculate cart totals again from cart products

        //4. Get email from payment data, and see if email linked whith existeng stripe customer

        // 5. if not existeng costumer, create them base on their email

        // 6. Create charge with total, send reseipt email

        // 7. add order data to database

        // 8. Clear products in cart

        // 9. send back success (200 ) response


    } catch (error) {
        res.status(500).send('error processing charge')
    }
}








