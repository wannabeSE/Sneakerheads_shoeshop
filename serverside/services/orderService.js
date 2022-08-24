const {user}=require("../models/user")
const {cards}=require("../models/cards")
const {order}=require("../models/order")

const stripeService= require("../services/stripeService")
const cartService = require('../services/cartService')



async function createOrder(params, callback){
    user.findOne({_id:params.userId}, async function(err,userdb){
        if(err){
            return callback(err)
        }
        else{
            var model={}

            if(!userdb.stripeCustomerID){
                await stripeService.createCustomer({
                    'name':userdb.firstName,
                    'email':userdb.email,

                },(error, results)=>{
                    if(error){
                        return callback(error)
                    }
                    if(results){
                        userdb.stripeCustomerID= results.id;
                        userdb.save()

                        model.stripeCustomerID=results.id
                    }
                }
                )
            }
            else{
                model.stripeCustomerID=userdb.stripeCustomerID
            }
            cards.findOne({
                customerId:model.stripeCustomerID,
                cardNumber:params.card_Number,
                cardExpMonth:params.card_ExpMonth,
                cardExpYear:params.card_ExpYear
            },async function (err, carddb) {
                    if (err) {
                        return callback(err)
                    }
                    else {
                        if (!carddb) {
                            await stripeService.addCard({
                                'card_Name': params.card_Name,
                                'card_Number': params.card_Number,
                                'card_ExpMonth': params.card_ExpMonth,
                                'card_ExpYear': params.card_ExpYear,
                                'card_CVC': params.card_CVC,
                                'customer_Id':model.stripeCustomerID
                            }, (error, results) => {
                                if (error) { return callback(err)} 
                                if (results) {
                                    const cardModel = new cards({
                                        cardId: results.card,
                                        cardName: params.card_Name,
                                        cardNumber: params.card_Number,
                                        cardExpMonth: params.card_ExpMonth,
                                        cardExpMonth: params.card_ExpYear,
                                        cardCVC: params.card_CVC,
                                        customerId: model.stripeCustomerID
                                    })
                                    cardModel.save()
                                    model.cardId = results.card
                                }
                            })
                        }
                        else {
                            model.cardId = carddb.cardId
                        }
                        await stripeService.generatePayment({
                            'receipt_email': userdb.email,
                            'amount': params.amount,
                            'card_id': model.cardId,
                            'customer_id': model.stripeCustomerID
                        }, (error, results) => {
                            if (error) {
                                return callback(error)
                            }
                            if (results) {
                                model.paymentIntentId = results.id
                                model.client_secret = results.client_secret
                            }
                        })
                        cartService.getCart({ userId: userdb.id }, function (err, cartdb) {
                            if (err) {
                                return callback(err)
                            }
                            else {
                                if (cartdb) {
                                    var products = []
                                    var grandTotal = 0

                                    cartdb.products.forEach(product => {
                                        products.push({
                                            product: product.product._id,
                                            quantity: product.quantity,
                                            amount: product.product.price
                                        })
                                        grandTotal += product.product.price
                                    })
                                    const orderModel = new order({
                                        userId: cartdb.userId,
                                        products: products,
                                        orderStatus: 'pending',
                                        grandTotal: grandTotal
                                    })
                                    orderModel.save()
                                        .then((response) => {
                                            console.log(response)
                                            console.log(response._id)
                                            model.orderId = response._id
                                            return callback(null, model)
                                        })
                                        .catch((error) => {
                                            return callback(error)
                                        })
                                }
                            }
                        })
                    }
                })
        }
    })
}

async function updateOrder(params, callback){
    var model={
        orderStatus:params.status,
        transactionId:params.transaction._id
    }

    order.findByIdAndUpdate(params.orderId, model, {userFindAndModify:falsa})
    .then((response)=>{
        if(!response){
            callback('Order Update Failed')
        }
        else{
            if(params.status == 'success'){
                return callback(null,'Success')
            }
            return callback(null, response)
        }
    })
    .catch((error)=>{
        return callback(error)
    })
}

async function getOrders(params,callback) {
    order.findOne({userId:params.userId})
    .populate({
        path:'products',
        populate:{
            path:'product',
            model:'Product',
            select:'name price'
        }
    })
    .then((response)=>{
        return callback(null, response)
    })
    .catch((error)=>{
        return callback(error)
    })
}

module.exports={createOrder,updateOrder,getOrders}