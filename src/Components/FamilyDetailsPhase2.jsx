import React, { useState } from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function FamilyDetailsPhase2({ onNext }) {
  const { formData, updateFormData, validateField, getError, validateSection, validateAtLeastOneContactSectionFilled } = useEnrolmentForm();
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

  const handleNext = () => {
    // Validate all sections in this component
    const firstContactValid = validateSection('first_contact');
    const secondContactValid = validateSection('second_contact');
    const parentNotLivingValid = validateSection('parent_not_living');
    
    // Check if at least one contact section is filled
    const hasAtLeastOneContact = validateAtLeastOneContactSectionFilled();
    
    if (firstContactValid && secondContactValid && parentNotLivingValid && hasAtLeastOneContact) {
      setSectionError('');
      if (onNext) {
        onNext();
      }
    } else {
      if (!hasAtLeastOneContact) {
        setSectionError('Please fill at least one contact section (First Contact, Second Contact, or Parents not living with student)');
      } else {
        setSectionError('Please fix the validation errors before proceeding to the next step.');
      }
    }
  };

  return (
    <section className="container bg-light p-3">
      {/* Section Error Message */}
      {sectionError && (
        <div className="alert alert-danger" role="alert">
          {sectionError}
        </div>
      )}

      {/* Section 1: First Contact */}
      <div className="row">
        <TextInput
          id="firstContactName"
          label="NAME OF PARENT/CARER TO CONTACT FIRST"
          value={formData.first_contact.parent_name}
          onChange={(value) => updateFormData("first_contact", "parent_name", value)}
          onBlur={() => handleBlur("first_contact", "parent_name")}
          error={getError("first_contact", "parent_name")}
          required
        />
        <TextInput
          id="firstContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.first_contact.mobile_phone}
          onChange={(value) => updateFormData("first_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("first_contact", "mobile_phone")}
          error={getError("first_contact", "mobile_phone")}
          required
        />

        <TextInput
          id="firstContactHome"
          label="Phone number"
          note="(home)"
          value={formData.first_contact.home_phone}
          onChange={(value) => updateFormData("first_contact", "home_phone", value)}
          onBlur={() => handleBlur("first_contact", "home_phone")}
          error={getError("first_contact", "home_phone")}
        />

        <TextInput
          id="firstContactWork"
          label="Phone number"
          note="(work)"
          value={formData.first_contact.work_phone}
          onChange={(value) => updateFormData("first_contact", "work_phone", value)}
          onBlur={() => handleBlur("first_contact", "work_phone")}
          error={getError("first_contact", "work_phone")}
        />

        <TextInput
          id="firstContactEmail"
          label="Contact email address"
          value={formData.first_contact.email}
          onChange={(value) => updateFormData("first_contact", "email", value)}
          onBlur={() => handleBlur("first_contact", "email")}
          error={getError("first_contact", "email")}
          required
        />
      </div>

      {/* Section 2: Second Contact */}
      <div className="row mt-4">
        <TextInput
          id="secondContactName"
          label="NAME OF PARENT/CARER TO CONTACT SECOND"
          value={formData.second_contact.parent_name}
          onChange={(value) => updateFormData("second_contact", "parent_name", value)}
          onBlur={() => handleBlur("second_contact", "parent_name")}
          error={getError("second_contact", "parent_name")}
          required
        />
        <TextInput
          id="secondContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.second_contact.mobile_phone}
          onChange={(value) => updateFormData("second_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("second_contact", "mobile_phone")}
          error={getError("second_contact", "mobile_phone")}
          required
        />

        <TextInput
          id="secondContactHome"
          label="Phone number"
          note="(home)"
          value={formData.second_contact.home_phone}
          onChange={(value) => updateFormData("second_contact", "home_phone", value)}
          onBlur={() => handleBlur("second_contact", "home_phone")}
          error={getError("second_contact", "home_phone")}
        />

        <TextInput
          id="secondContactWork"
          label="Phone number"
          note="(work)"
          value={formData.second_contact.work_phone}
          onChange={(value) => updateFormData("second_contact", "work_phone", value)}
          onBlur={() => handleBlur("second_contact", "work_phone")}
          error={getError("second_contact", "work_phone")}
        />

        <TextInput
          id="secondContactEmail"
          label="Contact email address"
          value={formData.second_contact.email}
          onChange={(value) => updateFormData("second_contact", "email", value)}
          onBlur={() => handleBlur("second_contact", "email")}
          error={getError("second_contact", "email")}
          required
        />
      </div>

      {/* Section D: Parents/carers not living with this student */}
      <div className="row mt-4">
        <h2 className="h4 mb-3">
          D. Parents/carers not living with this student{" "}
        </h2>
        <p>
          <i>
            Complete only if applicable. Please print and attach additional
            pages if required for multiple parents/carers not living with this
            student.
          </i>
        </p>
        <div className="row align-items-end gap-5">
          <div className="col-md-4">
            <TextInput
              id="notLivingTitle"
              label="Title"
              note="(eg Mr/Ms/Mrs/Dr)"
              value={formData.parent_not_living.title}
              onChange={(value) => updateFormData("parent_not_living", "title", value)}
              onBlur={() => handleBlur("parent_not_living", "title")}
              error={getError("parent_not_living", "title")}
              required
            />
          </div>
          <div className="col-md-4">
            <RadioGroup
              name="notLivingGender"
              label="Gender"
              value={formData.parent_not_living.gender}
              onChange={(value) => updateFormData("parent_not_living", "gender", value)}
              onBlur={() => handleBlur("parent_not_living", "gender")}
              error={getError("parent_not_living", "gender")}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <TextInput
          id="notLivingRelationship"
          label="Relationship to student"
          note="(eg mother/father/carer)"
          value={formData.parent_not_living.relationship_to_student}
          onChange={(value) => updateFormData("parent_not_living", "relationship_to_student", value)}
          onBlur={() => handleBlur("parent_not_living", "relationship_to_student")}
          error={getError("parent_not_living", "relationship_to_student")}
          required
        />

        <TextInput
          id="notLivingFamilyName"
          label="Family name"
          value={formData.parent_not_living.family_name}
          onChange={(value) => updateFormData("parent_not_living", "family_name", value)}
          onBlur={() => handleBlur("parent_not_living", "family_name")}
          error={getError("parent_not_living", "family_name")}
          required
        />

        <TextInput
          id="notLivingGivenName"
          label="Given name"
          value={formData.parent_not_living.given_name}
          onChange={(value) => updateFormData("parent_not_living", "given_name", value)}
          onBlur={() => handleBlur("parent_not_living", "given_name")}
          error={getError("parent_not_living", "given_name")}
          required
        />

        <h6 className="fw-bold mt-3">CONTACT DETAILS</h6>
        <p>
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include these in the comment box next to the number
            (eg Mondays and Tuesdays only).
          </i>
        </p>
        <TextInput
          id="notLivingMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.parent_not_living.mobile_phone}
          onChange={(value) => updateFormData("parent_not_living", "mobile_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "mobile_phone")}
          error={getError("parent_not_living", "mobile_phone")}
          required
        />

        <TextInput
          id="notLivingHome"
          label="Phone number"
          note="(home)"
          value={formData.parent_not_living.home_phone}
          onChange={(value) => updateFormData("parent_not_living", "home_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "home_phone")}
          error={getError("parent_not_living", "home_phone")}
        />

        <TextInput
          id="notLivingWork"
          label="Phone number"
          note="(work)"
          value={formData.parent_not_living.work_phone}
          onChange={(value) => updateFormData("parent_not_living", "work_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "work_phone")}
          error={getError("parent_not_living", "work_phone")}
        />

        <TextInput
          id="notLivingEmail"
          label="Email address"
          value={formData.parent_not_living.email}
          onChange={(value) => updateFormData("parent_not_living", "email", value)}
          onBlur={() => handleBlur("parent_not_living", "email")}
          error={getError("parent_not_living", "email")}
          required
        />
      </div>

      {/* Next Button */}
      <div className="container py-3 py-lg-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center z-2">
            <button
              type="button"
              onClick={handleNext}
              className="btn globalbutton rounded-0 dark-text fw-bold fs-5 position-relative overflow-hidden"
            >
              Move to next step
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}