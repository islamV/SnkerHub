import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const cart = useSelector((state) => state.cart);
    // console.log(product.id);
  // const img = "https://generalapi.test/storage/"+ product.image;
  const img =product.image;
  // console.log(img) ;

  const price = product.price;
  const desc = product.description;
  const id = product.id;

  const dispatch = useDispatch();

  const add = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const remove = (itemIdx) => {
    dispatch(removeFromCart(itemIdx));
    toast.error("Removed item from cart");
  };

  return (
    <div>
      <div className="w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-slate-50 dark:bg-[#1f1b24] dark:hover:bg-[#121015] dark:text-white dark:outline-none dark:border-none border border-slate-100 outline outline-slate-100  hover:shadow-2xl relative">
        <div className="flex flex-col gap-6 ">
          <div>
            <img
              src={img}
              width={200}
              height={200}
              alt="product"
              className="mx-auto"
            />
            <Link to={`/preview/${id}`}>
              <button className="absolute p-1 text-xs text-white rounded-md bg-slate-600 dark:bg-slate-800 dark:font-semibold top-2 right-2 animate-pulse">
                preview
              </button>
            </Link>
          </div>

          <p className="text-base font-medium max-h-[96px] overflow-y-hidden">
            {desc.split(" ").slice(0, 20).join(" ") + "..."}
          </p>

          <div className="flex items-center justify-between">
            {cart.some((item) => item.id === product.id) ? (
              <button
                onClick={() => remove(product.id)}
                className="p-2 text-sm text-white bg-red-400 rounded-md "
              >
                Remove Item
              </button>
            ) : (
              <button
                onClick={add}
                className="p-2 text-sm text-white bg-black rounded-md dark:bg-slate-800 dark:hover:bg-black "
              >
                Add to Cart
              </button>
            )}
            <span className="text-xl font-semibold">₹ {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
