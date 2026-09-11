import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Analytics() {

    const { id } = useParams();

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const response = await api.get(`/analytics/${id}`);

                setAnalytics(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch analytics"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchAnalytics();

    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="dashboard">
                    <h2>Loading analytics...</h2>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <main className="dashboard">
                    <p className="error">{error}</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="dashboard">

                <Link to="/links">
                    ← Back to My Links
                </Link>

                <div className="analytics-header">
                    <h1>URL Analytics</h1>

                    <p>
                        Track the performance of your shortened URL.
                    </p>
                </div>

                <div className="analytics-card">

                    <p>Total Clicks</p>

                    <h2>
                        {analytics.totalClicks}
                    </h2>

                </div>

                <section className="click-history">

                    <h2>Click History</h2>

                    {analytics.clicks.length === 0 ? (

                        <p>No clicks yet.</p>

                    ) : (

                        <div className="click-table">

                            <div className="click-row click-header">
                                <span>IP</span>
                                <span>User Agent</span>
                                <span>Referrer</span>
                                <span>Time</span>
                            </div>

                            {analytics.clicks.map((click) => (

                                <div
                                    className="click-row"
                                    key={click._id}
                                >

                                    <span>
                                        {click.ip}
                                    </span>

                                    <span>
                                        {click.userAgent}
                                    </span>

                                    <span>
                                        {click.referrer || "Direct"}
                                    </span>

                                    <span>
                                        {new Date(
                                            click.clickedAt
                                        ).toLocaleString()}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>
        </>
    );
}

export default Analytics;