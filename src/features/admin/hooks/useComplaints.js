import { useState, useEffect } from "react";
import api from "../../../services/axiosInterceptors";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

            // 🔥 Toast Notification
            toast.success(`Status "${newStatus}"`);

        } catch (error) {
            console.error("❌ Failed to update status:", error);
            toast.error("Failed to update status!");
        }
    };

    const deleteComplaint = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This complaint will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/api/admin/complaints/${id}`);
                    setComplaints((prev) => prev.filter((c) => c.id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "Complaint deleted successfully",
                        icon: "success",
                        timer: 1200,
                        showConfirmButton: false,
                    });

                } catch (error) {
                    console.error("❌ Failed to delete complaint:", error);

                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete complaint",
                        icon: "error",
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return { complaints, loading, updateStatus, deleteComplaint };
}
