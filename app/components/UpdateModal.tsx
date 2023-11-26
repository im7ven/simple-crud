"use client";

import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useUpdate } from "../context/UpdateSubContext";
import { Subscriber } from "../services/sub-service";

interface Props {
  onClose: () => void;
  onUpdate: (id: number) => void;
  selectedId: number;
  subscriber: Subscriber[];
}

const UpdateModal = ({ onClose, onUpdate, selectedId, subscriber }: Props) => {
  const { handleSubmit, formData } = useUpdate();
  const [form, setForm] = useState({
    name: subscriber[selectedId - 1].name,
    username: subscriber[selectedId - 1].username,
    email: subscriber[selectedId - 1].email,
    phone: subscriber[selectedId - 1].phone,
    address: subscriber[selectedId - 1].address,
    company: subscriber[selectedId - 1].company,
  });

  useEffect(() => {
    handleSubmit(form);
  }, [form]);

  console.log("Here is the form data", formData);

  return (
    <section className="absolute top-[50%] right-[50%] w-[50rem] translate-x-[50%] translate-y-[-50%] bg-slate-800 z-10 p-6 rounded-lg">
      <XCircleIcon
        onClick={() => onClose()}
        className="h-10 w-10 text-white ml-auto"
      />
      <form>
        <div className="flex flex-col items-center  gap-10 text-slate-00">
          <div>
            <label className="font-bold text-xl" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="username">
              User Name
            </label>
            <input
              name="username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              type="text"
              value={form.username}
              placeholder="Enter a name"
            />
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="email">
              Email
            </label>
            l
            <input
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="city">
              City
            </label>
            <input
              name="city"
              value={form.address.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.target.value },
                })
              }
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="name">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="name">
              Employer
            </label>
            <input
              value={form.company.name}
              name="company"
              onChange={(e) =>
                setForm({
                  ...form,
                  company: { ...form.company, name: e.target.value },
                })
              }
              type="text"
              placeholder="Enter a name"
            />
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          onUpdate(selectedId);
        }}
        className="btn btn-primary block mx-auto mt-6"
      >
        Update
      </button>
    </section>
  );
};

export default UpdateModal;
