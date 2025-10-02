import React, { useState } from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import TextArea from "./Inputs/TextArea.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function FamilyDetailsPhase3({ onNext }) {
  const { formData, updateFormData, validateField, getError, validateSection } = useEnrolmentForm();
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

  // Check if at least one emergency contact section is filled
  const isAtLeastOneEmergencyContactFilled = () => {
    const firstContactFilled = Object.values(formData.first_emergency_contact).some(value => 
      value !== '' && value !== null && value !== undefined
    );
    const secondContactFilled = Object.values(formData.second_emergency_contact).some(value => 
      value !== '' && value !== null && value !== undefined
    );
    
    return firstContactFilled || secondContactFilled;
  };

  const handleNext = () => {
    // Validate all sections in this component
    const parentNotLivingValid = validateSection('parent_not_living');
    const firstEmergencyValid = validateSection('first_emergency_contact');
    const secondEmergencyValid = validateSection('second_emergency_contact');
    
    // Check if at least one emergency contact is filled
    const hasAtLeastOneEmergencyContact = isAtLeastOneEmergencyContactFilled();
    
    if (parentNotLivingValid && firstEmergencyValid && secondEmergencyValid && hasAtLeastOneEmergencyContact) {
      setSectionError('');
      if (onNext) {
        onNext();
      }
    } else {
      if (!hasAtLeastOneEmergencyContact) {
        setSectionError('Please fill at least one emergency contact section (First Preference or Second Preference)');
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

      <div className="row">
        <TextInput
          id="notLivingEmail"
          label="Preferred email address for correspondence"
          value={formData.parent_not_living.email}
          onChange={(value) => updateFormData("parent_not_living", "email", value)}
          onBlur={() => handleBlur("parent_not_living", "email")}
          error={getError("parent_not_living", "email")}
        />
        
        <TextArea
          id="notLivingResidentialAddress"
          label="Residential address"
          rows={2}
          note="(eg 1 High Street, Sydney, NSW, 2000)"
          value={formData.parent_not_living.residential_address}
          onChange={(value) => updateFormData("parent_not_living", "residential_address", value)}
          onBlur={() => handleBlur("parent_not_living", "residential_address")}
          error={getError("parent_not_living", "residential_address")}
        />
        
        <div className="col-md-6">
          <RadioGroup
            name="doesStudentResideHere"
            label="Does the student sometimes reside at this address?"
            value={formData.parent_not_living.does_student_reside_here ? "yes" : "no"}
            onChange={(value) => updateFormData("parent_not_living", "does_student_reside_here", value === "yes")}
            onBlur={() => handleBlur("parent_not_living", "does_student_reside_here")}
            error={getError("parent_not_living", "does_student_reside_here")}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
          />
        </div>

        <TextArea
          id="notLivingCorrespondenceAddress"
          label="Correspondence address"
          rows={2}
          note="(If different from residential address)"
          value={formData.parent_not_living.correspondence_address}
          onChange={(value) => updateFormData("parent_not_living", "correspondence_address", value)}
          onBlur={() => handleBlur("parent_not_living", "correspondence_address")}
          error={getError("parent_not_living", "correspondence_address")}
        />
        <p>
          <i>
            If you have a correspondence address that is different to your
            residential address please write it below (eg PO Box 51, Sydney,
            NSW, 2001).
          </i>
        </p>
      </div>

      <div className="row mt-4">
        <h2 className="h4 dark-text mb-3">E. Additional emergency contacts</h2>
        <p className="mb-3">
          <i>
            Please nominate two people over the age of 18 years who may be
            contacted in the event of an emergency if the community language
            school is unable to contact the parents/carers listed in Section C.
            Please ensure that you have discussed with these people their
            willingness to be emergency contacts.
          </i>
        </p>

        {/* First Emergency Contact */}
        <h6>
          <span className="fw-bold">CONTACT DETAILS</span>{" "}
          <i>(first preference)</i>
        </h6>

        <TextInput
          id="firstEmergencyFamilyName"
          label="Family name"
          value={formData.first_emergency_contact.family_name}
          onChange={(value) => updateFormData("first_emergency_contact", "family_name", value)}
          onBlur={() => handleBlur("first_emergency_contact", "family_name")}
          error={getError("first_emergency_contact", "family_name")}
        />

        <TextInput
          id="firstEmergencyGivenName"
          label="Given name"
          value={formData.first_emergency_contact.given_name}
          onChange={(value) => updateFormData("first_emergency_contact", "given_name", value)}
          onBlur={() => handleBlur("first_emergency_contact", "given_name")}
          error={getError("first_emergency_contact", "given_name")}
        />

        <TextInput
          id="firstEmergencyRelationship"
          label="Relationship to student"
          note="(eg neighbour/aunt/uncle)"
          value={formData.first_emergency_contact.relationship_to_student}
          onChange={(value) => updateFormData("first_emergency_contact", "relationship_to_student", value)}
          onBlur={() => handleBlur("first_emergency_contact", "relationship_to_student")}
          error={getError("first_emergency_contact", "relationship_to_student")}
        />

        <p>
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include these in the comment box next to the number
            (eg Mondays and Tuesdays only)
          </i>
        </p>
        
        <TextInput
          id="firstEmergencyMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.first_emergency_contact.mobile_phone}
          onChange={(value) => updateFormData("first_emergency_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("first_emergency_contact", "mobile_phone")}
          error={getError("first_emergency_contact", "mobile_phone")}
        />
        
        <TextInput
          id="firstEmergencyHome"
          label="Phone number"
          note="(home)"
          value={formData.first_emergency_contact.home_phone}
          onChange={(value) => updateFormData("first_emergency_contact", "home_phone", value)}
          onBlur={() => handleBlur("first_emergency_contact", "home_phone")}
          error={getError("first_emergency_contact", "home_phone")}
        />

        <TextInput
          id="firstEmergencyWork"
          label="Phone number"
          note="(work)"
          value={formData.first_emergency_contact.work_phone}
          onChange={(value) => updateFormData("first_emergency_contact", "work_phone", value)}
          onBlur={() => handleBlur("first_emergency_contact", "work_phone")}
          error={getError("first_emergency_contact", "work_phone")}
        />

        {/* Second Emergency Contact */}
        <h6 className="mt-4">
          <span className="fw-bold">CONTACT DETAILS</span>{" "}
          <i>(second preference)</i>
        </h6>

        <TextInput
          id="secondEmergencyFamilyName"
          label="Family name"
          value={formData.second_emergency_contact.family_name}
          onChange={(value) => updateFormData("second_emergency_contact", "family_name", value)}
          onBlur={() => handleBlur("second_emergency_contact", "family_name")}
          error={getError("second_emergency_contact", "family_name")}
        />

        <TextInput
          id="secondEmergencyGivenName"
          label="Given name"
          value={formData.second_emergency_contact.given_name}
          onChange={(value) => updateFormData("second_emergency_contact", "given_name", value)}
          onBlur={() => handleBlur("second_emergency_contact", "given_name")}
          error={getError("second_emergency_contact", "given_name")}
        />

        <TextInput
          id="secondEmergencyRelationship"
          label="Relationship to student"
          note="(eg neighbour/aunt/uncle)"
          value={formData.second_emergency_contact.relationship_to_student}
          onChange={(value) => updateFormData("second_emergency_contact", "relationship_to_student", value)}
          onBlur={() => handleBlur("second_emergency_contact", "relationship_to_student")}
          error={getError("second_emergency_contact", "relationship_to_student")}
        />

        <p>
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include these in the comment box next to the number
            (eg Mondays and Tuesdays only)
          </i>
        </p>
        
        <TextInput
          id="secondEmergencyMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.second_emergency_contact.mobile_phone}
          onChange={(value) => updateFormData("second_emergency_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("second_emergency_contact", "mobile_phone")}
          error={getError("second_emergency_contact", "mobile_phone")}
        />

        <TextInput
          id="secondEmergencyHome"
          label="Phone number"
          note="(home)"
          value={formData.second_emergency_contact.home_phone}
          onChange={(value) => updateFormData("second_emergency_contact", "home_phone", value)}
          onBlur={() => handleBlur("second_emergency_contact", "home_phone")}
          error={getError("second_emergency_contact", "home_phone")}
        />

        <TextInput
          id="secondEmergencyWork"
          label="Phone number"
          note="(work)"
          value={formData.second_emergency_contact.work_phone}
          onChange={(value) => updateFormData("second_emergency_contact", "work_phone", value)}
          onBlur={() => handleBlur("second_emergency_contact", "work_phone")}
          error={getError("second_emergency_contact", "work_phone")}
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