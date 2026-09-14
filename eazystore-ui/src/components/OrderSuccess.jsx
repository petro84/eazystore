import { Link } from "react-router-dom";

import PageTitle from "./PageTitle";
import orderSuccessImg from "../assets/order-confirmed.png";

export default function OrderSuccess() {
  return (
    <div className="min-h-213 py-12 sm:pt-20 font-primary bg-normalbg dark:bg-darkbg">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Hurray! Order placed successfully." />
      </div>
      <div className="text-center text-lg text-gray-600 dark:text-lighter flex flex-col items-center">
        <p className="max-w-xl text-center px-4 mx-auto leading-6 mb-6">
          You order has been placed successfully. the items in your order will
          be delivered within 48 hours.
        </p>
        <img
          src={orderSuccessImg}
          alt="Order Success"
          className="w-full max-w-112.5 mx-auto mb-8"
        />
        <Link
          to="/home"
          className="px-6 py-3 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
        >
          Keep Shopping
        </Link>
      </div>
    </div>
  );
}
