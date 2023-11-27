"use client";

import React, { useState } from "react";
import subService, { Subscriber } from "../services/sub-service";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import UpdateModal from "./UpdateModal";
import { useUpdate } from "../context/UpdateSubContext";
import CreateModal from "./CreateModal";
import { useCreate } from "../context/CreateSubContext";

interface Props {
  subs: Subscriber[];
}

const SubTable = ({ subs }: Props) => {
  const { formData } = useUpdate();
  const { createFormData } = useCreate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>(subs);
  const [err, setErr] = useState("");
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

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

  const handleUpdate = async (id: number) => {
    const originalSubs = [...subscribers];
    // Call the updateSub function here
    try {
      const updatedSubscribers = subscribers.map((s) =>
        s.id === id ? { ...formData, id: s.id } : s
      );

      if (selectedId) {
        await subService.updateSub(updatedSubscribers[selectedId - 1]);
      }
      // Update the state only if the updateSub was successful
      setSubscribers(updatedSubscribers);
    } catch (err) {
      // Restore the original state if an error occurs
      setSubscribers(originalSubs);
      setErr((err as Error).message);
      console.log(err);
    }
  };

  const handleCreate = async (newSub: Subscriber) => {
    const orginalState = [...subscribers];
    setSubscribers([...subscribers, { ...newSub }]);
    try {
      await subService.createSub(newSub);
    } catch (err) {
      setSubscribers(orginalState);
      setErr((err as Error).message);
    }
  };

  return (
    <>
      {updateModalVisible ? (
        <UpdateModal
          subscriber={subscribers}
          selectedId={selectedId}
          onUpdate={() => {
            handleUpdate(selectedId);
            setUpdateModalVisible(false);
          }}
          onClose={() => setUpdateModalVisible(false)}
        />
      ) : null}
      {createModalVisible ? (
        <CreateModal
          onCreate={() => {
            handleCreate(createFormData);
            setCreateModalVisible(false);
          }}
          subscribers={subscribers}
          onClose={() => setCreateModalVisible(false)}
        />
      ) : null}
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
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Delete
                </button>
              </td>
              <td>
                <PencilSquareIcon
                  onClick={() => {
                    setUpdateModalVisible(true);
                    setSelectedId(sub.id);
                  }}
                  className="h-6 w-6"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setCreateModalVisible(true)}
        className="btn btn-primary btn-wide block mx-auto my-3"
      >
        Create Subscriber
      </button>
    </>
  );
};

export default SubTable;
