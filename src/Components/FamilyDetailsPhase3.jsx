import React, { useState } from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function FamilyDetailsPhase2({ onNext }) {
  const { formData, updateFormData, validateField, getError } = useEnrolmentForm();
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

  // Check if a contact section is fully filled
  const isContactSectionFilled = (section) => {
    const sectionData = formData[section];
    
    // For first_contact and second_contact sections
    if (section === 'first_contact' || section === 'second_contact') {
      const requiredFields = ['parent_name', 'mobile_phone', 'email'];
      return requiredFields.every(field => 
        sectionData[field] !== null && sectionData[field] !== undefined && sectionData[field] !== ''
      );
    }
    
    // For parent_not_living section
    if (section === 'parent_not_living') {
      const requiredFields = [
        'title', 'gender', 'relationship_to_student', 
        'family_name', 'given_name', 'mobile_phone', 'email'
      ];
      return requiredFields.every(field => 
        sectionData[field] !== null && sectionData[field] !== undefined && sectionData[field] !== ''
      );
    }
    
    // For emergency contact sections
    if (section === 'first_emergency_contact' || section === 'second_emergency_contact') {
      const requiredFields = ['family_name', 'given_name', 'relationship_to_student', 'mobile_phone'];
      return requiredFields.every(field => 
        sectionData[field] !== null && sectionData[field] !== undefined && sectionData[field] !== ''
      );
    }
    
    return false;
  };

  // Check if at least one contact section is fully filled
  const isAtLeastOneContactSectionFilled = () => {
    return isContactSectionFilled('first_contact') || 
           isContactSectionFilled('second_contact') || 
           isContactSectionFilled('parent_not_living') ||
           isContactSectionFilled('first_emergency_contact') ||
           isContactSectionFilled('second_emergency_contact');
  };

  const handleNext = () => {
    // Check if at least one contact section is fully filled
    const hasAtLeastOneContactFilled = isAtLeastOneContactSectionFilled();
    
    if (hasAtLeastOneContactFilled) {
      setSectionError('');
      if (onNext) {
        onNext();
      }
    } else {
      setSectionError('Please complete all fields in at least one contact section (First Contact, Second Contact, Parents not living with student, or Additional emergency contacts) before proceeding to the next step.');
    }
  };

  return (
    <section className="container bg-light p-3">
      {/* New Section: Correspondence Address */}
      <div className="row mt-4">
        <h2 className="h4 mb-3">Correspondence Address</h2>
        
        {/* Preferred email address for correspondence */}
        <TextInput
          id="preferredEmail"
          label="Preferred email address for correspondence"
          value={formData.correspondence?.preferred_email || ''}
          onChange={(value) => handleInputChange("correspondence", "preferred_email", value)}
          onBlur={() => handleBlur("correspondence", "preferred_email")}
          error={getError("correspondence", "preferred_email")}
        />

        {/* Residential address */}
        <TextInput
          id="residentialAddress"
          label="Residential address (eg 1 High Street, Sydney, NSW, 2000)"
          value={formData.correspondence?.residential_address || ''}
          onChange={(value) => handleInputChange("correspondence", "residential_address", value)}
          onBlur={() => handleBlur("correspondence", "residential_address")}
          error={getError("correspondence", "residential_address")}
          required
        />

        {/* Does the student sometimes reside at this address? */}
        <div className="row mt-3">
          <div className="col-12">
            <label className="form-label fw-bold">
              Does the student sometimes reside at this address?
            </label>
            <div className="mt-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sometimesReside"
                  id="sometimesResideNo"
                  value="No"
                  checked={formData.correspondence?.sometimes_reside === "No"}
                  onChange={(e) => handleInputChange("correspondence", "sometimes_reside", e.target.value)}
                  onBlur={() => handleBlur("correspondence", "sometimes_reside")}
                />
                <label className="form-check-label" htmlFor="sometimesResideNo">
                  No
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sometimesReside"
                  id="sometimesResideYes"
                  value="Yes"
                  checked={formData.correspondence?.sometimes_reside === "Yes"}
                  onChange={(e) => handleInputChange("correspondence", "sometimes_reside", e.target.value)}
                  onBlur={() => handleBlur("correspondence", "sometimes_reside")}
                />
                <label className="form-check-label" htmlFor="sometimesResideYes">
                  Yes
                </label>
              </div>
            </div>
            {getError("correspondence", "sometimes_reside") && (
              <div className="text-danger small mt-1">
                {getError("correspondence", "sometimes_reside")}
              </div>
            )}
          </div>
        </div>

        {/* Correspondence address (if different from residential address) */}
        <TextInput
          id="correspondenceAddress"
          label="Correspondence address (if different from residential address)"
          value={formData.correspondence?.correspondence_address || ''}
          onChange={(value) => handleInputChange("correspondence", "correspondence_address", value)}
          onBlur={() => handleBlur("correspondence", "correspondence_address")}
          error={getError("correspondence", "correspondence_address")}
        />
      </div>

      {/* Section 1: First Contact */}
      <div className="row mt-4">
        <TextInput
          id="firstContactName"
          label="NAME OF PARENT/CARER TO CONTACT FIRST"
          value={formData.first_contact.parent_name}
          onChange={(value) => handleInputChange("first_contact", "parent_name", value)}
          onBlur={() => handleBlur("first_contact", "parent_name")}
          error={getError("first_contact", "parent_name")}
          required
        />
        <TextInput
          id="firstContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.first_contact.mobile_phone}
          onChange={(value) => handleInputChange("first_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("first_contact", "mobile_phone")}
          error={getError("first_contact", "mobile_phone")}
          required
        />

        <TextInput
          id="firstContactHome"
          label="Phone number"
          note="(home)"
          value={formData.first_contact.home_phone}
          onChange={(value) => handleInputChange("first_contact", "home_phone", value)}
          onBlur={() => handleBlur("first_contact", "home_phone")}
          error={getError("first_contact", "home_phone")}
        />

        <TextInput
          id="firstContactWork"
          label="Phone number"
          note="(work)"
          value={formData.first_contact.work_phone}
          onChange={(value) => handleInputChange("first_contact", "work_phone", value)}
          onBlur={() => handleBlur("first_contact", "work_phone")}
          error={getError("first_contact", "work_phone")}
        />

        <TextInput
          id="firstContactEmail"
          label="Contact email address"
          value={formData.first_contact.email}
          onChange={(value) => handleInputChange("first_contact", "email", value)}
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
          onChange={(value) => handleInputChange("second_contact", "parent_name", value)}
          onBlur={() => handleBlur("second_contact", "parent_name")}
          error={getError("second_contact", "parent_name")}
          required
        />
        <TextInput
          id="secondContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.second_contact.mobile_phone}
          onChange={(value) => handleInputChange("second_contact", "mobile_phone", value)}
          onBlur={() => handleBlur("second_contact", "mobile_phone")}
          error={getError("second_contact", "mobile_phone")}
          required
        />

        <TextInput
          id="secondContactHome"
          label="Phone number"
          note="(home)"
          value={formData.second_contact.home_phone}
          onChange={(value) => handleInputChange("second_contact", "home_phone", value)}
          onBlur={() => handleBlur("second_contact", "home_phone")}
          error={getError("second_contact", "home_phone")}
        />

        <TextInput
          id="secondContactWork"
          label="Phone number"
          note="(work)"
          value={formData.second_contact.work_phone}
          onChange={(value) => handleInputChange("second_contact", "work_phone", value)}
          onBlur={() => handleBlur("second_contact", "work_phone")}
          error={getError("second_contact", "work_phone")}
        />

        <TextInput
          id="secondContactEmail"
          label="Contact email address"
          value={formData.second_contact.email}
          onChange={(value) => handleInputChange("second_contact", "email", value)}
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
              onChange={(value) => handleInputChange("parent_not_living", "title", value)}
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
              onChange={(value) => handleInputChange("parent_not_living", "gender", value)}
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
          onChange={(value) => handleInputChange("parent_not_living", "relationship_to_student", value)}
          onBlur={() => handleBlur("parent_not_living", "relationship_to_student")}
          error={getError("parent_not_living", "relationship_to_student")}
          required
        />

        <TextInput
          id="notLivingFamilyName"
          label="Family name"
          value={formData.parent_not_living.family_name}
          onChange={(value) => handleInputChange("parent_not_living", "family_name", value)}
          onBlur={() => handleBlur("parent_not_living", "family_name")}
          error={getError("parent_not_living", "family_name")}
          required
        />

        <TextInput
          id="notLivingGivenName"
          label="Given name"
          value={formData.parent_not_living.given_name}
          onChange={(value) => handleInputChange("parent_not_living", "given_name", value)}
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
          onChange={(value) => handleInputChange("parent_not_living", "mobile_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "mobile_phone")}
          error={getError("parent_not_living", "mobile_phone")}
          required
        />

        <TextInput
          id="notLivingHome"
          label="Phone number"
          note="(home)"
          value={formData.parent_not_living.home_phone}
          onChange={(value) => handleInputChange("parent_not_living", "home_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "home_phone")}
          error={getError("parent_not_living", "home_phone")}
        />

        <TextInput
          id="notLivingWork"
          label="Phone number"
          note="(work)"
          value={formData.parent_not_living.work_phone}
          onChange={(value) => handleInputChange("parent_not_living", "work_phone", value)}
          onBlur={() => handleBlur("parent_not_living", "work_phone")}
          error={getError("parent_not_living", "work_phone")}
        />

        <TextInput
          id="notLivingEmail"
          label="Email address"
          value={formData.parent_not_living.email}
          onChange={(value) => handleInputChange("parent_not_living", "email", value)}
          onBlur={() => handleBlur("parent_not_living", "email")}
          error={getError("parent_not_living", "email")}
          required
        />
      </div>

      {/* Section E: Additional emergency contacts */}
      <div className="row mt-4">
        <h2 className="h4 mb-3">
          E. Additional emergency contacts
        </h2>
        <p>
          <i>
            Please provide details of two additional people who can be contacted in an emergency if parents/carers cannot be contacted.
          </i>
        </p>
        
        {/* First Emergency Contact */}
        <h6 className="fw-bold mt-3">First Emergency Contact</h6>
        <div className="row">
          <TextInput
            id="firstEmergencyFamilyName"
            label="Family name"
            value={formData.first_emergency_contact.family_name}
            onChange={(value) => handleInputChange("first_emergency_contact", "family_name", value)}
            onBlur={() => handleBlur("first_emergency_contact", "family_name")}
            error={getError("first_emergency_contact", "family_name")}
            required
          />

          <TextInput
            id="firstEmergencyGivenName"
            label="Given name"
            value={formData.first_emergency_contact.given_name}
            onChange={(value) => handleInputChange("first_emergency_contact", "given_name", value)}
            onBlur={() => handleBlur("first_emergency_contact", "given_name")}
            error={getError("first_emergency_contact", "given_name")}
            required
          />

          <TextInput
            id="firstEmergencyRelationship"
            label="Relationship to student"
            value={formData.first_emergency_contact.relationship_to_student}
            onChange={(value) => handleInputChange("first_emergency_contact", "relationship_to_student", value)}
            onBlur={() => handleBlur("first_emergency_contact", "relationship_to_student")}
            error={getError("first_emergency_contact", "relationship_to_student")}
            required
          />

          <TextInput
            id="firstEmergencyMobile"
            label="Phone number"
            note="(mobile)"
            value={formData.first_emergency_contact.mobile_phone}
            onChange={(value) => handleInputChange("first_emergency_contact", "mobile_phone", value)}
            onBlur={() => handleBlur("first_emergency_contact", "mobile_phone")}
            error={getError("first_emergency_contact", "mobile_phone")}
            required
          />

          <TextInput
            id="firstEmergencyHome"
            label="Phone number"
            note="(home)"
            value={formData.first_emergency_contact.home_phone}
            onChange={(value) => handleInputChange("first_emergency_contact", "home_phone", value)}
            onBlur={() => handleBlur("first_emergency_contact", "home_phone")}
            error={getError("first_emergency_contact", "home_phone")}
          />

          <TextInput
            id="firstEmergencyWork"
            label="Phone number"
            note="(work)"
            value={formData.first_emergency_contact.work_phone}
            onChange={(value) => handleInputChange("first_emergency_contact", "work_phone", value)}
            onBlur={() => handleBlur("first_emergency_contact", "work_phone")}
            error={getError("first_emergency_contact", "work_phone")}
          />
        </div>

        {/* Second Emergency Contact */}
        <h6 className="fw-bold mt-3">Second Emergency Contact</h6>
        <div className="row">
          <TextInput
            id="secondEmergencyFamilyName"
            label="Family name"
            value={formData.second_emergency_contact.family_name}
            onChange={(value) => handleInputChange("second_emergency_contact", "family_name", value)}
            onBlur={() => handleBlur("second_emergency_contact", "family_name")}
            error={getError("second_emergency_contact", "family_name")}
            required
          />

          <TextInput
            id="secondEmergencyGivenName"
            label="Given name"
            value={formData.second_emergency_contact.given_name}
            onChange={(value) => handleInputChange("second_emergency_contact", "given_name", value)}
            onBlur={() => handleBlur("second_emergency_contact", "given_name")}
            error={getError("second_emergency_contact", "given_name")}
            required
          />

          <TextInput
            id="secondEmergencyRelationship"
            label="Relationship to student"
            value={formData.second_emergency_contact.relationship_to_student}
            onChange={(value) => handleInputChange("second_emergency_contact", "relationship_to_student", value)}
            onBlur={() => handleBlur("second_emergency_contact", "relationship_to_student")}
            error={getError("second_emergency_contact", "relationship_to_student")}
            required
          />

          <TextInput
            id="secondEmergencyMobile"
            label="Phone number"
            note="(mobile)"
            value={formData.second_emergency_contact.mobile_phone}
            onChange={(value) => handleInputChange("second_emergency_contact", "mobile_phone", value)}
            onBlur={() => handleBlur("second_emergency_contact", "mobile_phone")}
            error={getError("second_emergency_contact", "mobile_phone")}
            required
          />

          <TextInput
            id="secondEmergencyHome"
            label="Phone number"
            note="(home)"
            value={formData.second_emergency_contact.home_phone}
            onChange={(value) => handleInputChange("second_emergency_contact", "home_phone", value)}
            onBlur={() => handleBlur("second_emergency_contact", "home_phone")}
            error={getError("second_emergency_contact", "home_phone")}
          />

          <TextInput
            id="secondEmergencyWork"
            label="Phone number"
            note="(work)"
            value={formData.second_emergency_contact.work_phone}
            onChange={(value) => handleInputChange("second_emergency_contact", "work_phone", value)}
            onBlur={() => handleBlur("second_emergency_contact", "work_phone")}
            error={getError("second_emergency_contact", "work_phone")}
          />
        </div>
      </div>

      {/* Section Error Message above the button */}
      {sectionError && (
        <div className="container py-3">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {sectionError}
              </div>
            </div>
          </div>
        </div>
      )}

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