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
    <section className="absolute top-[50%] right-[50%] w-[40rem] translate-x-[50%] translate-y-[-50%] bg-slate-900 z-10 py-6 px-3 rounded-lg">
      <div className="flex items-center">
        <h2 className="text-slate-300 text-xl font-extrabold w-full text-center">{`Update ${
          subscriber[selectedId - 1].name
        }`}</h2>
        <XCircleIcon
          onClick={() => onClose()}
          className="h-10 w-10 text-white flex-grow"
        />
      </div>
      <form className="py-6 px-[4rem]">
        <div className="flex flex-col items-center gap-6 ">
          <div className="flex gap-5 w-full">
            <div className="flex-grow">
              <label
                className="block mb-3 font-bold text-md text-slate-300"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="rounded py-2 px-3 outline-none w-full"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                placeholder="Enter a name"
              />
            </div>
            <div className="flex-grow">
              <label
                className=" block mb-3 font-bold text-md text-slate-300"
                htmlFor="username"
              >
                User Name
              </label>
              <input
                className="rounded py-2 px-3 outline-none w-full "
                name="username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                type="text"
                value={form.username}
                placeholder="Enter a name"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className=" block mb-3 font-bold text-md text-slate-300"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="rounded py-2 px-3 outline-none w-full"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label
                className=" block mb-3 font-bold text-md text-slate-300"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="rounded py-2 px-3 outline-none w-[15rem]"
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
              <label
                className=" block mb-3 font-bold text-md text-slate-300"
                htmlFor="name"
              >
                Phone Number
              </label>
              <input
                className="rounded py-2 px-3 outline-none w-[15rem]"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                type="text"
                placeholder="Enter a name"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className=" block mb-3 font-bold text-md text-slate-300"
              htmlFor="name"
            >
              Employer
            </label>
            <input
              className="rounded py-2 px-3 outline-none w-full"
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
        className="btn btn-primary block mx-auto mt-2 w-[10rem]"
      >
        Update
      </button>
    </section>
  );
};

export default UpdateModal;
