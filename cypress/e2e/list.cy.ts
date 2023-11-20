import { list } from "../constants/data/list";
import { delayInMs, circleBorderColor } from "../constants/constants";
import { circle, routes } from "../constants/selectors";

describe("list component", () => {
  beforeEach(() => {
    cy.visit(routes.list);
  });

  it("should disable buttons when inputs are empty", () => {
    cy.getBySel("input-value").should("be.empty");
    cy.getBySel("input-index").should("be.empty");
    cy.getBySel("button-add-head").should("be.disabled");
    cy.getBySel("button-add-tail").should("be.disabled");
    cy.getBySel("button-add-index").should("be.disabled");
    cy.getBySel("button-delete-index").should("be.disabled");
  });

  it("should render initial stack", () => {
    cy.get(circle.main).as("circles").should("exist");
    cy.get("@circles").first().find(circle.head).should("have.text", list.headText);
    cy.get("@circles").last().find(circle.tail).should("have.text", list.tailText);

    cy.get(circle.main).each((elem, index) => {
      cy.wrap(elem)
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.default);
      cy.wrap(elem).find(circle.letter).should("not.be.empty");
      cy.wrap(elem).find(circle.index).should("have.text", String(index));
    });
  });

  it("should add element to head", () => {
    cy.getBySel("input-value").type(list.newValue);
    cy.getBySel("button-add-head").should("be.enabled").click();
    cy.get(circle.wrap).children().filter(circle.main).as("circles");
    cy.get("@circles").first().as("headCircle");
    cy.get("@headCircle").find(circle.head).as("extraCircle");

    cy.get("@circles").its("length").as("initLen").then(($initLen) => {
      cy.get("@extraCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.changing);
      cy.get("@extraCircle")
        .find(circle.letter)
        .should("have.text", list.newValue);

      cy.wait(delayInMs);

      cy.get("@headCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.modified);
      cy.get("@headCircle")
        .find(circle.letter)
        .should("have.text", list.newValue);

      cy.wait(delayInMs);

      cy.get("@headCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.default);
      cy.get("@circles").should("have.length", $initLen + 1);
    });
  });

  it("should add element to tail", () => {
    cy.getBySel("input-value").type(list.newValue);
    cy.getBySel("button-add-tail").should("be.enabled").click();
    cy.get(circle.wrap).children().filter(circle.main).as("circles");
    cy.get("@circles").last().as("tailCircle");
    cy.get("@tailCircle").find(circle.head).as("extraCircle");

    cy.get("@circles").its("length").as("initLen").then(($initLen) => {
      cy.get("@extraCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.changing);
      cy.get("@extraCircle")
        .find(circle.letter)
        .should("have.text", list.newValue);

      cy.wait(delayInMs);

      cy.get("@tailCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.modified);
      cy.get("@tailCircle")
        .find(circle.letter)
        .should("have.text", list.newValue);

      cy.wait(delayInMs);

      cy.get("@tailCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.default);
      cy.get("@circles").should("have.length", $initLen + 1);
    });
  });

  it("should remove element from head", () => {
    cy.get(circle.wrap).children(circle.main).as("circles");
    cy.get("@circles").first().as("headCircle");
    cy.get("@headCircle").find(circle.letter).invoke("text").as("value");
    cy.getBySel("button-delete-head").should("be.enabled").click();
    cy.get("@headCircle").find(circle.tail).as("extraCircle");

    cy.get("@circles").its("length").as("initLen").then(($initLen) => {
      cy.get("@headCircle")
        .children()
        .not(circle.extraCircle)
        .find(circle.letter)
        .should("have.text", "");
      cy.get("@extraCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.changing);
      cy.get("@value").then((value) => {
        cy.get("@extraCircle").find(circle.letter).should("have.text", value);
      });

      cy.wait(delayInMs);

      cy.get("@headCircle").find(circle.head).should("have.text", list.headText);
      cy.get("@circles").should("have.length", $initLen - 1);
    });
  });

  it("should remove element from tail", () => {
    cy.get(circle.wrap).children(circle.main).as("circles");
    cy.get("@circles").its("length").as("initLength");
    cy.get("@circles").last().as("tailCircle");
    cy.get("@tailCircle").find(circle.letter).invoke("text").as("value");
    cy.getBySel("button-delete-tail").should("be.enabled").click();
    cy.get("@tailCircle").find(circle.tail).as("extraCircle");

    cy.get("@circles").its("length").as("initLen").then(($initLen) => {
      cy.get("@tailCircle")
        .children()
        .not(circle.extraCircle)
        .find(circle.letter)
        .should("have.text", "");
      cy.get("@extraCircle")
        .find(circle.circle)
        .should("have.css", "border-color", circleBorderColor.changing);
      cy.get("@value").then((value) => {
        cy.get("@extraCircle").find(circle.letter).should("have.text", value);
      });

      cy.wait(delayInMs);

      cy.get("@tailCircle").find(circle.tail).should("have.text", list.tailText);
      cy.get("@circles").should("have.length", $initLen - 1);
    });
  });

  it("should add element by index", () => {
    cy.getBySel("input-value").type(list.newValue);
    cy.getBySel("input-index").type(list.index);
    cy.get(circle.wrap).children().filter(circle.main).as("circles");
    cy.get("@circles").first().as("headCircle");
    cy.getBySel("button-add-index").should("be.enabled").click();

    cy.get("@circles")
      .its("length")
      .as("initLen")
      .then(($initLen) => {
        cy.get("@headCircle").find(circle.head).as("extraCircle");
        cy.get("@extraCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);
        cy.get("@extraCircle")
          .find(circle.letter)
          .should("have.text", list.newValue);

        cy.wait(delayInMs);

        cy.get("@headCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);
        cy.get("@headCircle")
          .find(circle.head)
          .should("have.text", list.headText);
        cy.get("@circles").eq(1).find(circle.head).as("extraCircle");
        cy.get("@extraCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);
        cy.get("@extraCircle")
          .find(circle.letter)
          .should("have.text", list.newValue);

        cy.wait(delayInMs);

        cy.get("@circles")
          .eq(Number(list.index))
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.modified);

        cy.wait(delayInMs);

        cy.get("@circles").each(elem => {
          cy.wrap(elem)
            .find(circle.circle)
            .should("have.css", "border-color", circleBorderColor.default);
        });
        cy.get("@circles")
          .eq(Number(list.index))
          .find(circle.letter)
          .should("have.text", list.newValue);
        cy.get("@circles").should("have.length", $initLen + 1);
      });
  });

  it("should delete element by index", () => {
    cy.getBySel("input-value").type(list.newValue);
    cy.getBySel("input-index").type(list.index);
    cy.get(circle.wrap).children().filter(circle.main).as("circles");
    cy.get("@circles").first().as("headCircle");
    cy.getBySel("button-delete-index").should("be.enabled").click();

    cy.get("@circles")
      .its("length")
      .as("initLen")
      .then(($initLen) => {
        cy.get("@headCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);

        cy.wait(delayInMs);

        cy.get("@headCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);
        cy.get("@circles").eq(Number(list.index)).as("changingCircle");
        cy.get("@changingCircle")
          .children()
          .not(circle.extraCircle)
          .find(circle.letter)
          .should("have.text", "");
        cy.get("@changingCircle").find(circle.letter).invoke("text").as("value")
        cy.get("@changingCircle").find(circle.tail).as("extraCircle")
        cy.get("@extraCircle")
          .find(circle.circle)
          .should("have.css", "border-color", circleBorderColor.changing);
          cy.get("@value").then((value) => {
            cy.get("@extraCircle").find(circle.letter).should("have.text", value);
          });

        cy.wait(delayInMs);

        cy.get("@circles").each(elem => {
          cy.wrap(elem)
            .find(circle.circle)
            .should("have.css", "border-color", circleBorderColor.default);
        })
        cy.get("@circles").should("have.length", $initLen - 1);
      });
  });
});
