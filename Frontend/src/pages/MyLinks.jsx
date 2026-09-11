import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyLinks() {

    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUrls = async () => {
        try {
            const response = await api.get("/url/my-urls");
            setUrls(response.data.urls);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch URLs"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this URL?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/url/${id}`);

            setUrls(urls.filter((url) => url._id !== id));

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete URL"
            );
        }
    };

    const copyUrl = async (shortCode) => {

        const shortUrl =
            `http://localhost:5001/api/v1/url/redirect/${shortCode}`;

        await navigator.clipboard.writeText(shortUrl);

        alert("Short URL copied!");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="dashboard">
                    <h2>Loading your links...</h2>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="dashboard">

                <div className="page-header">
                    <div>
                        <h1>My Links</h1>
                        <p>Manage all your shortened URLs.</p>
                    </div>

                    <Link to="/dashboard" className="create-link">
                        + Create Link
                    </Link>
                </div>

                {error && (
                    <p className="error">{error}</p>
                )}

                {urls.length === 0 ? (

                    <div className="empty-state">
                        <h2>No links yet</h2>
                        <p>Create your first shortened URL.</p>

                        <Link to="/dashboard">
                            Create Short URL
                        </Link>
                    </div>

                ) : (

                    <div className="links-container">

                        {urls.map((url) => {

                            const shortUrl =
                                `http://localhost:5001/api/v1/url/redirect/${url.shortCode}`;

                            return (
                                <div className="url-card" key={url._id}>

                                    <div className="url-info">

                                        <h3>
                                            {url.originalUrl}
                                        </h3>

                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {shortUrl}
                                        </a>

                                        <p>
                                            {url.clicks} clicks
                                        </p>

                                    </div>

                                    <div className="url-actions">

                                        <button
                                            onClick={() =>
                                                copyUrl(url.shortCode)
                                            }
                                        >
                                            Copy
                                        </button>

                                        <Link
                                            to={`/analytics/${url._id}`}
                                        >
                                            Analytics
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(url._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </main>
        </>
    );
}

export default MyLinks;