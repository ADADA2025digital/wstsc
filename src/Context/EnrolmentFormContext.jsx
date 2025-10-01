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
    student: {
      family_name: "",
      first_given_name: "",
      second_given_name: "",
      preferred_first_name: "",
      gender: "",
      date_of_birth: "",
      enrollment_year: "",
      overseas_student: null,
      community_school_name: "",
      day_school_location: "",
      enrolment_date: "",
      day_school_name: "",
      attendance_from: "",
      attendance_to: "",
    },
    parent_carer_1: {
      title: "",
      gender: "",
      relationship_to_student: "",
      family_name: "",
      given_name: "",
      country_of_birth: "",
    },
    parent_carer_2: {
      title: "",
      gender: "",
      relationship_to_student: "",
      family_name: "",
      given_name: "",
      country_of_birth: "",
    },
    parent_living_details: {
      correspondence_name: "",
      residential_address: "",
      is_student_residential_address: true,
      correspondence_address: "",
    },
    first_contact: {
      parent_name: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
      email: "",
    },
    second_contact: {
      parent_name: "",
      mobile_phone: "",
      home_phone: "",
      work_phone: "",
      email: "",
    },
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
  const [errors, setErrors] = useState({});

  const updateFormData = (section, field, value) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
      
      return newFormData;
    });

    // Clear error when user starts typing
    if (errors[section]?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[section]) {
          delete newErrors[section][field];
        }
        return newErrors;
      });
    }
  };

  // Validation function
  const validateField = (section, field, value) => {
    const newErrors = { ...errors };
    
    if (!newErrors[section]) {
      newErrors[section] = {};
    }

    let isValid = true;
    let errorMessage = '';

    // Validation patterns
    const namePattern = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, at least 2 characters
    const hasInvalidChars = /[0-9@#$%^&*()_+=\-[\]{};:"\\|,.<>?/~`]/; // Characters that are invalid

    switch (field) {
      case 'family_name':
      case 'first_given_name':
        if (!value || value.trim() === '') {
          errorMessage = 'This field is required';
          isValid = false;
        } else if (hasInvalidChars.test(value)) {
          errorMessage = 'Cannot contain numbers or symbols like @, #, $, 1, 2, 3, etc.';
          isValid = false;
        } else if (!namePattern.test(value)) {
          errorMessage = 'Must contain at least 2 letters and only letters/spaces';
          isValid = false;
        }
        break;

      case 'second_given_name':
      case 'preferred_first_name':
        if (value && value.trim() !== '') {
          if (hasInvalidChars.test(value)) {
            errorMessage = 'Cannot contain numbers or symbols like @, #, $, 1, 2, 3, etc.';
            isValid = false;
          } else if (!namePattern.test(value)) {
            errorMessage = 'Must contain at least 2 letters and only letters/spaces';
            isValid = false;
          }
        }
        break;

      case 'date_of_birth':
        if (!value) {
          errorMessage = 'Date of birth is required';
          isValid = false;
        } else {
          const dob = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (dob >= today) {
            errorMessage = 'Date of birth must be in the past';
            isValid = false;
          }
        }
        break;

      case 'gender':
        if (!value) {
          errorMessage = 'Gender is required';
          isValid = false;
        }
        break;

      case 'enrollment_year':
        if (!value) {
          errorMessage = 'Year enrolled is required';
          isValid = false;
        } else {
          const year = parseInt(value);
          if (isNaN(year) || year < 0 || year > 12) {
            errorMessage = 'Must be a valid year between K-12';
            isValid = false;
          }
        }
        break;

      case 'overseas_student':
        if (value === null || value === undefined) {
          errorMessage = 'This field is required';
          isValid = false;
        }
        break;

      case 'community_school_name':
      case 'day_school_location':
        if (!value || value.trim() === '') {
          errorMessage = 'This field is required';
          isValid = false;
        } else if (hasInvalidChars.test(value)) {
          errorMessage = 'Cannot contain numbers or symbols like @, #, $, 1, 2, 3, etc.';
          isValid = false;
        } else if (!namePattern.test(value)) {
          errorMessage = 'Must contain at least 2 letters and only letters/spaces';
          isValid = false;
        }
        break;

      case 'enrolment_date':
        if (!value) {
          errorMessage = 'Enrolment date is required';
          isValid = false;
        } else {
          const enrolmentDate = new Date(value);
          const today = new Date();
          if (enrolmentDate > today) {
            errorMessage = 'Enrolment date cannot be in the future';
            isValid = false;
          }
        }
        break;

      case 'day_school_name':
        if (value && value.trim() !== '') {
          if (hasInvalidChars.test(value)) {
            errorMessage = 'Cannot contain numbers or symbols like @, #, $, 1, 2, 3, etc.';
            isValid = false;
          } else if (!namePattern.test(value)) {
            errorMessage = 'Must contain at least 2 letters and only letters/spaces';
            isValid = false;
          }
        }
        break;

      case 'attendance_to':
        if (value && formData.student.attendance_from) {
          const fromDate = new Date(formData.student.attendance_from + '-01');
          const toDate = new Date(value + '-01');
          if (toDate <= fromDate) {
            errorMessage = 'End date must be after start date';
            isValid = false;
          }
        }
        break;

      default:
        break;
    }

    if (!isValid) {
      newErrors[section][field] = errorMessage;
    } else {
      delete newErrors[section][field];
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate entire form before submission
  const validateForm = () => {
    const newErrors = {};
    let hasErrors = false;

    // Student section validation
    const studentRequiredFields = [
      'family_name', 'first_given_name', 'date_of_birth', 'gender', 
      'enrollment_year', 'overseas_student', 'community_school_name', 
      'day_school_location', 'enrolment_date'
    ];

    studentRequiredFields.forEach(field => {
      const value = formData.student[field];
      if (!validateField('student', field, value)) {
        hasErrors = true;
      }
    });

    // Validate attendance dates
    if (formData.student.attendance_from && formData.student.attendance_to) {
      if (!validateField('student', 'attendance_to', formData.student.attendance_to)) {
        hasErrors = true;
      }
    }

    return !hasErrors;
  };

  const submitForm = async () => {
    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix the validation errors before submitting');
      throw new Error('Form validation failed');
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const submissionData = {
        ...formData,
        student: {
          ...formData.student,
          dates_of_attendance:
            formData.student.attendance_from && formData.student.attendance_to
              ? `${formData.student.attendance_from} to ${formData.student.attendance_to}`
              : formData.student.attendance_from
              ? `From ${formData.student.attendance_from}`
              : formData.student.attendance_to
              ? `Until ${formData.student.attendance_to}`
              : "Not specified",
          overseas_student: Boolean(formData.student.overseas_student),
        },
      };

      delete submissionData.student.attendance_from;
      delete submissionData.student.attendance_to;
      delete submissionData.student.community_school_name;
      delete submissionData.student.enrolment_date;

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

  const clearError = (section, field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[section]) {
        delete newErrors[section][field];
      }
      return newErrors;
    });
  };

  const getError = (section, field) => {
    return errors[section]?.[field] || '';
  };

  const value = {
    formData,
    updateFormData,
    submitForm,
    loading,
    error,
    success,
    errors,
    setErrors,
    validateField,
    validateForm,
    clearError,
    getError,
    resetSuccess: () => setSuccess(false),
    resetError: () => setError(null),
  };

  return (
    <EnrolmentFormContext.Provider value={value}>
      {children}
    </EnrolmentFormContext.Provider>
  );
};