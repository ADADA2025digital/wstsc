import React, { createContext, useContext, useState } from "react";

const EnrolmentFormContext = createContext();

export const useEnrolmentForm = () => {
  const context = useContext(EnrolmentFormContext);
  if (!context) {
    throw new Error(
      "useEnrolmentForm must be used within an EnrolmentFormProvider"
    );
  }
  return context;
};

export const EnrolmentFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Student Details
    student: {
      family_name: "",
      first_given_name: "",
      second_given_name: "",
      preferred_first_name: "",
      gender: "",
      date_of_birth: "",
      enrollment_year: "",
      overseas_student: false,
      day_school_name: "",
      day_school_location: "",
      dates_of_attendance: "",
    },

    // Parent/Carer 1
    parent_carer_1: {
      title: "",
      gender: "",
      relationship_to_student: "",
      family_name: "",
      given_name: "",
      country_of_birth: "",
    },

    // Parent/Carer 2
    parent_carer_2: {
      title: "",
      gender: "",
      relationship_to_student: "",
      family_name: "",
      given_name: "",
      country_of_birth: "",
    },

    // Parent Living Details
    parent_living_details: {
      correspondence_name: "",
      residential_address: "",
      is_student_residential_address: true,
      correspondence_address: "",
    },

    // First Contact
    first_contact: {
      parent_name: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
      email: "",
    },

    // Second Contact
    second_contact: {
      parent_name: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
      email: "",
    },

    // Parent Not Living
    parent_not_living: {
      title: "",
      gender: "",
      relationship_to_student: "",
      family_name: "",
      given_name: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
      email: "",
      residential_address: "",
      does_student_reside_here: false,
      correspondence_address: "",
    },

    // Emergency Contacts
    first_emergency_contact: {
      family_name: "",
      given_name: "",
      relationship_to_student: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
    },

    second_emergency_contact: {
      family_name: "",
      given_name: "",
      relationship_to_student: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
    },

    // Personal Declaration
    personal_declaration: {
      first_parent_carer_name: "",
      first_parent_carer_name_date: "",
      second_parent_carer_name: "",
      second_parent_carer_name_date: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const submitForm = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare data for submission - combine attendance dates
      const submissionData = {
        ...formData,
        student: {
          ...formData.student,
          // Combine attendance_from and attendance_to into dates_of_attendance
          dates_of_attendance:
            formData.student.attendance_from && formData.student.attendance_to
              ? `${formData.student.attendance_from} to ${formData.student.attendance_to}`
              : formData.student.attendance_from
              ? `From ${formData.student.attendance_from}`
              : formData.student.attendance_to
              ? `Until ${formData.student.attendance_to}`
              : "Not specified", // Provide a default value that satisfies NOT NULL constraint
          // Ensure overseas_student is properly formatted
          overseas_student: Boolean(formData.student.overseas_student),
        },
      };

      // Remove the temporary fields that don't exist in the API
      delete submissionData.student.attendance_from;
      delete submissionData.student.attendance_to;
      delete submissionData.student.community_school_name; // If this doesn't exist in DB
      delete submissionData.student.enrolment_date; // If this doesn't exist in DB

      console.log("Submitting data:", submissionData);

      const response = await fetch(
        "https://urbanviewre.com/wstsc_backend/public/api/student-enrollment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        throw new Error(`Server returned invalid JSON: ${responseText}`);
      }

      if (!response.ok) {
        console.error("Server error details:", result);
        throw new Error(
          result.message || result.error || `Server error: ${response.status}`
        );
      }

      setSuccess(true);
      console.log("Submission successful:", result);
      return result;
    } catch (err) {
      console.error("Full submission error:", err);
      const errorMessage =
        err.message || "Failed to store student enrollment data";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    formData,
    updateFormData,
    submitForm,
    loading,
    error,
    success,
    resetSuccess: () => setSuccess(false),
    resetError: () => setError(null),
  };

  return (
    <EnrolmentFormContext.Provider value={value}>
      {children}
    </EnrolmentFormContext.Provider>
  );
};
