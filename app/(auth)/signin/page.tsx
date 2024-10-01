"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/data/constant";
import { Loader } from "lucide-react";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Signin = () => {
  const router = useRouter();
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Send a POST request to your Signin API using Axios
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}${LOGIN_URL}`,
          values
        );
        toast.success("Signin successful!");
        Cookies.set("token", res.data.token, { expires: 1 });
        resetForm();
        router.push("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Signin failed:", error.response?.data.message);
          toast.error(error.response?.data.message || "Signin failed");
        } else {
          console.error("Error signing up:", error);
          toast.error("An error occurred while signing up");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen  bg-custom-radial-gradient px-10">
      <div className="border p-10 shadow-lg rounded-lg bg-white  sm:w-1/2 w-full">
        <h1 className="font-bold text-primary mb-4 text-2xl text-center">
          Sign In
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold ">Email:</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label className="text-sm font-semibold ">Password:</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md py-3 hover:bg-[rgba(112,78,248,0.7)] flex gap-3 items-center justify-center"
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}

          >
           
           {formik.isSubmitting && <Loader className='animate-spin'/> } Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
