
import { NavLink } from "react-router-dom";

const DogCard = ({ dog }) => {

    console.log(dog);
    // respomsive
    // respomsive
    const imageUrl = dog.reference_image_id
        ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        : "https://via.placeholder.com/150";

    return (
        <NavLink to={`/dog/${dog.id}`}>
            <div className="p-3 text-center rounded-2xl inset-shadow-sm inset-shadow-indigo-500 ...">
                <h1 className=" font-semibold text-[3vw] lg:text-[1.4vw] md:text-[2vw] mb-4 text-blue-100 heading">{(dog.name).slice(0, 18)}...</h1>
                <img src={imageUrl} alt={dog.name} loading="lazy" className="md:w-[15vw] md:h-[10vw] h-[28vw] w-[35vw]  brightness-115 contrast-125  rounded-2xl inset-shadow-sm inset-shadow-indigo-500/50 ... img" />
                <div className="flex justify-between items-center mt-4 px-3">
                    <div className="grid place-content-center">
                        <h3>
                            <img src="/images/height.png" alt="invailed" loading="lazy" className="h-[6vw] w-[6vw] ml-1 md:h-[3vw] md:w-[3vw] img2" />
                        </h3>
                        <h3 className="text-[1.2rem] md:text-[1.6vw] font-semibold text-amber-700 height">{dog.height.imperial}</h3>
                    </div>
                    <div>
                        <h3>
                            <img src="/images/weight.png" alt="invailed" loading="lazy" className="h-[6vw] w-[6vw] ml-1  md:h-[3vw] md:w-[3vw] img2" />
                        </h3>
                        <h3 className="text-[1.2rem] md:text-[1.6vw] font-semibold text-amber-700 weight">{dog.weight.metric}</h3>
                    </div>
                </div>
            </div >
        </NavLink>
    );
};

export default DogCard;
