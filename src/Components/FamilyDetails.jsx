import React from 'react';
import TextInput from "./Inputs/TextInput.jsx";
import TextArea from "./Inputs/TextArea.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from '../Context/EnrolmentFormContext';

export default function FamilyDetails() {
  const { formData, updateFormData } = useEnrolmentForm();

  return (
    <section className="container bg-light p-3">
      <h2 className="h4 mb-3">
        B. Parent/Carer 1 with whom this student normally lives
      </h2>

      <div className="row align-items-end gap-5">
        <div className="col-md-4">
          <TextInput 
            id="title1" 
            label="Title" 
            note="(eg Mr/Ms/Mrs/Dr)"
            value={formData.parent_carer_1.title}
            onChange={(value) => updateFormData('parent_carer_1', 'title', value)}
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender1"
            label="Gender"
            value={formData.parent_carer_1.gender}
            onChange={(value) => updateFormData('parent_carer_1', 'gender', value)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <TextInput
          id="relationshiptostudent1"
          label="Relationship to student"
          note="(eg mother/father/carer)"
          value={formData.parent_carer_1.relationship_to_student}
          onChange={(value) => updateFormData('parent_carer_1', 'relationship_to_student', value)}
        />

        <TextInput 
          id="familyname1" 
          label="Family name"
          value={formData.parent_carer_1.family_name}
          onChange={(value) => updateFormData('parent_carer_1', 'family_name', value)}
        />

        <TextInput 
          id="givenname1" 
          label="Given name"
          value={formData.parent_carer_1.given_name}
          onChange={(value) => updateFormData('parent_carer_1', 'given_name', value)}
        />

        <TextInput 
          id="countryofbirth1" 
          label="Country of birth"
          value={formData.parent_carer_1.country_of_birth}
          onChange={(value) => updateFormData('parent_carer_1', 'country_of_birth', value)}
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
            onChange={(value) => updateFormData('parent_carer_2', 'title', value)}
          />
        </div>
        <div className="col-md-4">
          <RadioGroup
            name="gender2"
            label="Gender"
            value={formData.parent_carer_2.gender}
            onChange={(value) => updateFormData('parent_carer_2', 'gender', value)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <TextInput
          id="relationshiptostudent2"
          label="Relationship to student"
          note="(eg mother/father/carer)"
          value={formData.parent_carer_2.relationship_to_student}
          onChange={(value) => updateFormData('parent_carer_2', 'relationship_to_student', value)}
        />

        <TextInput 
          id="familyname2" 
          label="Family name"
          value={formData.parent_carer_2.family_name}
          onChange={(value) => updateFormData('parent_carer_2', 'family_name', value)}
        />

        <TextInput 
          id="givenname2" 
          label="Given name"
          value={formData.parent_carer_2.given_name}
          onChange={(value) => updateFormData('parent_carer_2', 'given_name', value)}
        />

        <TextInput 
          id="countryofbirth2" 
          label="Country of birth"
          value={formData.parent_carer_2.country_of_birth}
          onChange={(value) => updateFormData('parent_carer_2', 'country_of_birth', value)}
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
          onChange={(value) => updateFormData('parent_living_details', 'correspondence_name', value)}
        />
        <TextArea
          id="residentialAddress"
          label="Residential address"
          rows={2}
          note="(eg 1 High Street, Sydney, NSW, 2000)"
          value={formData.parent_living_details.residential_address}
          onChange={(value) => updateFormData('parent_living_details', 'residential_address', value)}
        />
        <div className="col-md-6">
          <RadioGroup
            name="isStudentResidentialAddress"
            label="Is this the residential address of the student to be enrolled?"
            value={formData.parent_living_details.is_student_residential_address ? 'Yes' : 'No'}
            onChange={(value) => updateFormData('parent_living_details', 'is_student_residential_address', value === 'Yes')}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
        </div>
        <TextInput 
          id="correspondenceAddress" 
          label="Correspondence address"
          value={formData.parent_living_details.correspondence_address}
          onChange={(value) => updateFormData('parent_living_details', 'correspondence_address', value)}
        />
        <p className="m-0">
          <i>
            If you have a correspondence address that is different to your
            residential address please write it below (eg PO Box 51, Sydney,
            NSW, 2001).
          </i>
        </p>
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
    </section>
  );
}