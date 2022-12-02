import "./App.css";
import ResponsiveAppBar from "./components/Appbar";
import Search from "./components/Search";
import Steps from "./components/Steps";

import { useState, useEffect } from "react";
import Medicine from "./components/Medicine";
import { CircularProgress } from "@mui/material";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "./firebase";
import AddressForm from "./components/AddressForm";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import Review from "./components/Review";
import Confirmation from "./components/Confirmation";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Orders from "./components/Orders";

import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [runServer, setRunServer] = useState(false);
  const [medicine, setMedicine] = useState(null);
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState({});

  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    !user &&
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const uid = result.user.uid;
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("uid", JSON.stringify(uid));
          console.log(result.user, credential);
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .where("uid", "==", localStorage.getItem("uid"))
      .onSnapshot((serverUpdate) => {
        let ordersArray = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        setOrders(ordersArray);
        console.log(ordersArray);
      }); // whenever the notes collection changes, function inside onSnapshot will be called
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("uid");
    setOrders(null);
  };

  const submitName = () => {
    setMedicine({});
    setRunServer(true);
  };

  useEffect(() => {
    // get from server
    if (runServer && name) {
      console.log("fetching medicine");
      fetch("http://localhost:4000/medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMedicine(data);
        })
        .catch((err) => console.log(err, "Errooor"));
    }

    if (medicine) {
      setRunServer(false);
    }
    console.log(medicine);
  }, [runServer, medicine, name]);

  const handleBuyNow = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    user && navigate("/address");
  };

  const handleOrders = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    user && navigate("/orders");
  };

  const addressSubmit = (address) => {
    console.log(order);
    setOrder({ ...order, address });
    navigate("/checkout");
  };

  const cancelOrder = async (id) => {
    await deleteDoc(doc(db, "orders", id));
  };

  const handlePlaceOrder = async () => {
    const id = uuidv4();
    console.log(order);
    const orderObj = {
      ...order,
      uid: localStorage.getItem("uid"),
      composition: medicine.composition,
      modeOfPayment: "COD",
      price: (medicine.price * 3) / 5,
      date: new Date().toLocaleString(),
      image: medicine.image,
      id: id,
    };
    await setDoc(doc(db, "orders", id), orderObj);
    console.log(orderObj);

    navigate("/checkout/success");
  };

  // Razorpay start

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:4000/payment/orders", {
      amount: medicine.price * 60,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_bVL2NuCWPjFWvy", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "GenMed",
      description: "Purchasing Medicine",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:4000/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "GenMed",
        email: "payments@genmed.com",
        contact: "9999999999",
      },
      notes: {
        address: "GenMed Pvt Ltd",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    handlePlaceOrder();
  }

  // Razorpay end

  return (
    <div className="App">
      <Box>
        <ResponsiveAppBar login={signInWithGoogle} user={user} logout={logout} handleOrders={handleOrders} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search name={name} setName={setName} submitName={submitName} />
                {medicine && Object.keys(medicine).length && <Medicine medicine={medicine} handleBuyNow={handleBuyNow} />}
                {medicine && !Object.keys(medicine).length && <CircularProgress sx={{ marginTop: "3vh" }} />}
                <Steps />
              </>
            }
          />
          <Route path="/address" element={<AddressForm next={addressSubmit} setOrder={setOrder} />} />
          <Route path="/checkout" element={<Review medicine={medicine} handlePlaceOrder={handlePlaceOrder} setOrder={setOrder} displayRazorpay={displayRazorpay} />} />
          <Route path="/checkout/success" element={<Confirmation user={user} order={order} />} />
          <Route path="/orders" element={orders && <Orders products={orders} cancelOrder={cancelOrder} />} />
        </Routes>
      </Box>
    </div>
  );
};

export default App;
