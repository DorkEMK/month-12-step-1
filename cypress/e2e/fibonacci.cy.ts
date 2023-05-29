import { testFibSteps } from "../constants/data";
import { delayShortInMs } from "../constants/delays";
import { circle, routes } from "../constants/selectors";

describe("fibonacci component", () => {
  beforeEach(() => {
    cy.visit(routes.fibonacci);
  });

  it("should disable button when input is empty", () => {
    cy.getBySel("input").should("be.empty");
    cy.getBySel("submit").should("be.disabled");
  });

  it("should render fibonacci array correctly", () => {
    cy.getBySel("input").type(testFibSteps.input);
    cy.getBySel("submit").should("be.enabled");

    cy.getBySel("submit").click();
    testFibSteps.output.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem).find(circle.letter).contains(step[index].item);
        cy.wrap(elem).find(circle.index).contains(step[index].index);
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
      });
      cy.wait(delayShortInMs);
    });
  });
});