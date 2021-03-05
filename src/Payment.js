import { Link , useHistory} from 'react-router-dom';
import React,{useState , useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import  CurrencyFormat  from "react-currency-format";
import { getBasketTotal } from './reducer';
import axios from "./axios";
import {db} from "./firebase";


function Payment() {

    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () =>{
            const response = await axios({
                method: "post",
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });

            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket])

    console.log("The secret is >>>", clientSecret);

    const stripe= useStripe();
    const elements= useElements();

    const handleSubmit = async(event) => {

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db.collection("users")
            .doc(user?.uid)
            .collection("users")
            .doc("okPay")
            .set({
                basket: basket,
                amount: `${getBasketTotal(basket)*100}`,

            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET"
            })

            history.replace("/orders");
        })

    }

    
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(
                        <Link to="/checkout">{basket.length} items</Link> 
                    )
                </h1>

                <div className="payment_section">
                <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 Kolkata</p>
                        <p>India 1100XX</p>

                        <p>Page after this work only in ;ocal, becaus ei havn't opted for Blaze plan of firebase.</p>
                    </div>
                </div>


                {/* Payment Continer- Review Item */}

                
                <div className="payment_section">
                <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                 <div className="payment_items">
                     {basket.map(item=>(
                         <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}/>
                     ))}
                     </div>   
                </div>


                {/* Payment Continer- Payment Method*/}    

                
                <div className="payment_section">
                    <div className="payment_title">
                            <h3>Payment Method</h3>
                        </div>
                    <div className="payment_detail">
                        <form onClick={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                            <div className="payment_priceContainer">
                            <CurrencyFormat 
                    renderText={(value)=>(
                    <h3>Order Total: {value}</h3>

                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    />
                    {/* <button disabled={processing|| disabled|| succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button> */}
                            </div>

                        </form>

                    </div>
                    </div>


            </div>
            
        </div>
    )
}

export default Payment
