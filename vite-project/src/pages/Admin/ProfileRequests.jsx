import { useEffect, useState } from "react";
import { getAllRequests, updateRequestStatus, deleteRequest } from "../../api/profileService";
import { RiDeleteBinLine } from "react-icons/ri";

const ProfileRequests = () => {

  const [requests, setRequests] = useState([]);

  // 👉 fetch requests
  const fetchRequests = async () => {
    try {
      const res = await getAllRequests();
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 👉 approve
  const handleApprove = async (id) => {
    try {
      await updateRequestStatus(id, {
        status: "Approved",
        reviewedBy: 1 // simple for now
      });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 reject
  const handleReject = async (id) => {
    try {
      await updateRequestStatus(id, {
        status: "Rejected",
        reviewedBy: 1
      });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await deleteRequest(id);
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-bold">Profile Requests</h2>

      {/* ===== TABLE ===== */}
      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Student</th>
              <th>Field</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="text-center border-t">

                <td>{r.fullName}</td>
                <td>{r.fieldName}</td>
                <td>{r.oldValue}</td>
                <td>{r.newValue}</td>
                <td>{r.status}</td>

                <td>
                  {/* 👉 only if pending */}
                  {r.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="text-green-600 mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(r.id)}
                        className="text-red-500 mr-2"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600"
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ProfileRequests;