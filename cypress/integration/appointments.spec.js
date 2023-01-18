describe("Appointments", () => {
  beforeEach(() => {
    //reset db before each test to keep our data fresh and not fail tests
    cy.request("GET", "/api/debug/reset");
    //visit root of localhost
    cy.visit("/");

    //look for element that has text Monday
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //click the FIRST element with an alt=Add (add appt button)
    cy.get("[alt=Add]").first().click();

    //find the input form by data-testid we added, type student name
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");

    //find interviewer with alt='Sylvia Palmer' and click it
    cy.get("[alt='Sylvia Palmer']").click();

    //find an element with text Save and click it
    cy.contains("Save").click();

    //check for an element with the saved appointment student/interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //since cypress has on onHover function, we get hidden edit button and force click it
    cy.get("[alt=Edit]").first().click({ force: true });

    //find new interviewer with alt='Tori Malcolm' and click it
    cy.get("[alt='Tori Malcolm']").click();

    //we first clear the student name input field and then type a new name
    cy.get('[data-testid="student-name-input"]').clear().type("The Batman");

    //find an element with text Save and click it
    cy.contains("Save").click();

    //check for an appointment element with the new student/interviewer
    cy.contains(".appointment__card--show", "The Batman");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    //since cypress has on onHover function, we get hidden delete button and force click it
    cy.get("[alt=Delete]").click({ force: true });

    //find the confirm button on the confirmation mode and click it
    cy.contains("Confirm").click();

    //check for a 'deleting' message while it processes
    cy.contains("Terminating").should("exist");

    //check that the 'deleting' message is now gone
    cy.contains("Terminating").should("not.exist");

    //check that the appointment no longer exists
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
