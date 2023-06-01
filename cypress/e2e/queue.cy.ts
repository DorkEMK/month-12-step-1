import { queueDequeueSteps, queueEnqueueSteps, queuePlaceholder } from "../constants/data/queue";
import { delayInMs } from "../constants/constants";
import { circle, routes } from "../constants/selectors";

describe("queue component", () => {
  beforeEach(() => {
    cy.visit(routes.queue);
    cy.getBySel("input").as("input");
    cy.getBySel("button-enqueue").as("button-enqueue");
    cy.getBySel("button-dequeue").as("button-dequeue");
    cy.getBySel("button-reset").as("button-reset");
  });

  it("should disable enqueue button when input is empty", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button-enqueue").should("be.disabled");
  });

  it("should render placeholder queue", () => {
    cy.get(circle.main).each((elem, index) => {
      cy.wrap(elem)
        .find(circle.circle)
        .should("have.css", "border-color", queuePlaceholder[index].style);
      cy.wrap(elem).find(circle.letter).should("have.text", queuePlaceholder[index].item);
      cy.wrap(elem).find(circle.index).should("have.text", queuePlaceholder[index].index);
      cy.wrap(elem).find(circle.head).should("have.text", queuePlaceholder[index].head);
      cy.wrap(elem).find(circle.tail).should("have.text", queuePlaceholder[index].tail);
    });
    cy.get("@button-enqueue").should("be.disabled");
    cy.get("@button-dequeue").should("be.disabled");
    cy.get("@button-reset").should("be.disabled");
  })

  it("should enqueue element to empty queue", () => {
    cy.get("@input").type(queueEnqueueSteps.toEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();

    queueEnqueueSteps.toEmpty.output.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
        cy.wrap(elem).find(circle.tail).should("have.text", step[index].tail);
      });
      cy.wait(delayInMs);
    });
    cy.get("@input").should("be.empty");
    cy.get("@button-dequeue").should("be.enabled");
    cy.get("@button-reset").should("be.enabled");
  });

  it("should enqueue element to non-empty queue", () => {
    cy.get("@input").type(queueEnqueueSteps.toEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();
    cy.get("@input").type(queueEnqueueSteps.toNonEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();

    queueEnqueueSteps.toNonEmpty.output.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
        cy.wrap(elem).find(circle.tail).should("have.text", step[index].tail);
      });
      cy.wait(delayInMs);
    });
    cy.get("@input").should("be.empty");
    cy.get("@button-dequeue").should("be.enabled");
    cy.get("@button-reset").should("be.enabled");

  });

  it("should dequeue single element from queue", () => {
    cy.get("@input").type(queueEnqueueSteps.toEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();

    cy.get("@button-dequeue").should("be.enabled").click();

    queueDequeueSteps.single.output.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
        cy.wrap(elem).find(circle.tail).should("have.text", step[index].tail);
      });
      cy.wait(delayInMs);
    });
    cy.get("@input").should("be.empty");
    cy.get("@button-dequeue").should("be.disabled");
    cy.get("@button-reset").should("be.disabled");

  });

  it("should dequeue non-single element from queue", () => {
    cy.get("@input").type(queueEnqueueSteps.toEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();
    cy.get("@input").type(queueEnqueueSteps.toNonEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();

    cy.get("@button-dequeue").should("be.enabled").click();

    queueDequeueSteps.nonSingle.output.forEach((step) => {
      cy.get(circle.main).each((elem, index) => {
        cy.wrap(elem)
          .find(circle.circle)
          .should("have.css", "border-color", step[index].style);
        cy.wrap(elem).find(circle.letter).should("have.text", step[index].item);
        cy.wrap(elem).find(circle.index).should("have.text", step[index].index);
        cy.wrap(elem).find(circle.head).should("have.text", step[index].head);
        cy.wrap(elem).find(circle.tail).should("have.text", step[index].tail);
      });
      cy.wait(delayInMs);
    });
    cy.get("@input").should("be.empty");
    cy.get("@button-dequeue").should("be.enabled");
    cy.get("@button-reset").should("be.enabled");

  });

  it("should reset queue", () => {
    cy.get("@input").type(queueEnqueueSteps.toEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();
    cy.get("@input").type(queueEnqueueSteps.toNonEmpty.input);
    cy.get("@button-enqueue").should("be.enabled").click();

    cy.get("@button-reset").should("be.enabled").click();

    cy.get(circle.main).each((elem, index) => {
      cy.wrap(elem)
        .find(circle.circle)
        .should("have.css", "border-color", queuePlaceholder[index].style);
      cy.wrap(elem).find(circle.letter).should("have.text", queuePlaceholder[index].item);
      cy.wrap(elem).find(circle.index).should("have.text", queuePlaceholder[index].index);
      cy.wrap(elem).find(circle.head).should("have.text", queuePlaceholder[index].head);
      cy.wrap(elem).find(circle.tail).should("have.text", queuePlaceholder[index].tail);
    });
    cy.get("@button-enqueue").should("be.disabled");
    cy.get("@button-dequeue").should("be.disabled");
    cy.get("@button-reset").should("be.disabled");
  });

});
