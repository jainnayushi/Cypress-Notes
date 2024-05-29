// cypress/e2e/todo.cy.js

// Describe block to group related tests for the "Todo Application"
describe("Todo Application", () => {
  // beforeEach hook to run setup code before each test
  beforeEach(() => {
    // Visit the application URL before each test
    cy.visit("http://localhost:3000");
    // Note: Adjust the URL according to your development server
  });

  // Test to verify that existing todos are displayed correctly
  it("should display existing todos", () => {
    // Fetch todos from an external API and check the response
    cy.request("https://dummyjson.com/todos").then((response) => {
      // Ensure the response status is 200 (OK)
      expect(response.status).to.eq(200);
      // Extract todos from the response body
      const todos = response.body.todos;

      // Check if the list container exists in the DOM
      cy.get(".ant-list-items").should("exist");

      // Verify the number of displayed todos matches the fetched data
      cy.get(".ant-list-item").should("have.length", todos.length);
    });
  });

  // Test to verify adding a new todo
  it("should add a new todo", () => {
    const newTodoText = "New Cypress Todo";

    // Type new todo text in the input field and press Enter
    cy.get("input").type(newTodoText).type("{enter}");

    // Verify the new todo is added as the first item in the list
    cy.get(".ant-list-item").first().should("contain.text", newTodoText);
  });

  // Test to verify editing an existing todo
  it("should edit an existing todo", () => {
    const editedTodoText = "Edited Cypress Todo";

    // Edit the first todo in the list
    cy.get(".ant-list-item")
      .first()
      .within(() => {
        // Click the Edit button of the first todo
        cy.contains("Edit").click();
      });

    // Simulate user input in the prompt dialog for editing
    cy.window().then((win) => {
      // Stub the prompt to return the edited text
      cy.stub(win, "prompt").returns(editedTodoText);
    });

    // Confirm the edit action by clicking the Edit button again
    cy.get(".ant-list-item").first().contains("Edit").click();

    // Verify the edited todo text is displayed correctly
    cy.get(".ant-list-item").first().should("contain.text", editedTodoText);
  });

  // Test to verify deleting an existing todo
  it("should delete an existing todo", () => {
    // Get the initial number of todos in the list
    cy.get(".ant-list-item").then((initialItems) => {
      const initialLength = initialItems.length;

      // Delete the first todo in the list
      cy.get(".ant-list-item")
        .first()
        .within(() => {
          // Click the Delete button of the first todo
          cy.contains("Delete").click();
        });

      // Get the updated number of todos in the list
      cy.get(".ant-list-item").then((updatedItems) => {
        const updatedLength = updatedItems.length;

        // Verify the number of todos is reduced by one
        expect(updatedLength).to.equal(initialLength - 1);
      });
    });
  });
});

