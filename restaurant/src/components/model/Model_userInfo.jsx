/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiCreditCard, BiMoney } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearCarte } from "../../redux/slices/CarteSlice";
// react bom 
import { useNavigate } from "react-router-dom";

const Model_userInfo = ({ onClose }) => {
  const cartItems = useSelector((state) => state.carte.items) || [];
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formatted = new Intl.DateTimeFormat("en-IN", options).format(date)
  const navigate = useNavigate();
  
  const [menu, setMenu] = useState({
    name: "",
    mobilNo: "",
    table: "",
    category: "",
    paymentType: "",
    date: formatted,
    items: cartItems
  });

  const dispatch = useDispatch();
  const clearAllData = () => {
    if (cartItems.length === 0) {
      console.log("cart is empty");
      return;
    }
    dispatch(clearCarte());
    onClose();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    clearAllData();
    navigate("/successful");
  };

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 animate-fade-up animate-once animate-duration-1000  animate-ease-linear animate-alternate animate-fill-forwards
    ">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-y-auto max-h-[95vh] p-6">
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Create Product</h2>
            <RxCross2
              className="text-3xl cursor-pointer hover:bg-gray-100 p-1 rounded-full"
              onClick={onClose}
            />
          </div>

          {/* Input Fields */}
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {[
              { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
              { label: "Mobil No", name: "mobilNo", type: "number", placeholder: "Enter your mobile number" },
              { label: "Table", name: "table", type: "text", placeholder: "Enter Product price" },

            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xl mb-1 font-medium text-gray-700">{field.label}</label>
                {
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={menu[field.name] || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2  text-gray-900 bg-gray-50 border-gray-300 outline-none"
                    required
                  />
                }
              </div>
            ))}

            {/* Category Select */}
            {/* <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={menu.category || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm bg-gray-50 border-gray-300 text-gray-900 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="fried rice">Fried Rice</option>
                <option value="Biryani">Biryani</option>
                <option value="side-dish">Side Dish</option>
                <option value="roll">Roll</option>
                <option value="roti">Roti</option>
                <option value="snacks">Snacks</option>
                <option value="pizza & burger">Pizza & Burger</option>
                <option value="drinks">Drinks</option>
                <option value="coffee">Coffee</option>
                <option value="ice cream">Ice Cream</option>
              </select>
            </div> */}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6 gap-3">
            <button
              type="submit"
              className="w-full py-5 bg-blue-600 text-white rounded-lg flex justify-center items-center text-xl hover:bg-blue-700 gap-2"
            >
              <BiMoney />
              CASH
            </button>
            <button
              type="submit"
              className="w-full py-5 bg-[#0fa33e] text-white rounded-lg flex justify-center items-center text-xl hover:bg-[#588967] gap-2"
              onClick={submitHandler}
            >
              <BiCreditCard />
              ONLINE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model_userInfo;
