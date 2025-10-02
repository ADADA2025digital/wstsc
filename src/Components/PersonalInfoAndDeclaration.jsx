import React, { useState } from "react";
import TextInput from "./Inputs/TextInput.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function PersonalInfoAndDeclaration() {
  const { formData, updateFormData, validateField, getError, validateSection, submitForm, loading, error, success } = useEnrolmentForm();
  const [sectionError, setSectionError] = useState('');

  const handleInputChange = (section, field, value) => {
    updateFormData(section, field, value);
    if (sectionError) {
      setSectionError('');
    }
  };

  const handleBlur = (section, field) => {
    const value = formData[section][field];
    validateField(section, field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the personal declaration section
    const isValid = validateSection('personal_declaration');
    
    if (isValid) {
      setSectionError('');
      try {
        await submitForm();
      } catch (err) {
        console.error('Submission error:', err);
      }
    } else {
      setSectionError('Please fix the validation errors before submitting the form.');
    }
  };

  return (
    <section className="container bg-light p-3">
      <h2 className="h4 dark-text mb-3">F. Personal information and declaration of accuracy</h2>

      {/* Section Error Message */}
      {sectionError && (
        <div className="alert alert-danger" role="alert">
          {sectionError}
        </div>
      )}

      {/* Global Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="alert alert-success" role="alert">
          Student enrollment submitted successfully!
        </div>
      )}

      <div className="row">
        <p>
          The collection of personal information on this form is authorised by
          the NSW Department of Education. The information will be used for the
          purposes of enrolment, administration, and communication. It will be
          stored and disposed of in accordance with the department's records
          management procedures. The information may be disclosed to other
          organisations or government agencies as required or authorised by law.
        </p>
        <p>
          Parents/carers are responsible for informing the community language
          school of any changes to the information provided on this form.
        </p>
        <p>
          I declare that the information I have provided on this form is, to the
          best of my knowledge, accurate and complete.
        </p>

        <TextInput
          id="firstParentCarerName"
          label="Name of first parent/carer"
          value={formData.personal_declaration.first_parent_carer_name}
          onChange={(value) => handleInputChange('personal_declaration', 'first_parent_carer_name', value)}
          onBlur={() => handleBlur('personal_declaration', 'first_parent_carer_name')}
          error={getError('personal_declaration', 'first_parent_carer_name')}
          required
        />

        <TextInput
          id="firstParentCarerDate"
          label="Date"
          type="date"
          value={formData.personal_declaration.first_parent_carer_name_date}
          onChange={(value) => handleInputChange('personal_declaration', 'first_parent_carer_name_date', value)}
          onBlur={() => handleBlur('personal_declaration', 'first_parent_carer_name_date')}
          error={getError('personal_declaration', 'first_parent_carer_name_date')}
          required
        />

        <TextInput
          id="secondParentCarerName"
          label="Name of second parent/carer (if applicable)"
          value={formData.personal_declaration.second_parent_carer_name}
          onChange={(value) => handleInputChange('personal_declaration', 'second_parent_carer_name', value)}
          onBlur={() => handleBlur('personal_declaration', 'second_parent_carer_name')}
          error={getError('personal_declaration', 'second_parent_carer_name')}
        />

        <TextInput
          id="secondParentCarerDate"
          label="Date"
          type="date"
          value={formData.personal_declaration.second_parent_carer_name_date}
          onChange={(value) => handleInputChange('personal_declaration', 'second_parent_carer_name_date', value)}
          onBlur={() => handleBlur('personal_declaration', 'second_parent_carer_name_date')}
          error={getError('personal_declaration', 'second_parent_carer_name_date')}
        />
      </div>

      {/* Submit Button */}
      <div className="container py-3 py-lg-5">
        <div className="row">
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
    </section>
  );
}