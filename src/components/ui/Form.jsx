import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFormData } from "@/components/Backend/formDataStore.js";

const RANGES = {
    age: { min: 5, max: 80 },
    weight: { min: 20, max: 200 },
    height: { min: 50, max: 250 },
};

const Form = () => {
    const [form, setForm] = useState({
        patientName: "",
        gender: "",
        bloodGroup: "",
        age: "",
        weight: "",
        height: "",
        medicalHistory: "",
        allergies: "",
        symptoms: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const clamp = (value, { min, max }) => {
        let n = parseInt(value, 10);
        if (isNaN(n)) return "";
        if (n < min) n = min;
        if (n > max) n = max;
        return n.toString();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["age", "weight", "height"].includes(name)) {
            setForm({ ...form, [name]: clamp(value, RANGES[name]) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const validate = () => {
        const errs = {};
        // required + no-whitespace
        Object.entries(form).forEach(([k, v]) => {
            if (!v || v.trim() === "") {
                errs[k] = "This field is required";
            }
        });
        // numeric ranges
        ["age", "weight", "height"].forEach((k) => {
            const val = parseInt(form[k], 10);
            const { min, max } = RANGES[k];
            if (isNaN(val) || val < min || val > max) {
                errs[k] = `${k.charAt(0).toUpperCase() + k.slice(1)} must be between ${min} and ${max}`;
            }
        });
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setFormData(form);
        navigate("/DiseasePrediction");
    };

    const isReadyToSubmit =
        Object.values(form).every((v) => v.trim() !== "") &&
        Object.keys(errors).length === 0;

    return (
        <div className="relative flex h-auto w-full items-center justify-center p-10">
            <form
                id="patient-form"
                onSubmit={handleSubmit}
                className="bg-white/20 backdrop-blur-lg flex w-full max-w-3xl flex-col rounded-xl p-8 shadow-lg"
            >
                <div className="mb-6 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Patient Name */}
                    <div className="mb-6">
                        <label
                            htmlFor="patientName"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Patient Name
                        </label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={form.patientName}
                            onChange={handleChange}
                            placeholder="Enter patient's full name"
                            className="w-full rounded-md border border-gray-300 placeholder-gray-900 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.patientName && (
                            <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
                        )}
                    </div>

                    {/* Gender & Blood Group */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Gender */}
                        <div>
                            <label
                                htmlFor="gender"
                                className="mb-1 block text-lg font-medium text-white dark:text-black"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full rounded-md border placeholder-gray-900 border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                            )}
                        </div>
                        {/* Blood Group */}
                        <div>
                            <label
                                htmlFor="bloodGroup"
                                className="mb-1 block text-lg font-medium text-white dark:text-black"
                            >
                                Blood Group
                            </label>
                            <select
                                id="bloodGroup"
                                name="bloodGroup"
                                value={form.bloodGroup}
                                onChange={handleChange}
                                className="w-full placeholder-gray-900 rounded-md border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select Blood Group</option>
                                {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((bg) => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                            {errors.bloodGroup && (
                                <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
                            )}
                        </div>
                    </div>

                    {/* Age */}
                    <div className="mb-6">
                        <label
                            htmlFor="age"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                            className="w-full placeholder-gray-900 rounded-md border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                        )}
                    </div>



                    {/* Weight */}
                    <div className="mb-6">
                        <label
                            htmlFor="weight"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Weight
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            placeholder="Enter weight (kg)"
                            className="w-full rounded-md placeholder-gray-900 border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.weight && (
                            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                        )}
                    </div>

                    {/* Height */}
                    <div className="mb-6">
                        <label
                            htmlFor="height"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Height
                        </label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={form.height}
                            onChange={handleChange}
                            placeholder="Enter height (cm)"
                            className="w-full rounded-md placeholder-gray-900 border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.height && (
                            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                        )}
                    </div>

                    {/* Medical History */}
                    <div className="mb-6">
                        <label
                            htmlFor="medicalHistory"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Medical History
                        </label>
                        <textarea
                            id="medicalHistory"
                            name="medicalHistory"
                            value={form.medicalHistory}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter medical history"
                            className="w-full rounded-md placeholder-gray-900 border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                        {errors.medicalHistory && (
                            <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>
                        )}
                    </div>

                    {/* Allergies */}
                    <div className="mb-6">
                        <label
                            htmlFor="allergies"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Allergies
                        </label>
                        <input
                            type="text"
                            id="allergies"
                            name="allergies"
                            value={form.allergies}
                            onChange={handleChange}
                            placeholder="List any allergies"
                            className="w-full rounded-md placeholder-gray-900 border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.allergies && (
                            <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>
                        )}
                    </div>

                    {/* Symptoms */}
                    <div className="mb-6">
                        <label
                            htmlFor="symptoms"
                            className="mb-1 block text-lg font-medium text-white dark:text-black"
                        >
                            Current Symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            value={form.symptoms}
                            onChange={handleChange}
                            rows="3"
                            placeholder="List current symptoms"
                            className="w-full rounded-md placeholder-gray-900 border border-gray-300 bg-transparent px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                        {errors.symptoms && (
                            <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isReadyToSubmit}
                    className={`mt-4 w-full rounded-md py-3 text-lg text-white transition-colors ${
                        isReadyToSubmit
                            ? "bg-teal-400 hover:bg-teal-300"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Submit Details
                </button>
            </form>
        </div>
    );
};

export default Form;
