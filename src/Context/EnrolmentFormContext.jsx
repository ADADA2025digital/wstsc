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
      day_school_location_optional: "",
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
      is_student_residential_address: null,
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

  // Specific validation rules for different field types
  const getValidationRules = (section, field) => {
    const rules = {
      required: true, // All fields are required
    };

    switch (field) {
      // Name fields
      case 'family_name':
      case 'first_given_name':
      case 'second_given_name':
      case 'preferred_first_name':
      case 'given_name':
      case 'parent_name':
      case 'first_parent_carer_name':
      case 'second_parent_carer_name':
      case 'correspondence_name':
        return {
          ...rules,
          pattern: /^[A-Za-z\s]{2,}$/,
          message: 'Must contain at least 2 letters and only letters/spaces',
          invalidChars: /[0-9@#$%^&*()_+=\-[\]{};:"\\|,.<>?/~`]/
        };

      // School name fields
      case 'community_school_name':
      case 'day_school_location':
      case 'day_school_name':
      case 'day_school_location_optional':
        return {
          ...rules,
          pattern: /^[A-Za-z\s]{2,}$/,
          message: 'Must contain at least 2 letters and only letters/spaces',
          invalidChars: /[0-9@#$%^&*()_+=\-[\]{};:"\\|,.<>?/~`]/
        };

      // Title and relationship fields
      case 'title':
      case 'relationship_to_student':
      case 'country_of_birth':
        return {
          ...rules,
          pattern: /^[A-Za-z\s]{2,}$/,
          message: 'Must contain at least 2 letters and only letters/spaces',
          invalidChars: /[0-9@#$%^&*()_+=\-[\]{};:"\\|,.<>?/~`]/
        };

      // Phone fields
      case 'mobile_phone':
      case 'home_phone':
      case 'work_phone':
        return {
          ...rules,
          pattern: /^[0-9+\-\s()]{8,}$/,
          message: 'Must be a valid phone number with at least 8 digits',
          minLength: 8
        };

      // Email fields
      case 'email':
        return {
          ...rules,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        };

      // Address fields
      case 'residential_address':
      case 'correspondence_address':
        return {
          ...rules,
          pattern: /^[A-Za-z0-9\s,.-]{5,}$/,
          message: 'Must be a valid address with at least 5 characters'
        };

      // Date fields
      case 'date_of_birth':
        return {
          ...rules,
          isPastDate: true,
          message: 'Date of birth must be in the past'
        };

      case 'enrolment_date':
        return {
          ...rules,
          // Only required validation, no future date restriction
          message: 'This field is required'
        };

      // REMOVED isPastDate validation for declaration dates
      case 'first_parent_carer_name_date':
      case 'second_parent_carer_name_date':
        return {
          ...rules,
          // Only required validation, no future date restriction
          message: 'This field is required'
        };

      // Year field - Only required, no K-12 validation
      case 'enrollment_year':
        return {
          ...rules,
          message: 'This field is required'
        };

      // Month fields
      case 'attendance_from':
      case 'attendance_to':
        return {
          ...rules,
          isMonthYear: true,
          message: 'Please select a valid month and year'
        };

      // Boolean fields - accept both true and false, but not null/undefined
      case 'overseas_student':
      case 'is_student_residential_address':
        return {
          ...rules,
          isBoolean: true,
          message: 'This field is required',
          validateBoolean: (value) => value !== null && value !== undefined
        };

      default:
        return rules;
    }
  };

  // Validation function - ALL FIELDS REQUIRED
  const validateField = (section, field, value) => {
    const rules = getValidationRules(section, field);
    let isValid = true;
    let errorMessage = '';

    // Custom validation for boolean fields
    if (rules.validateBoolean) {
      if (!rules.validateBoolean(value)) {
        errorMessage = rules.message;
        isValid = false;
      }
    }
    // Regular required validation for other fields
    else if (value === null || value === undefined || value === '') {
      errorMessage = 'This field is required';
      isValid = false;
    } else {
      // Field-specific validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errorMessage = rules.message;
        isValid = false;
      }

      if (rules.invalidChars && rules.invalidChars.test(value)) {
        errorMessage = 'Cannot contain numbers or special symbols';
        isValid = false;
      }

      // REMOVED the isPastDate validation check for all fields
      // Only date_of_birth still has isPastDate in rules, but we'll skip it for declaration dates
      if (rules.isPastDate && field !== 'first_parent_carer_name_date' && field !== 'second_parent_carer_name_date') {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date >= today) {
          errorMessage = rules.message;
          isValid = false;
        }
      }

      if (rules.isMonthYear && !value.match(/^\d{4}-\d{2}$/)) {
        errorMessage = rules.message;
        isValid = false;
      }

      // Special validation for attendance_to date
      if (field === 'attendance_to' && formData.student.attendance_from && value) {
        const fromDate = new Date(formData.student.attendance_from + '-01');
        const toDate = new Date(value + '-01');
        if (toDate <= fromDate) {
          errorMessage = 'End date must be after start date';
          isValid = false;
        }
      }
    }

    // Update errors state
    setErrors(prev => {
      const newErrors = { ...prev };
     
      if (!newErrors[section]) {
        newErrors[section] = {};
      }

      if (!isValid) {
        newErrors[section][field] = errorMessage;
      } else {
        delete newErrors[section][field];
      }

      return newErrors;
    });

    return isValid;
  };

  // Section validation function - ALL FIELDS REQUIRED
  const validateSection = (section) => {
    let hasErrors = false;
    const sectionData = formData[section];
    const newErrors = { ...errors };

    if (!newErrors[section]) {
      newErrors[section] = {};
    }

    // Validate ALL fields in the section
    Object.keys(sectionData).forEach(field => {
      if (!validateField(section, field, sectionData[field])) {
        hasErrors = true;
      }
    });

    // Special validation for attendance dates
    if (section === 'student') {
      if (formData.student.attendance_from && formData.student.attendance_to) {
        if (!validateField('student', 'attendance_to', formData.student.attendance_to)) {
          hasErrors = true;
        }
      }
    }

    // Special validation for correspondence address
    if (section === 'parent_living_details') {
      if (formData.parent_living_details.is_student_residential_address === false) {
        if (!validateField('parent_living_details', 'correspondence_address', formData.parent_living_details.correspondence_address)) {
          hasErrors = true;
        }
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  // Validate entire form before submission
  const validateForm = (personalDeclarationOnly = false) => {
    let hasErrors = false;

    // Clear previous general error
    setError(null);

    if (personalDeclarationOnly) {
      // Only validate personal declaration section
      if (!validateSection('personal_declaration')) {
        hasErrors = true;
      }
    } else {
      // Validate all sections
      const sections = [
        'student', 'parent_carer_1', 'parent_carer_2', 'parent_living_details',
        'first_contact', 'second_contact', 'parent_not_living',
        'first_emergency_contact', 'second_emergency_contact', 'personal_declaration'
      ];

      sections.forEach(section => {
        if (!validateSection(section)) {
          hasErrors = true;
        }
      });
    }

    return !hasErrors;
  };

  const submitForm = async (personalDeclarationOnly = false) => {
    // Validate form before submission
    if (!validateForm(personalDeclarationOnly)) {
      if (!error) {
        setError('Please complete all required fields before submitting the form.');
      }
      throw new Error('Form validation failed');
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare data for backend - convert null to false for boolean fields
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
        parent_living_details: {
          ...formData.parent_living_details,
          is_student_residential_address: formData.parent_living_details.is_student_residential_address === null
            ? false
            : formData.parent_living_details.is_student_residential_address,
        },
      };

      // Remove temporary fields used for date range
      delete submissionData.student.attendance_from;
      delete submissionData.student.attendance_to;

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

  // Reset form data
  const resetForm = () => {
    setFormData({
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
        day_school_location_optional: "",
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
        is_student_residential_address: null,
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
    setErrors({});
    setError(null);
    setSuccess(false);
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
    validateSection,
    clearError,
    getError,
    resetForm,
    resetSuccess: () => setSuccess(false),
    resetError: () => setError(null),
  };

  return (
    <EnrolmentFormContext.Provider value={value}>
      {children}
    </EnrolmentFormContext.Provider>
  );
};
