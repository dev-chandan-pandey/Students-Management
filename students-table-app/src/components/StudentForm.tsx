import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "../utils/validationSchema";
import { Student } from "../types/student";
import { InferType } from "yup";

type StudentFormValues = InferType<typeof studentSchema>;

interface Props {
  onSubmit: (data: StudentFormValues) => void;
  defaultValues?: Student | null;
}

const StudentForm = ({ onSubmit, defaultValues }: Props) => {
  const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<StudentFormValues>({
  resolver: yupResolver(studentSchema),
});

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        email: defaultValues.email,
        age: defaultValues.age,
      });
    }
  }, [defaultValues, reset]);

  const submitHandler: SubmitHandler<StudentFormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-6 rounded shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">
        {defaultValues ? "Edit Student" : "Add Student"}
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <input
            placeholder="Name"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <input
            placeholder="Email"
            {...register("email")}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <input
            placeholder="Age"
            type="number"
            {...register("age")}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.age?.message}</p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {defaultValues ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;