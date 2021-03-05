import React,{ useState, useEffect} from 'react'
import { db } from './firebase';
import "./Orders.css"
import { useStateValue } from './StateProvider';

function Orders() {
    const [{basket,user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if(user){
        db
        .collection("users")
        .doc("user?.uid")
        .collection("users")
        .onSnapshot(snapshot=>(
            setOrders(snapshot.docs.map(doc=>({
                data: doc.data()
            })))
        ))
        }      
        else{
            setOrders([])
        }

    }, [user])
    return (
        <div className="orders">
            <h1>Your Orders</h1>
           <p>This page is not showing info due to country-specific issues. So cheers!</p>
        </div>
    )
}

export default Orders
