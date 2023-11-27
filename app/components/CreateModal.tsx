import { XCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useCreate } from "../context/CreateSubContext";
import { Subscriber } from "../services/sub-service";

interface Props {
  onClose: () => void;
  onCreate: () => void;
  subscribers: Subscriber[];
}

const CreateModal = ({ onClose, subscribers, onCreate }: Props) => {
  const { handleSubmit } = useCreate();

  const [form, setForm] = useState({
    id: subscribers.length + 1,
    name: "",
    username: "",
    email: "",
    phone: "",
    address: { city: "" },
    company: { name: "" },
  });

  useEffect(() => {
    handleSubmit(form);
  }, [form]);

  return (
    <section className="absolute top-[50%] right-[50%] w-[40rem] translate-x-[50%] translate-y-[-50%] bg-slate-900 z-10 py-6 px-3 rounded-lg">
      <div className="flex items-center">
        <h2 className="text-slate-300 text-xl font-extrabold w-full text-center">
          Create Subscriber
        </h2>
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
                    address: { city: e.target.value },
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
                  company: { name: e.target.value },
                })
              }
              type="text"
              placeholder="Enter a name"
            />
          </div>
        </div>
      </form>
      <button
        onClick={() => onCreate()}
        className="btn btn-primary block mx-auto mt-2 w-[10rem]"
      >
        Update
      </button>
    </section>
  );
};

export default CreateModal;
