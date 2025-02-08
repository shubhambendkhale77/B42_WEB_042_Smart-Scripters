import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const BuyNowModal = ({addressInfo,setAddressInfo,buyNowFunction}) => {

  const [open, setOpen] = useState(false);
  const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("User is logged out");
  }
});

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg
            hover:bg-indigo-700 transition-colors
            flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Proceed to Checkout</span>
      </Button>

      <Dialog open={open} handler={handleOpen} className=" bg-pink-50">
        <DialogBody className="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) => setAddressInfo({...addressInfo, name:e.target.value})}
              placeholder="Enter your name"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) => setAddressInfo({...addressInfo, address:e.target.value})}
              placeholder="Enter your address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) => setAddressInfo({...addressInfo, pincode:e.target.value})}
              placeholder="Enter your pincode"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) => setAddressInfo({...addressInfo, mobileNumber:e.target.value})}
              placeholder="Enter your mobileNumber"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={()=>{
                buyNowFunction();
                handleOpen();
              }}
              className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
