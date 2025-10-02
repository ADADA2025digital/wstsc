import React, { useState, useEffect } from "react";
import TextInput from "./Inputs/TextInput.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PersonalInfoAndDeclaration() {
  const {
    formData,
    updateFormData,
    validateField,
    getError,
    validateSection,
    submitForm,
    loading,
    error,
    success,
  } = useEnrolmentForm();
  const [sectionError, setSectionError] = useState("");
  const [touchedFields, setTouchedFields] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (section, field, value) => {
    // Validate that names don't contain numbers or symbols - ONLY for actual name fields
    if ((field === 'first_parent_carer_name' || field === 'second_parent_carer_name') && value) {
      const hasInvalidChars = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      if (hasInvalidChars) {
        return; // Don't update if invalid characters are present
      }
    }
   
    updateFormData(section, field, value);
    if (sectionError) {
      setSectionError("");
    }
  };

  const handleBlur = (section, field) => {
    const value = formData[section][field];
    validateField(section, field, value);
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [`${section}.${field}`]: true
    }));
  };

  // Show success alert and redirect when form is successfully submitted
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Success!",
        text: "Form submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, [success, navigate]);

  // Helper function to check if a field should show error
  const shouldShowError = (section, field) => {
    return showAllErrors || touchedFields[`${section}.${field}`];
  };

  // Custom validation function for names (no numbers or symbols)
  const validateName = (value, isRequired = true) => {
    if (!value) return isRequired ? "This field is required" : null;
    if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return "Name should not contain numbers or symbols";
    }
    return null;
  };

  // Custom validation function for date - ONLY REQUIRED VALIDATION
  const validateDate = (value, isRequired = true) => {
    if (!value) return isRequired ? "This field is required" : null;
    return null; // No future date validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAllErrors(true);

    // DEBUG: Log current form data state
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Full formData:", formData);
   
    // ONLY validate the personal declaration section
    const isPersonalDeclarationValid = validateSection("personal_declaration");

    // Check required fields for personal declaration
    const requiredFields = ['first_parent_carer_name', 'first_parent_carer_name_date'];
    const missingFields = requiredFields.filter(field =>
      !formData.personal_declaration[field] ||
      formData.personal_declaration[field].toString().trim() === ''
    );

    // DEBUG: Log personal declaration validation
    console.log("=== PERSONAL DECLARATION DEBUG ===");
    console.log("Personal declaration data:", formData.personal_declaration);
    console.log("Personal declaration valid:", isPersonalDeclarationValid);
    console.log("Missing required fields:", missingFields);

    if (isPersonalDeclarationValid && missingFields.length === 0) {
      setSectionError("");
      console.log("=== ATTEMPTING FORM SUBMISSION ===");
      try {
        // Use the modified submitForm that only validates personal declaration
        await submitForm(true); // Pass true to indicate we only want personal declaration validation
        console.log("=== FORM SUBMISSION SUCCESSFUL ===");
      } catch (err) {
        console.error("=== SUBMISSION ERROR ===", err);
        console.error("Error details:", err.message);
        console.error("Error stack:", err.stack);
       
        // Check if it's a validation error
        if (err.message === 'Form validation failed') {
          Swal.fire({
            title: "Incomplete Form",
            text: "There are some validation errors. Please check all sections and try again.",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an error submitting the form. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      }
    } else {
      const errorMessage = "Please complete all required fields in the personal declaration before submitting the form.";
     
      setSectionError(errorMessage);
     
      console.log("=== VALIDATION FAILED ===");
      console.log("Section error set to:", errorMessage);
      console.log("Personal declaration valid:", isPersonalDeclarationValid);
      console.log("Missing fields:", missingFields);

      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.querySelector('.alert-danger');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          console.log("Scrolled to error element");
        } else {
          console.log("Error element not found for scrolling");
        }
      }, 100);
    }
  };

  return (
    <section className="container bg-light p-3">
      <div className="row">
        {/* Section Error Message */}
        {sectionError && (
          <div className="alert alert-danger" role="alert">
            {sectionError}
            {/* DEBUG: Show additional info in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 small">
                <strong>Debug Info:</strong> Check browser console (F12) for detailed validation information.
              </div>
            )}
          </div>
        )}
       
        <div className="col-md-6">
          <p className="text-muted">
            The personal information collected on this information form is for
            purposes directly related to your child's attendance at a community
            languages school, including the processing of applications for grant
            funding from the NSW Community Languages Schools Program,
            administered by the NSW Department of Education. <br />
            <br />
            Any information provided to the Department of Education and will be
            used, disclosed and stored consistent with the NSW privacy laws.{" "}
            <br />
            <br />
            Certain information is required by the Department of Education to
            meet its obligations in relation to data collection, reporting and
            the payment of grants. <br />
            <br />
            Information may be disclosed to NSW State and Commonwealth
            government agencies and other organisations for the purposes of
            confirming the eligibility of students for grant funding and as
            authorised or required by law. <br />
            <br />
            Information will be stored on a secure electronic database. You may
            access or correct the information by contacting your child's
            community language school. The community language school is
            responsible for advising the NSW Department of Education and of any
            corrections required to the electronic database. If you have a
            concern or complaint about the information collected or how it has
            been used or disclosed you should contact the community language
            school.
          </p>
        </div>

        <div className="col-md-6">
          <h2 className="h4 mb-3">Your consent and declaration</h2>
          <p className="text-muted">
            I have provided information related to the student in this enrolment
            form. <br /> <br />
            I consent to providing information contained on this enrolment form
            to the Department of Education and to confirm the accuracy of the
            information with other organisations that may also hold information
            related to the student named on page 1. <br /> <br />
            I have read the information on this page concerning the collection
            of personal information. <br /> <br />I declare that the information
            provided in this enrolment form is, to the best of my knowledge and
            belief, accurate and complete. <br /> <br />
            Where I have given personal information about other people I have
            done so with their authorisation. <br /> <br />I am aware that if
            information I have given is false or misleading, any decision made
            as a result of this enrolment form may be changed.
          </p>

          <div className="row">
            <div className="col-md-6">
              <TextInput
                id="firstParentCarerName"
                label="Name of first parent/carer"
                value={formData.personal_declaration.first_parent_carer_name}
                onChange={(value) =>
                  handleInputChange(
                    "personal_declaration",
                    "first_parent_carer_name",
                    value
                  )
                }
                onBlur={() => handleBlur("personal_declaration", "first_parent_carer_name")}
                error={shouldShowError("personal_declaration", "first_parent_carer_name") ?
                  (getError("personal_declaration", "first_parent_carer_name") ||
                   validateName(formData.personal_declaration.first_parent_carer_name, true))
                  : null}
                required
              />
              <p className="small">
                <i>
                  (at least one of the student's parents/carers must sign the
                  enrolment form)
                </i>
              </p>
            </div>
            <div className="col-md-6">
              <TextInput
                id="declarationDate1"
                label="Date"
                type="date"
                value={
                  formData.personal_declaration.first_parent_carer_name_date || ""
                }
                onChange={(value) =>
                  handleInputChange(
                    "personal_declaration",
                    "first_parent_carer_name_date",
                    value
                  )
                }
                onBlur={() => handleBlur("personal_declaration", "first_parent_carer_name_date")}
                error={shouldShowError("personal_declaration", "first_parent_carer_name_date") ?
                  (getError("personal_declaration", "first_parent_carer_name_date") ||
                   validateDate(formData.personal_declaration.first_parent_carer_name_date, true))
                  : null}
                required
              />
            </div>
            <div className="col-md-6">
              <TextInput
                id="secondParentCarerName"
                label="Name of second parent/carer (if applicable)"
                value={formData.personal_declaration.second_parent_carer_name}
                onChange={(value) =>
                  handleInputChange(
                    "personal_declaration",
                    "second_parent_carer_name",
                    value
                  )
                }
                onBlur={() => handleBlur("personal_declaration", "second_parent_carer_name")}
                error={shouldShowError("personal_declaration", "second_parent_carer_name") ?
                  (getError("personal_declaration", "second_parent_carer_name") ||
                   validateName(formData.personal_declaration.second_parent_carer_name, false))
                  : null}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                id="declarationDate2"
                label="Date"
                type="date"
                value={
                  formData.personal_declaration.second_parent_carer_name_date || ""
                }
                onChange={(value) =>
                  handleInputChange(
                    "personal_declaration",
                    "second_parent_carer_name_date",
                    value
                  )
                }
                onBlur={() => handleBlur("personal_declaration", "second_parent_carer_name_date")}
                error={shouldShowError("personal_declaration", "second_parent_carer_name_date") ?
                  (getError("personal_declaration", "second_parent_carer_name_date") ||
                   validateDate(formData.personal_declaration.second_parent_carer_name_date, false))
                  : null}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="container py-3 py-lg-5">
          <div className="row">
            {/* Loading Message */}
            {loading && (
              <div className="container">
                <div className="alert alert-info" role="alert">
                  Submitting form, please wait...
                </div>
              </div>
            )}
           
            <div className="col-12 d-flex justify-content-center align-items-center z-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn globalbutton rounded-0 dark-text fw-bold fs-5 position-relative overflow-hidden"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
