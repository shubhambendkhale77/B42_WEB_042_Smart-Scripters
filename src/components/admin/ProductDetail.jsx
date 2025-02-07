import { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../assets/Auth/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { getAllProduct, getAllProductFunction } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProducts = useCallback(() => {
    getAllProductFunction();
  }, [getAllProductFunction]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log("ProductDetail component rendered");
  }, []);

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product Deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-xl text-pink-300 font-bold">All Products</h1>
        <Link to={"/addproduct"}>
          <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">
            Add Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <tbody>
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
              <th>Action</th>
            </tr>

            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageUrl } = item;
              return (
                <tr key={id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img className="w-20" src={productImageUrl} alt="" />
                  </td>
                  <td>{title}</td>
                  <td>₹{price}</td>
                  <td>{category}</td>
                  <td>{date}</td>
                  <td onClick={() => navigate(`/updateproduct/${id}`)} className="cursor-pointer text-green-500">
                    Edit
                  </td>
                  <td onClick={() => deleteProduct(id)} className="cursor-pointer text-red-500">
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
