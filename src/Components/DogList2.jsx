import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { completeGetDogs } from "../API/api";
import DogCard from "./DogCard";

const DogList = () => {
    const [allDogs, setAllDogs] = useState([]); // Stores full API dataset (172 dogs)
    const [displayedDogs, setDisplayedDogs] = useState([]); // Controls visible dogs
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false); // NEW: Controls scroll loader

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
    useEffect(() => {
        if (page > 1) {
            setFetchingMore(true); // Show loader when fetching more data
            setTimeout(() => {
                setDisplayedDogs(allDogs.slice(0, page * 10));
                setFetchingMore(false); // Hide loader after data loads
            }, 1000); // Simulate API delay for better UX
        }
    }, [page, allDogs]);

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
        <section className="w-full h-full flex flex-col items-center px-4 bg-neutral-800">
            <input
                type="text"
                placeholder="Search for a dog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-5 mb-4 p-2 w-2/3 text-black rounded-lg"
            />

            {loading ? (
                // Main Loading (Initial Fetch)
                <div className="flex items-center justify-center h-screen">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.2s]"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.4s]"></div>
                    </div>
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={displayedDogs.length}
                    next={() => setPage((prev) => prev + 1)}
                    hasMore={displayedDogs.length < allDogs.length && searchTerm === ""}
                    loader={
                        fetchingMore && ( // Only show when fetching more data
                            <div className="flex items-center justify-center h-40">
                                <div className="flex space-x-2">
                                    <div className="md:w-6 md:h-6 w-3 h-3 bg-blue-600 rounded-full animate-bounce shadow-lg"></div>
                                    <div className="md:w-6 md:h-6 w-3 h-3 bg-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.2s]"></div>
                                    <div className="md:w-6 md:h-6 w-3 h-3 bg-blue-600 rounded-full animate-bounce shadow-lg [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )
                    }
                >
                    <h1 className="text-4xl text-emerald-500 text-center font-extrabold">
                        All Dogs Category
                    </h1>
                    <div className="dog-list grid place-items-center lg:grid-cols-5 md:grid-cols-4 grid-cols-3 lg:gap-5 md:gap-5 gap-3 mt-9 px-2">
                        {displayedDogs.map((dog) => (
                            <DogCard key={dog.id} dog={dog} />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </section>
    );
};

export default DogList;
