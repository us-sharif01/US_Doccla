import { validUser } from "../fixtures/data";
import { clickElement, verifyTextVisible, clickButtonLabel, resetState, setFormField, typeBirthDate } from "../support/commands";

describe("Create a referral with no payment", () => {
    it("Should successfully get to the payment page", () => {
        resetState();
        cy.visit("https://www.scan.com");
        cy.wait(2000);
        clickButtonLabel("Accept");
        clickElement("Locations");
        verifyTextVisible("Scanning Locations");
        cy.get('input[type="text"]').type("Prime");
        clickElement("Prime Health - Manchester");
        cy.get(".relative.rounded-2xl.p-8.bg-pink-300").first().should("be.visible");
        cy.get('[data-testid="body-parts-input"]').eq(0).click();
        cy.contains("Ankle - Left").click();
        cy.get('button').contains('Find an appointment').click();
        cy.get('[data-testId="availability-item"]').first().click();
        clickButtonLabel("Continue");
        verifyTextVisible("About you");
        cy.get('select').select('Mr');
        setFormField('first_name', 'Firstname');
        setFormField('last_name', 'Lastname');
        cy.get('[type="radio"]').first().check();
        typeBirthDate("01", "01", "1990");
        clickButtonLabel("Continue");
        verifyTextVisible("How can we contact you?");
        setFormField("email", validUser.email);
        setFormField("phone", validUser.phone);
        cy.get('input[type="checkbox"]').click();
        clickButtonLabel("Continue");
        verifyTextVisible("What's your address?");
        setFormField("address_line_1", validUser.addressLine1);
        setFormField("address_line_2", validUser.addressLine2);
        setFormField("city", validUser.city);
        setFormField("postcode", validUser.postCode);
        clickButtonLabel("Continue");
        verifyTextVisible("Safety Questions");
        setFormField('booking_funnel_step2_form[scan_reason]', 'My body hurts');
        cy.get("input[value='false']").check().should("be.checked");
        clickButtonLabel("Continue to Payment");
        verifyTextVisible("Payment");
    })
})