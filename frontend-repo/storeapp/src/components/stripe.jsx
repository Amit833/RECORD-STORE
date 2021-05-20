
import { useContext, useState } from 'react';
import { myContext } from "../context/myContext";
import StripeCheckout from "react-stripe-checkout"
import { sendPaymentInfo } from "../helpers/apiCall";




const Stripe = () => {
    const {
        cart,
        user,
        orders,
        setCart,
        setOrders,
        cartCounter,
        setCartCounter,
        setTotalQuantity
    } = useContext(myContext);

    const [product, setProduct] = useState({
        name: "test product",
        price: 2000,
        produceBy: 'amllllllllllll'
    })

    const makePayment = async (token) => {
        const body = {
            token,
            product
        }

        const headers = {
            'Content_Type': 'application/json'
        }

        await sendPaymentInfo(headers, body)

        // return fetch(`http://localhost:8080/payment`, {
        //     method: "POST",
        //     headers,
        //     body: JSON.stringify(body)
        // })
        //     .then(response => {
        //         console.log('RESPONSE', response);
        //         const { status } = response;
        //         console.log('STATUS', status);
        //     })
        //     .catch(error => console.log(error))
    }

    return (
        <>
            <h1>you can pay here!</h1>
            <StripeCheckout
                stripeKey={"pk_test_51IsllTFfKkG9FeO926QuMVUXSgkarifHFFBT86IvcSvLdttIaFJ1bYbGIl0Pwgr0dYbCJ4ydc6J9CSiF8pgmJYZs00YnmJTDkU"}
                token={makePayment}
                name="Pay Now"
                shippingAddress
                billingAddress
            >
                {/* <button>price: {product.price} </button> */}
                <button>BUY NOW</button>
            </StripeCheckout>
        </>
    )
}


export default Stripe;