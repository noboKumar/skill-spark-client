import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ isOpen, setIsOpen, price, title }) => {
  function close() {
    setIsOpen(false);
  }
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-base-100 p-6 shadow-xl">
            <DialogTitle
              as="h1"
              className="text-2xl font-semibold mb-4 text-primary"
            >
              Complete Your Payment
            </DialogTitle>
            <h1 className="text-xl font-semibold mb-4">{title}</h1>
            <h1 className="text-lg font-semibold mb-4">Price: ${price}</h1>

            <Elements stripe={stripePromise}>
              <CheckOutForm setIsOpen={setIsOpen} price={price}></CheckOutForm>
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
