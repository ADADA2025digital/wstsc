import React from "react";
import TextInput from "./Inputs/TextInput.jsx";
import RadioGroup from "./Inputs/RadioGroup.jsx";
import { useEnrolmentForm } from "../Context/EnrolmentFormContext";

export default function FamilyDetailsPhase2() {
  const { formData, updateFormData } = useEnrolmentForm();

  return (
    <section className="container bg-light p-3">
      <div className="row">
        <TextInput
          id="firstContactName"
          label="NAME OF PARENT/CARER TO CONTACT FIRST"
          value={formData.first_contact.parent_name}
          onChange={(value) =>
            updateFormData("first_contact", "parent_name", value)
          }
        />
        <TextInput
          id="firstContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.first_contact.mobile_phone}
          onChange={(value) =>
            updateFormData("first_contact", "mobile_phone", value)
          }
        />

        <TextInput
          id="firstContactHome"
          label="Phone number"
          note="(home)"
          value={formData.first_contact.home_phone}
          onChange={(value) =>
            updateFormData("first_contact", "home_phone", value)
          }
        />

        <TextInput
          id="firstContactWork"
          label="Phone number"
          note="(work)"
          value={formData.first_contact.work_phone}
          onChange={(value) =>
            updateFormData("first_contact", "work_phone", value)
          }
        />

        <TextInput
          id="firstContactEmail"
          label="Contact email address"
          value={formData.first_contact.email}
          onChange={(value) => updateFormData("first_contact", "email", value)}
        />
      </div>

      <div className="row mt-4">
        <TextInput
          id="secondContactName"
          label="NAME OF PARENT/CARER TO CONTACT SECOND"
          value={formData.second_contact.parent_name}
          onChange={(value) =>
            updateFormData("second_contact", "parent_name", value)
          }
        />
        <TextInput
          id="secondContactMobile"
          label="Phone number"
          note="(mobile)"
          value={formData.second_contact.mobile_phone}
          onChange={(value) =>
            updateFormData("second_contact", "mobile_phone", value)
          }
        />

        <TextInput
          id="secondContactHome"
          label="Phone number"
          note="(home)"
          value={formData.second_contact.home_phone}
          onChange={(value) =>
            updateFormData("second_contact", "home_phone", value)
          }
        />

        <TextInput
          id="secondContactWork"
          label="Phone number"
          note="(work)"
          value={formData.second_contact.work_phone}
          onChange={(value) =>
            updateFormData("second_contact", "work_phone", value)
          }
        />

        <TextInput
          id="secondContactEmail"
          label="Contact email address"
          value={formData.second_contact.email}
          onChange={(value) => updateFormData("second_contact", "email", value)}
        />
      </div>

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
              onChange={(value) =>
                updateFormData("parent_not_living", "title", value)
              }
            />
          </div>
          <div className="col-md-4">
            <RadioGroup
              name="notLivingGender"
              label="Gender"
              value={formData.parent_not_living.gender}
              onChange={(value) =>
                updateFormData("parent_not_living", "gender", value)
              }
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
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
          onChange={(value) =>
            updateFormData(
              "parent_not_living",
              "relationship_to_student",
              value
            )
          }
        />

        <TextInput
          id="notLivingFamilyName"
          label="Family name"
          value={formData.parent_not_living.family_name}
          onChange={(value) =>
            updateFormData("parent_not_living", "family_name", value)
          }
        />

        <TextInput
          id="notLivingGivenName"
          label="Given name"
          value={formData.parent_not_living.given_name}
          onChange={(value) =>
            updateFormData("parent_not_living", "given_name", value)
          }
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
          onChange={(value) =>
            updateFormData("parent_not_living", "mobile_phone", value)
          }
        />

        <TextInput
          id="notLivingHome"
          label="Phone number"
          note="(home)"
          value={formData.parent_not_living.home_phone}
          onChange={(value) =>
            updateFormData("parent_not_living", "home_phone", value)
          }
        />

        <TextInput
          id="notLivingWork"
          label="Phone number"
          note="(work)"
          value={formData.parent_not_living.work_phone}
          onChange={(value) =>
            updateFormData("parent_not_living", "work_phone", value)
          }
        />

        <TextInput
          id="notLivingEmail"
          label="Email address"
          value={formData.parent_not_living.email}
          onChange={(value) =>
            updateFormData("parent_not_living", "email", value)
          }
        />
      </div>
    </section>
  );
}
