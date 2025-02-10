import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { completeGetDogs } from "../API/api";
import DogCard from "./DogCard";
import { IoIosArrowBack } from "react-icons/io";

const DogList = () => {
    const [allDogs, setAllDogs] = useState([]); // Stores full API dataset (172 dogs)
    const [displayedDogs, setDisplayedDogs] = useState([]); // Controls visible dogs
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false); // Controls scroll loader

    // Fetch full dog data (only once)
    useEffect(() => {
        const fetchCompleteDogApi = async () => {
            try {
                setLoading(true);
                const response = await completeGetDogs();
                setAllDogs(response); // Store full dataset (172 dogs)
                setDisplayedDogs(response.slice(0, page * 10)); // Load based on page
            } catch (error) {
                console.error("Error fetching all dogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompleteDogApi();
    }, []);

    // Fetch paginated dogs (infinite scroll)
    const fetchMoreDogs = () => {
        if (displayedDogs.length >= allDogs.length) return;

        setFetchingMore(true);
        setTimeout(() => {
            setDisplayedDogs(allDogs.slice(0, (page + 1) * 10));
            setPage((prev) => prev + 1);
            setFetchingMore(false);
        }, 1500);
    };

    // Search functionality (filters full dataset)
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setDisplayedDogs(allDogs.slice(0, page * 10)); // Show paginated results if no search
        } else {
            const filtered = allDogs.filter((dog) =>
                dog.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedDogs(filtered); // Show only search results
        }
    }, [searchTerm, allDogs, page]);

    return (
        <section className="w-full min-h-screen flex flex-col items-center p-4 bg-neutral-800">
            {loading ? (
                // Main Loading (Initial Fetch)
                <div class="flex items-center justify-center min-h-screen bg-neutral-800" >
                    <div class="flex space-x-2">
                        <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg"></div>
                        <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.2s]"></div>
                        <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.4s]"></div>
                        <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.6s]"></div>
                    </div>;
                </div>
            ) : displayedDogs.length === 0 ? (
                // ✅ Show "No Dogs Found" Message If Search Returns No Results
                <div className="w-full h-screen flex flex-col justify-center items-center text-white">
                    <h2 className="text-3xl font-bold text-red-500">No Dogs Found</h2>
                    <p className="text-gray-400 mt-2">Try a different search term</p>

                    <button
                        onClick={() => setSearchTerm("")}
                        className="flex justify-center items-center mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        <span className="font-extrabold text-2xl"><IoIosArrowBack /></span><span className="font-bold text-2xl">Back</span>
                    </button>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={displayedDogs.length}
                    next={fetchMoreDogs}
                    hasMore={displayedDogs.length < allDogs.length && searchTerm === ""}
                >
                            <h1 className="md:text-4xl text-2xl text-emerald-500 text-center font-extrabold">
                        Find Your Perfect Dog Companion
                    </h1>
                    <div className="w-full flex flex-col items-center px-4 bg-neutral-800">
                        <input
                            type="text"
                                    placeholder="Search for Your Ideal Dog"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-5 mb-4 p-2 w-2/3 text-amber-50 rounded-full inset-shadow-sm inset-shadow-indigo-300 "
                        />
                    </div>

                    <div className="dog-list grid place-items-center lg:grid-cols-5 md:grid-cols-4 grid-cols-3 lg:gap-5 md:gap-5 gap-3 mt-9 px-2 respomsive">
                        {displayedDogs.map((dog) => (
                            <DogCard key={dog.id} dog={dog} />
                        ))}
                    </div>

                    {/* ✅ Show Loader While Fetching More Data */}
                    {fetchingMore && (
                        <div class="flex items-center justify-center h-30 bg-neutral-800" >
                            <div class="flex space-x-2">
                                <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg"></div>
                                <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.2s]"></div>
                                <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.4s]"></div>
                                <div className="md:w-6 md:h-6 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.6s]"></div>
                            </div>;
                        </div>
                    )}
                </InfiniteScroll>
            )}
        </section>
    );
};

export default DogList;
