"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Import js-cookie
import { useRouter } from "next/navigation";
import { REGISTER_URL } from "@/data/constant";
import { Loader } from "lucide-react";
import Link from "next/link";
// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const router = useRouter();
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Send a POST request to your signup API using Axios
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}${REGISTER_URL}`,
          values
        );

        toast.success(res.data.message || "SignUp successfully");

        console.log(res.data);
        console.log(res.data.token);

        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 1, path: "/" });
        } else {
          console.error("No token received in the response.");
        }

        resetForm();
        router.push("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Signup failed:", error.response?.data.message);
          toast.error(error.response?.data.message || "Signup failed");
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
          Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold ">Username:</label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
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
           {formik.isSubmitting && <Loader className='animate-spin'/> }  Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
