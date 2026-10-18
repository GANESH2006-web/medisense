// src/components/Backend/formDataStore.js
let formData = null;
const listeners = new Set();

export const setFormData = (data) => {
    formData = data;
    listeners.forEach((callback) => callback(formData));
};

export const getFormData = () => formData;

export const subscribeToFormData = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};
