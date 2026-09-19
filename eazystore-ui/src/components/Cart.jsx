import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated, selectUser } from "../store/auth-slice";
import { selectCartItems } from "../store/cart-slice";
import CartTable from "./CartTable";
import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/emptycart.png";

export default function Cart() {
  const cart = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  const isAddressInvalid = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;

    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [user, isAuthenticated]);

  return (
    <div className="min-h-213 py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            {isAddressInvalid && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please update your address in your profile to proceed to
                checkout.
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              <Link
                to="/home"
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              <Link
                to={isAddressInvalid ? "#" : "/checkout"}
                className={`py-2 px-4 text-xl font-semibold rounded-sm flex justify-center items-center transition ${isAddressInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"} text-white dark:text-black`}
                onClick={(e) => {
                  if (isAddressInvalid) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-xl px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping.
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-75 max-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              to="/home"
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
