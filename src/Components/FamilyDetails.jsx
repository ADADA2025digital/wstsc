import React, { useState } from 'react';
import TextInput from "./Inputs/TextInput.jsx";
import TextArea from "./Inputs/TextArea.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from '../Context/EnrolmentFormContext';

export default function FamilyDetails({ onNext }) {
  const { formData, updateFormData, validateField, getError, validateSection, isAtLeastOneParentSectionFilled } = useEnrolmentForm();
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
    const parent1Valid = validateSection('parent_carer_1');
    const parent2Valid = validateSection('parent_carer_2');
    const livingDetailsValid = validateSection('parent_living_details');
    
    // Check if at least one parent section is filled
    const hasAtLeastOneParent = isAtLeastOneParentSectionFilled();
    
    if (parent1Valid && parent2Valid && livingDetailsValid && hasAtLeastOneParent) {
      setSectionError('');
      if (onNext) {
        onNext();
      }
    } else {
      if (!hasAtLeastOneParent) {
        setSectionError('Please fill at least one parent/carer section (Parent/Carer 1 or Parent/Carer 2)');
      } else {
        setSectionError('Please fix the validation errors before proceeding to the next step.');
      }
    }
  };

  // Check if correspondence address should be shown
  const showCorrespondenceAddress = formData.parent_living_details.is_student_residential_address === false;

  return (
    <section className="container bg-light p-3">
      <h2 className="h4 mb-3">
        B. Parent/Carer 1 with whom this student normally lives
      </h2>

      {/* Section Error Message */}
      {sectionError && (
        <div className="alert alert-danger" role="alert">
          {sectionError}
        </div>
      )}

      <div className="row align-items-end gap-5">
        <div className="col-md-4">
          <TextInput 
            id="title1" 
            label="Title" 
            note="(eg Mr/Ms/Mrs/Dr)"
            value={formData.parent_carer_1.title}
            onChange={(value) => handleInputChange('parent_carer_1', 'title', value)}
            onBlur={() => handleBlur('parent_carer_1', 'title')}
            error={getError('parent_carer_1', 'title')}
            required
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender1"
            label="Gender"
            value={formData.parent_carer_1.gender}
            onChange={(value) => handleInputChange('parent_carer_1', 'gender', value)}
            onBlur={() => handleBlur('parent_carer_1', 'gender')}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            error={getError('parent_carer_1', 'gender')}
            required
          />
        </div>
      </div>

      <div className="row">
        <TextInput
          id="relationshiptostudent1"
          label="Relationship to student"
          note="(eg mother/father/carer)"
          value={formData.parent_carer_1.relationship_to_student}
          onChange={(value) => handleInputChange('parent_carer_1', 'relationship_to_student', value)}
          onBlur={() => handleBlur('parent_carer_1', 'relationship_to_student')}
          error={getError('parent_carer_1', 'relationship_to_student')}
          required
        />

        <TextInput 
          id="familyname1" 
          label="Family name"
          value={formData.parent_carer_1.family_name}
          onChange={(value) => handleInputChange('parent_carer_1', 'family_name', value)}
          onBlur={() => handleBlur('parent_carer_1', 'family_name')}
          error={getError('parent_carer_1', 'family_name')}
          required
        />

        <TextInput 
          id="givenname1" 
          label="Given name"
          value={formData.parent_carer_1.given_name}
          onChange={(value) => handleInputChange('parent_carer_1', 'given_name', value)}
          onBlur={() => handleBlur('parent_carer_1', 'given_name')}
          error={getError('parent_carer_1', 'given_name')}
          required
        />

        <TextInput 
          id="countryofbirth1" 
          label="Country of birth"
          value={formData.parent_carer_1.country_of_birth}
          onChange={(value) => handleInputChange('parent_carer_1', 'country_of_birth', value)}
          onBlur={() => handleBlur('parent_carer_1', 'country_of_birth')}
          error={getError('parent_carer_1', 'country_of_birth')}
          required
        />
      </div>

      <h2 className="h4 mb-3">
        B. Parent/Carer 2 with whom this student normally lives
      </h2>
      <div className="row align-items-end gap-5">
        <div className="col-md-4">
          <TextInput 
            id="title2" 
            label="Title" 
            note="(eg Mr/Ms/Mrs/Dr)"
            value={formData.parent_carer_2.title}
            onChange={(value) => handleInputChange('parent_carer_2', 'title', value)}
            onBlur={() => handleBlur('parent_carer_2', 'title')}
            error={getError('parent_carer_2', 'title')}
            required
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender2"
            label="Gender"
            value={formData.parent_carer_2.gender}
            onChange={(value) => handleInputChange('parent_carer_2', 'gender', value)}
            onBlur={() => handleBlur('parent_carer_2', 'gender')}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            error={getError('parent_carer_2', 'gender')}
            required
          />
        </div>
      </div>

      <div className="row">
        <TextInput
          id="relationshiptostudent2"
          label="Relationship to student"
          note="(eg mother/father/carer)"
          value={formData.parent_carer_2.relationship_to_student}
          onChange={(value) => handleInputChange('parent_carer_2', 'relationship_to_student', value)}
          onBlur={() => handleBlur('parent_carer_2', 'relationship_to_student')}
          error={getError('parent_carer_2', 'relationship_to_student')}
          required
        />

        <TextInput 
          id="familyname2" 
          label="Family name"
          value={formData.parent_carer_2.family_name}
          onChange={(value) => handleInputChange('parent_carer_2', 'family_name', value)}
          onBlur={() => handleBlur('parent_carer_2', 'family_name')}
          error={getError('parent_carer_2', 'family_name')}
          required
        />

        <TextInput 
          id="givenname2" 
          label="Given name"
          value={formData.parent_carer_2.given_name}
          onChange={(value) => handleInputChange('parent_carer_2', 'given_name', value)}
          onBlur={() => handleBlur('parent_carer_2', 'given_name')}
          error={getError('parent_carer_2', 'given_name')}
          required
        />

        <TextInput 
          id="countryofbirth2" 
          label="Country of birth"
          value={formData.parent_carer_2.country_of_birth}
          onChange={(value) => handleInputChange('parent_carer_2', 'country_of_birth', value)}
          onBlur={() => handleBlur('parent_carer_2', 'country_of_birth')}
          error={getError('parent_carer_2', 'country_of_birth')}
          required
        />
      </div>

      <h2 className="h4 mb-3">
        C. Parents/carers with whom this student normally lives{" "}
      </h2>

      <div className="row mt-4">
        <TextInput
          id="correspondenceName"
          label="Name to be used for all correspondence"
          note="(eg Mr and Mrs A Black, Ms B Green)"
          value={formData.parent_living_details.correspondence_name}
          onChange={(value) => handleInputChange('parent_living_details', 'correspondence_name', value)}
          onBlur={() => handleBlur('parent_living_details', 'correspondence_name')}
          error={getError('parent_living_details', 'correspondence_name')}
          required
        />
        <TextArea
          id="residentialAddress"
          label="Residential address"
          rows={2}
          note="(eg 1 High Street, Sydney, NSW, 2000)"
          value={formData.parent_living_details.residential_address}
          onChange={(value) => handleInputChange('parent_living_details', 'residential_address', value)}
          onBlur={() => handleBlur('parent_living_details', 'residential_address')}
          error={getError('parent_living_details', 'residential_address')}
          required
        />
        <div className="col-md-6">
          <RadioGroup
            name="isStudentResidentialAddress"
            label="Is this the residential address of the student to be enrolled?"
            value={formData.parent_living_details.is_student_residential_address === null ? '' : (formData.parent_living_details.is_student_residential_address ? 'Yes' : 'No')}
            onChange={(value) => handleInputChange('parent_living_details', 'is_student_residential_address', value === 'Yes')}
            onBlur={() => handleBlur('parent_living_details', 'is_student_residential_address')}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            error={getError('parent_living_details', 'is_student_residential_address')}
            required
          />
        </div>
        
        {/* Conditionally render correspondence address */}
        {showCorrespondenceAddress && (
          <>
            <TextInput 
              id="correspondenceAddress" 
              label="Correspondence address"
              value={formData.parent_living_details.correspondence_address}
              onChange={(value) => handleInputChange('parent_living_details', 'correspondence_address', value)}
              onBlur={() => handleBlur('parent_living_details', 'correspondence_address')}
              error={getError('parent_living_details', 'correspondence_address')}
            />
            <p className="m-0">
              <i>
                If you have a correspondence address that is different to your
                residential address please write it below (eg PO Box 51, Sydney,
                NSW, 2001).
              </i>
            </p>
          </>
        )}
        
        <p className="fw-bold mt-3">
          If the school needs to contact a parent/carer, please specify, in
          order of preference, who to contact
        </p>
        <p className="m-0">
          <i>
            If there are any special conditions or times relevant to any contact
            number, please include this in the comment box next to the number
            (eg Mondays and Tuesdays only).
          </i>
        </p>
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