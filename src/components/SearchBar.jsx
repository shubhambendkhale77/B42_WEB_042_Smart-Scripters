import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/useAuth";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const context = useContext(AuthContext);
    const { getAllProduct } = context;

    // Search State
    const [search, setSearch] = useState("");

    // Filter Search Data
    const filterSearchData = getAllProduct
        .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 8);

    const navigate = useNavigate();

    return (
        <div className="relative w-96 lg:w-96 md:w-96 mx-auto">
            {/* Search Input with Icon */}
            <div className="relative border border-gray-300 rounded-lg focus-within:border-black transition duration-300">
                {/* Search Icon */}
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search here for exciting products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent placeholder-black rounded-lg px-10 py-2 w-full outline-none text-black"
                />
            </div>

            {/* Search Drop-down */}
            {search && (
                <div className="absolute bg-gray-200 w-full z-50 my-1 rounded-lg px-2 py-2">
                    {filterSearchData.length > 0 ? (
                        filterSearchData.map((item, index) => (
                            <div
                                key={index}
                                className="py-2 px-2 cursor-pointer flex items-center gap-2 hover:bg-gray-300 rounded-md"
                                onClick={() => navigate(`/productinfo/${item.id}`)}
                            >
                                <img className="w-10" src={item.productImageUrl} alt="" />
                                {item.title}
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center">
                            <img
                                className="w-20"
                                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                                alt="No Results"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
