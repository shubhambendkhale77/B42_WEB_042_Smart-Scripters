import { useNavigate } from "react-router-dom"; 

// category 
const category = [
    { image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png', name: 'fashion' },
    { image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png', name: 'shirt' },
    { image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png', name: 'jacket' },
    { image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png', name: 'mobile' },
    { image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png', name: 'laptop' },
    { image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png', name: 'shoes' },
    { image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png', name: 'home' },
    { image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png', name: 'books' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2696/2696195.png', name: 'electronics' },
    { image: 'https://cdn-icons-png.flaticon.com/256/3081/3081648.png', name: 'grocery' },
    { image: 'https://cdn-icons-png.flaticon.com/256/2921/2921822.png', name: 'kitchen' },
    { image: 'https://cdn-icons-png.flaticon.com/256/9915/9915152.png', name: 'beauty' },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* Scrollable Category Section */}
                <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {/* Render Categories */}
                        {category.map((item, index) => (
                            <div key={index} className="px-3 lg:px-10">
                                <div 
                                    onClick={() => navigate(`/category/${item.name}`)}
                                    className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 flex justify-center items-center"
                                >
                                    <img src={item.image} alt={item.name} className="w-10 h-10" />
                                </div>
                                <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">
                                    {item.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hide Scrollbar Style */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar { display: none;}" }} />
        </div>
    );
}

export default Category;
