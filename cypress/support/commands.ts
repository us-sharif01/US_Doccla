
// Reset cookies and storage
export function resetState () {
    cy.clearCookies();
    cy.clearLocalStorage();
}

export const verifyAndClickLink = (label: string) => {
    cy.contains("a", label).should("be.visible").click({ force: true});
};

export const clickElement = (text: string) => {
    cy.contains(text).click({ force: true});
};

export const clickButtonLabel = (label: string) => {
    cy.contains("button", label).click({ force: true});
};

export const typeBirthDate = (month: string, day: string, year: string) => {
    cy.get('[name="month"]').type(month);
    cy.get('[name="day"]').type(day);
    cy.get('[name="year"]').click().type(year);
};

export function verifyTextVisible(text: string, shouldBeVisible = true) {
    if (shouldBeVisible) {
        cy.contains(text).should("be.visible");
    } else {
        cy.contains(text).should("not.be.visible");
    }
};

// Function to set the value of a form field based on the name attribute
export function setFormField(name: string, value: string) {
    
    // Determine the type of input and perform the appropriate action
    cy.get(`[name="${name}"]`).then(($input) => {

        // Determine the type of the element
        const inputType = $input.prop("tagName").toLowerCase();
        const inputTypeAttr = $input.attr("type");

        // Handle different types of input
        if(inputType === "select") {

            // For <select> elements
            cy.wrap($input).select(value);
        }
        else if(inputTypeAttr === "checkbox" || inputTypeAttr === "radio") {

            // For checkboxes and radio buttons
            cy.wrap($input).check();
        }
        else {

            // For text inputs
            cy.wrap($input).type(value);
        }
    })
};