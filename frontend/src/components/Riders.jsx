import React, { useEffect, useContext } from "react";
import { LogicContext } from "../store/LogicStore";
import { useNavigate } from "react-router-dom";

function Riders() {
  const { getAllRiders, allRiders } = useContext(LogicContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRiders();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-900">All Riders</h2>
          <button
            onClick={() => navigate("/admin/rider-create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Rider
          </button>
        </div>

        {allRiders.length === 0 ? (
          <p className="text-blue-800">No riders found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allRiders.map((rider) => (
              <div
                key={rider._id}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={rider.photo}
                    alt={rider.name}
                    className="w-16 h-16 rounded-full border border-blue-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {rider.name}
                    </h3>
                    <p className="text-sm text-blue-700">{rider.email}</p>
                  </div>
                </div>
                <p className="text-blue-900 font-medium">
                  Role:{" "}
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-sm rounded">
                    {rider.role}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Riders;
