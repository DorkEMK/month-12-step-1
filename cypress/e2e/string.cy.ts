import { stringSteps } from "../constants/data/string";
import { delayInMs } from "../constants/constants";
import { circle, routes } from "../constants/selectors";

describe("string component", () => {
  beforeEach(() => {
    cy.visit(routes.string);
  });

  it("should disable button when input is empty", () => {
    cy.getBySel("input").should("be.empty");
    cy.getBySel("submit").should("be.disabled");
  });

  it("should reverse string correctly", () => {
    cy.getBySel("input").type(stringSteps.input);
    cy.getBySel("submit").should("be.enabled");

    cy.getBySel("submit").click();
    stringSteps.output.forEach((step) => {
      cy.get(circle.circle)
        .should("have.length", stringSteps.length)
        .each((elem, index) => {
          cy.wrap(elem).contains(step[index].item)
          cy.wrap(elem).should("have.css", "border-color", step[index].style);
        });
      cy.wait(delayInMs);
    });
  });
});
