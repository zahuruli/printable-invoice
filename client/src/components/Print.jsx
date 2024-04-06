import React from "react";
import "./print.css";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount, invoiceValue } = props;
  const date = new Date();

  //date:
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  return (
    <div ref={ref} className="p-5">
      <div className="invoice">
        <div className="invoice_heading">
          <div className="heading_left">
            <h2>
              {" "}
              <span className="green">ever</span> shine
            </h2>
            <h5>Technology Solution</h5>
          </div>
          <div className="heading_right">
            <div className="property">
              <h3>{invoiceValue.companyName}</h3>
              <h3>{invoiceValue.shopName}</h3>
              <h5>{invoiceValue.shopLocation} </h5>
              <h5>{invoiceValue.shopAddress}</h5>
              <h5>{invoiceValue.shopContract}</h5>
            </div>
          </div>
        </div>
        <hr className="heading_hr" />

        <div className="invoice_body">
          <h2 className="text-center m-3 text-success">Invoice/Bill</h2>
          <div className="customer">
            <div className="customer_left">
              <h3>Name: {invoiceValue.customerName}</h3>
              <h3>Customer ID: {invoiceValue.CustomerID}</h3>
              <h3>Mobile No: {invoiceValue.CustomerMobile}</h3>
              <h3>{invoiceValue.customerAddress}</h3>
            </div>
            <div className="customer_right">
              <h3>Invoice No: {invoiceValue.invoiceNo}</h3>
              <h3>Date: {currentDate}</h3>
              <h3>Sale By: {invoiceValue.salerName}</h3>
              <h3>Employer Id: {invoiceValue.employerId}</h3>
            </div>
          </div>
          <div className="table-responsive  mt-5">
            <table className="table ">
              <thead>
                <tr>
                  <td>Product Code</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((cartproduct, key) => (
                    <tr key={key}>
                      <td>{cartproduct.id}</td>
                      <td>{cartproduct.name}</td>
                      <td>{cartproduct.price}</td>
                      <td>{cartproduct.quantity}</td>
                      <td>{cartproduct.totalAmount}</td>
                    </tr>
                  ))}
                <tr>
                  {" "}
                  <h3 className="tAmount bm-3">
                    Total Amount : ${totalAmount}
                  </h3>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="invoice_footer">
          <div className="authorize">
            <div className="authorize_left">
              <hr className="authorize_hr" />
              <h5>Authorize Signature & Company Stamp</h5>
            </div>
            <div className="authorize_right">
              <hr className="authorize_hr" />
              <h5>Receive with good condition by</h5>
            </div>
          </div>
          <div className="condition">
            <h3>
              1.Warrenty will be void if Stricker removed, Physically Damage &
              Burn case
            </h3>
            <h3>2.Vat & Tax not Includede</h3>
          </div>
        </div>
      </div>
    </div>
  );
});

//=============================================================================================
{
}
