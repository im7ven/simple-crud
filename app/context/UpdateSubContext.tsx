"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface FormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

interface UpdateContextValue {
  handleSubmit: (formData: FormData) => void;
  formData: FormData;
}

const UpdateSubContext = createContext<UpdateContextValue>(
  {} as UpdateContextValue
);

export default function UpdateSubContextProvider({ children }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: { city: "" },
    company: { name: "" },
  });

  const handleSubmit = (formData: FormData) => {
    setFormData(formData);
  };

  const updateContextValue: UpdateContextValue = {
    handleSubmit,
    formData,
  };

  return (
    <UpdateSubContext.Provider value={updateContextValue}>
      {children}
    </UpdateSubContext.Provider>
  );
}

export const useUpdate = () => {
  return useContext(UpdateSubContext);
};
