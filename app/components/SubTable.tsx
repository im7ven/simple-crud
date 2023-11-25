"use client";

import React, { useState } from "react";
import subService, { Subscriber } from "../services/sub-service";

interface Props {
  // onDelete: (id: number) => void;
  subs: Subscriber[];
}

const SubTable = ({ subs }: Props) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(subs);
  const [err, setErr] = useState("");

  const handleDelete = async (id: number): Promise<void> => {
    const originalSubs = [...subscribers];
    setSubscribers(subscribers?.filter((sub) => sub.id !== id));
    try {
      await subService.deleteSub(id);
    } catch (err) {
      setErr((err as Error).message);
      setSubscribers(originalSubs);
    }
  };

  return (
    <>
      {err && <p className="text-center text-red-500 mb-3">{err}</p>}
      <table className="table max-w-6xl mx-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Employer</th>
          </tr>
        </thead>
        <tbody>
          {subscribers?.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.name}</td>
              <td>{sub.username}</td>
              <td>{sub.email}</td>
              <td>{sub.address.city}</td>
              <td>{sub.phone}</td>
              <td>{sub.company.name}</td>
              <td>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="btn btn-outline btn-secondary btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubTable;
