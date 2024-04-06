import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ComponentToPrint } from "../components/Print";
import { useReactToPrint } from "react-to-print";

const PosPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [invoiceValue, setInvoiceValue] = useState({
    logo: null,
    companyName: "EVERSHINE COMPUTER SYSTEM",
    shopName: "PROPERTY PLAZA",
    shopLocation:
      "46,Property Plaza (1st Floore), SUITE#34, Shahid Sangbadik Road",
    shopAddress: "Mouchak, Malibag, Dhaka-1217, Bangladesh",
    shopContract: "Phone: +8801944332200,01675409090 Email:everstbd@gmail.com",
    //=========customer==========

    customerName: "Zahurul Islam Joy",
    CustomerID: "01",
    CustomerMobile: "01710815467",
    customerAddress: "Mouchak, Malibag, Dhaka-1217",

    //=========customer==========
    invoiceNo: "12",
    salerName: "saler name",
    employerId: "01",
  });

  const fetchProduct = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.get("http://localhost:3001/products");
      setProducts(data);
      setIsloading(false);
    } catch (error) {
      console.log("cant fetch data");
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((i) => {
      newTotalAmount = newTotalAmount + parseInt(i.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  //================handle  cart==================
  const handleCart = async (p) => {
    try {
      let existingProduct = await cart.find((i) => {
        return i.id === p.id;
      });

      if (existingProduct) {
        let newCart = [];
        let newItem;

        cart.forEach((cartItem) => {
          if (cartItem.id === p.id) {
            newItem = {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalAmount: cartItem.price * (cartItem.quantity + 1),
            };
            newCart.push(newItem);
          } else {
            newCart.push(cartItem);
          }
        });

        await setCart(newCart);
        await localStorage.setItem("cart", JSON.stringify(newCart));
        toast.success(` ${p.name} Added to cart`);
      } else {
        let addingProduct = {
          ...p,
          quantity: 1,
          totalAmount: p.price,
        };

        await setCart([...cart, addingProduct]);
        await localStorage.setItem(
          "cart",
          JSON.stringify([...cart, addingProduct])
        );
        toast.success(` ${p.name} Added to cart`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(`There was an error while adding cart`);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("cart");

    if (data) {
      const parseData = JSON.parse(data);
      setCart(parseData);
      console.log(parseData);
    }
  }, []);

  //====================handleRemove================

  //removeItem
  const handleRemove = async (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //============== handlePay==================
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="main_div">
        <div className="card-div">
          {isLoading ? (
            <h2 className="text-center red">Loading...</h2>
          ) : (
            <>
              {products.map((p) => {
                return (
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      height: "21rem",
                      margin: "10px",
                    }}
                    key={p.id}
                  >
                    <img
                      className="card-img-top"
                      src={p.image}
                      alt="Card image cap"
                      height={"150px"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Id:{p.id}</h5>
                      <p className="card-text">Name:{p.name}</p>
                      <p>Price:{p.price}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCart(p)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="sell_div">
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
              invoiceValue={invoiceValue}
            />
          </div>
          <div className="table-responsive table-dark">
            <table className="table">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((cartproduct, key) => (
                      <tr key={key}>
                        <td>{cartproduct.id}</td>
                        <td>{cartproduct.name}</td>
                        <td>{cartproduct.price}</td>
                        <td>{cartproduct.quantity}</td>
                        <td>{cartproduct.totalAmount}</td>

                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemove(cartproduct.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : `${(<h2>No Item In Cart</h2>)}`}
              </tbody>
            </table>
            <h4 className="text-center">Total Amount : {totalAmount}</h4>
          </div>
          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                <button className="btn btn-primary" onClick={handlePrint}>
                  Pay Now
                </button>
              </div>
            ) : (
              "Please Add product to cart"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosPage;
