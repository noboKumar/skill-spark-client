import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { axiosPublic } from "../../API/utils";
import "./checkOut.css";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const CheckOutForm = ({ price, setIsOpen, id, classDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const { mutateAsync: increaseEnrollment } = useMutation({
    mutationKey: ["increase-enrollment"],
    mutationFn: async () => {
      const { data } = await axiosPublic.patch(
        `/accepted-classes/enroll/${id}`
      );
      return data;
    },
  });

  const { mutateAsync: enrollmentHistory } = useMutation({
    mutationKey: ["enrollment-history"],
    mutationFn: async (enrollmentData) => {
      const { data } = await axiosPublic.post("/enrollments", enrollmentData);
      return data;
    },
    onSuccess: () => {
      toast.success("Enrollment successful!");
    },
    onError: () => {
      toast.error("Enrollment failed.");
    },
  });

  //   step-1
  useEffect(() => {
    const createPaymentIntent = async () => {
      const { data } = await axiosPublic.post("/create-payment-intent", {
        amount: price,
      });
      setClientSecret(data.clientSecret);
    };
    createPaymentIntent();
  }, [price]);

  //   step-2
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      toast.success("Payment successful!");
      const { _id, ...classData } = classDetails;

      // send payment info to server
      const enrollmentData = {
        ...classData,
        classId: _id,
        transactionId,
        student_email: user?.email,
        student_name: user?.displayName,
        student_image: user?.photoURL,
        purchased_at: new Date().toISOString(),
      };

      try {
        await enrollmentHistory(enrollmentData);
        await increaseEnrollment();
        setIsOpen(false);
        navigate("/dashboard/my-enroll-class");
      } catch (err) {
        console.error("Post-payment error:", err);
        toast.error("Something went wrong. Please contact support.");
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-10">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#111827",
                "::placeholder": {
                  color: "#9ca3af",
                },
              },
              invalid: {
                color: "#dc2626",
                iconColor: "#dc2626",
              },
            },
            classes: {
              base: "StripeElement",
              focus: "StripeElement--focus",
              invalid: "StripeElement--invalid",
              webkitAutofill: "StripeElement--webkit-autofill",
            },
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckOutForm;
