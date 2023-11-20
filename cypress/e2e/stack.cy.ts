import { stackPushSteps, testStackPopSteps } from "../constants/data/stack";
import { delayInMs } from "../constants/constants";
import { circle, routes } from "../constants/selectors";

describe("stack component", () => {
  beforeEach(() => {
    cy.visit(routes.stack);
  });

  it("should disable button when input is empty", () => {
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-push").should("be.disabled");
  });

  it("should push element to empty stask", () => {
    cy.getBySel("input").type(stackPushSteps.input.toEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    stackPushSteps.output.toEmpty.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
      });
      cy.wait(delayInMs);
    });
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-pop").should("be.enabled");
    cy.getBySel("button-reset").should("be.enabled");
  });

  it("should push element to non-empty stask", () => {
    cy.getBySel("input").type(stackPushSteps.input.toEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    cy.getBySel("input").type(stackPushSteps.input.toNonEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    stackPushSteps.output.toNonEmpty.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
      });
      cy.wait(delayInMs);
    });
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-pop").should("be.enabled");
    cy.getBySel("button-reset").should("be.enabled");
  });

  it("should pop non-single element from stask", () => {
    cy.getBySel("input").type(stackPushSteps.input.toEmpty);
    cy.getBySel("button-push").should("be.enabled").click();
    cy.getBySel("input").type(stackPushSteps.input.toNonEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    cy.getBySel("button-pop").should("be.enabled").click();

    testStackPopSteps.output.nonSingle.forEach((step) => {
      cy.get(circle.main)
      .should("have.length", step.length)
      .each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
      });
      cy.wait(delayInMs);
    });
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-pop").should("be.enabled");
    cy.getBySel("button-reset").should("be.enabled");
  });

  it("should pop single element from stask", () => {
    cy.getBySel("input").type(stackPushSteps.input.toEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    cy.getBySel("button-pop").should("be.enabled").click();

    testStackPopSteps.output.single.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
      });
      cy.wait(delayInMs);
    });
    cy.get(circle.main).should("not.exist");
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-pop").should("be.disabled");
    cy.getBySel("button-reset").should("be.disabled");
  });

  it("should reset stask", () => {
    cy.getBySel("input").type(stackPushSteps.input.toEmpty);
    cy.getBySel("button-push").should("be.enabled").click();
    cy.getBySel("input").type(stackPushSteps.input.toNonEmpty);
    cy.getBySel("button-push").should("be.enabled").click();

    cy.getBySel("button-reset").should("be.enabled").click();

    cy.get(circle.main).should("not.exist");
    cy.getBySel("input").should("be.empty");
    cy.getBySel("button-pop").should("be.disabled");
    cy.getBySel("button-reset").should("be.disabled");
  });
});
