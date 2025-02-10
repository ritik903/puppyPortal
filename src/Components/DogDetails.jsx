import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDogDetails } from "../API/api";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const DogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dog, setDog] = useState(null);

    useEffect(() => {
        const fetchDogDetails = async () => {
            const data = await getDogDetails(id);
            setDog(data);
        };
        fetchDogDetails();
    }, [id]);

    if (!dog) return <div class="flex items-center justify-center min-h-screen bg-neutral-800" >
        <div class="flex space-x-2">
            <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg"></div>
            <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.2s]"></div>
            <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.4s]"></div>
            <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.6s]"></div>
        </div>;
    </div>;


    const imageUrl = dog.reference_image_id
        ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        : "https://via.placeholder.com/150";


    // whatsapp massage 
    const sendWhatsAppMessage = () => {
        const phone = "919056659781"; // Replace with your number
        const message = "Hello, I want to know more! in call this number";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };


    return (
        <div className="dog-details w-full h-screen   px-3 flex justify-center items-center bg-neutral-800 ">
            <button
                className="absolute top-5 left-5 flex justify-center items-center bg-emerald-500 text-white font-extrabold md:px-4 md:py-2 px-2 py-1 rounded-lg shadow-md hover:bg-emerald-600 transition-all"
                onClick={() => navigate(-1)}
            >
                <span className="font-bold md:text-2xl text-1xl"><IoIosArrowBack /></span><span className="font-bold md:text-2xl text-1xl">Back</span>
            </button>

            <div className=" grid md:grid-cols-2 grid-cols-1 place-items-center w-5xl m-auto py-5">
                <div>
                    <img src={imageUrl} alt={dog.name} className="md:h-90 md:w-90 h-[50vw] w-[50vw] rounded-3xl brightness-115 contrast-135 inset-shadow-md inset-shadow-indigo-1000/50 " />
                </div>

                <div className="text-center">
                    <p className="md:text-3xl text-green-400 mb-3">Breed Group: {dog.breed_group || "Unknown"}</p>
                    <h2 className="md:text-4xl text-2xl text-yellow-400 font-extrabold mb-0.5">{dog.name}</h2>
                    <p className="md:text-2xl text-amber-50 from-neutral-50 mb-1">Temperament: {dog.temperament || "Unknown"}</p>
                    <div className="grid grid-cols-4 place gap-2 mt-4 card">
                        <div className="flex flex-col justify-center items-center gap-2 h-20 rounded-2xl p-2 inset-shadow-sm inset-shadow-indigo-500 ...">
                            <p className="md:text-1xl font-bold text-amber-700 text-center">Height</p>
                            <p className="md:text-1xl font-bold text-amber-50 text-center">{dog.height?.metric} cm</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 h-20 rounded-2xl p-2 inset-shadow-sm inset-shadow-indigo-500 ...">
                            <p className="md:text-1xl font-bold text-amber-700 text-center">Weight</p>
                            <p className="md:text-1xl font-bold text-amber-50 text-center">{dog.weight?.metric} kg</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 h-20 rounded-2xl p-2 inset-shadow-sm inset-shadow-indigo-500 ...">
                            <p className="md:text-1xl font-bold text-amber-700 text-center">Life Span</p>
                            <p className="md:text-1xl font-bold text-amber-50 text-center">{dog.life_span}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 h-20 rounded-2xl p-2 inset-shadow-sm inset-shadow-indigo-500 ...">
                            <p className="md:text-1xl font-bold text-amber-700 text-center">Bred For</p>
                            <p className="md:text-1xl font-bold text-amber-50 text-center">{dog.bred_for || "Unknown"}</p>
                        </div>
                    </div>
                    <hr className="w-auto mt-5 h-1 bg-amber-300" />
                    <div className="flex gap-8 text-4xl mt-6 justify-center items-center">
                        <span className="bg-gradient-to-r from-green-600 to-gray-900 rounded-xl md:p-2 p-1 text-blue-100 cursor-pointer"><a href="https://www.linkedin.com/in/ritik-choudhary-a29480319" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a></span>
                        <span className="bg-gradient-to-r from-green-600 to-gray-900 rounded-xl md:p-2 p-1 text-blue-100 cursor-pointer"><a href="http://" target="_blank" rel="noopener noreferrer" onClick={sendWhatsAppMessage}><FaWhatsappSquare /></a></span>
                        <span className="bg-gradient-to-r from-green-600 to-gray-900 rounded-xl md:p-2 p-1 text-blue-100 cursor-pointer"><a href="tel:+919056659781" target="_blank" rel="noopener noreferrer"><FaPhoneFlip /></a></span>
                        <span className="bg-gradient-to-r from-green-600 to-gray-900 rounded-xl md:p-2 p-1 text-blue-100 cursor-pointer"><a href="https://www.instagram.com/yoboy_ritik?utm_source=qr&igsh=Nm12cDdhcGE5bnBY" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a></span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DogDetails;
