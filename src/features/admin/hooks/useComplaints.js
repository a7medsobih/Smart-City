import { useState, useEffect } from "react";
import api from "../../../services/axiosInterceptors";

export default function useComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/admin/complaints");
            const data = response.data;

            const statusMap = {
                0: "Pending",
                1: "In Progress",
                2: "Resolved",
                3: "Rejected",
            };

            const updatedData = data.map((complaint) => ({
                ...complaint,
                status: statusMap[complaint.status] || "Pending",
                dateSubmitted: complaint.dateSubmitted || "N/A",
            }));

            setComplaints(updatedData);
        } catch (error) {
            console.error("❌ Failed to fetch complaints:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (complaint, newStatus) => {
        try {
            const statusMapping = {
                Pending: 0,
                "In Progress": 1,
                Resolved: 2,
                Rejected: 3,
            };

            await api.put(`/api/admin/complaints/${complaint.id}/status`, {
                status: statusMapping[newStatus],
            });

            setComplaints((prev) =>
                prev.map((c) =>
                    c.id === complaint.id ? { ...c, status: newStatus } : c
                )
            );



        } catch (error) {
            console.error("❌ Failed to update status:", error);
        }
    };

    const deleteComplaint = async (id) => {
        if (!window.confirm("Are you sure you want to delete this complaint?")) return;

        try {
            await api.delete(`/api/admin/complaints/${id}`);
            setComplaints((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("❌ Failed to delete complaint:", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return { complaints, loading, updateStatus, deleteComplaint };
}
