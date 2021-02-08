import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return fields.name !== "" && isCardComplete;
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({
      name: fields.name,
    });

    setIsProcessing(false);

    onSubmit({ token, error });
  }

  return (
    <div className="col-6 payment">
      <Form
        className="BillingForm"
        className="p-5"
        onSubmit={handleSubmitClick}
      >
        <h4 className="billingheader">Donate a dollar to help with hosting</h4>
        <hr />
        <Form.Group size="lg" controlId="name">
          <Form.Label className="whitetext">Name on Card</Form.Label>

          <Form.Control
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Label className="whitetext">Credit Card Info</Form.Label>
        <CardElement
          className="card-field"
          onChange={(e) => setIsCardComplete(e.complete)}
          style={{
            base: {
              color: "#303238",
              backgroundColor: "#FFFFFF",
              fontSize: "28px",
              fontFamily: '"Open Sans", sans-serif',
              fontSmoothing: "antialiased",
              "::placeholder": {
                color: "#CFD7DF",
              },
            },
            invalid: {
              color: "#e5424d",
              ":focus": {
                color: "#303238",
              },
            },
          }}></CardElement>
        <br></br>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Purchase
        </LoaderButton>
      </Form>
    </div>
  );
}

export default injectStripe(BillingForm);
