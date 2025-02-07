import { useContext, useEffect} from "react";
import { AuthContext } from "../../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../assets/Auth/firebase";
import { deleteDoc, doc } from "firebase/firestore";


const ProductDetail = () => {
    const { getAllProduct, getAllProductFunction } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        getAllProductFunction();
    }, [getAllProductFunction]);
    
        useEffect(() => {
          console.log("ProductDetail component rendered");
        }, []);

    const deleteProduct = async (id) => {
        // setLoading(true)
        try {
            await deleteDoc(doc(db, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            // setLoading(false)
        }
    }

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Product</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link>
            </div>

            {/* Loading */}
            <div className="flex justify-center relative top-20">
               
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Price</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Action</th>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={id} className="text-pink-300">
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        <div className="flex justify-center">
                                            <img className="w-20" src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                        {date}
                                    </td>
                                    <td
                                    onClick={()=>navigate(`/updateproduct/${id}`)}
                                    className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-green-500 cursor-pointer">
                                        Edit
                                    </td>
                                    <td 
                                    onClick={()=>deleteProduct(id)}
                                    className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer">
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
