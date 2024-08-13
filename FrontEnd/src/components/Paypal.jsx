import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { addOther } from "../redux/otherSlice";
import { useDispatch } from "react-redux";

// This value is from the props in the UI
const style = { layout: "vertical" };

function onApprove(data) {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      // Your code here after capture the order
    });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  console.log(payload);
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency,
      },
    });
  }, [currency, amount, payload]);
  const dispatchs = useDispatch();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                    currency_code: currency,
                  },
                },
              ],
            })
            .then((orderID) => {
              return orderID;
            });
        }}
        onApprove={(data, actions) => {
          actions.order.capture().then(async (details) => {
            // This function shows a transaction success message to your buyer.
            dispatchs(
              await addOther({
                ...payload,
              })
            );
            alert("Chúc mừng bạn đã thanh toán thành công" + details.payer.name.given_name);
            localStorage.clear();

          });
        }}
      />
    </>
  );
};

export default function Paypal({ amount, payload }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
