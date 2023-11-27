"use client";

import { ReactNode, createContext, useContext, useState } from "react";
interface Props {
  children: ReactNode;
}

interface Form {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

interface CreateSubContextValue {
  handleSubmit: (form: Form) => void;
  createFormData: Form;
}

const CreateSubContext = createContext({} as CreateSubContextValue);

export const CreateSubContextProvider = ({ children }: Props) => {
  const [createFormData, setCreateFormData] = useState<Form>({
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    address: { city: "" },
    company: { name: "" },
  });

  const handleSubmit = (form: Form) => {
    setCreateFormData(form);
  };

  const createSubContextValue: CreateSubContextValue = {
    createFormData,
    handleSubmit,
  };
  return (
    <CreateSubContext.Provider value={createSubContextValue}>
      {children}{" "}
    </CreateSubContext.Provider>
  );
};

export const useCreate = () => {
  return useContext(CreateSubContext);
};
