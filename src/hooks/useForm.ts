import { useState } from "react";

export const useForm = <T>(inputValues: T) => {
  const [formState, setFormState] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });

  return { formState, handleChange, setFormState };
};
