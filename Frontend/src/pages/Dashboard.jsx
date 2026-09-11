import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleShorten = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setShortUrl("");

            const response = await api.post("/url/shorten", {
                originalUrl
            });

            const shortCode = response.data.url.shortCode;

            setShortUrl(
                `/api/v1/url/redirect/${shortCode}`
            );

            setOriginalUrl("");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to shorten URL"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="dashboard">

                <section className="welcome">
                    <h1>Welcome back 👋</h1>
                    <p>
                        Shorten your URLs and track their performance.
                    </p>
                </section>

                <section className="shortener-card">

                    <h2>Create Short URL</h2>

                    <form onSubmit={handleShorten}>

                        <input
                            type="url"
                            placeholder="Paste your long URL..."
                            value={originalUrl}
                            onChange={(e) =>
                                setOriginalUrl(e.target.value)
                            }
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Shortening..." : "Shorten URL"}
                        </button>

                    </form>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    {shortUrl && (
                        <div className="short-result">

                            <p>Your shortened URL:</p>

                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {shortUrl}
                            </a>

                        </div>
                    )}

                </section>

            </main>
        </>
    );
}

export default Dashboard;