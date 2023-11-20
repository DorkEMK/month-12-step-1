import { routes } from "../constants/selectors";
import { pageHeader } from "../constants/constants";

describe("app works correctly with routees", () => {
  beforeEach(() => {
    cy.visit(routes.home);
  });

  it("should open main page", () => {
    cy.contains(pageHeader.home);
  });

  it("should open string page", () => {
    cy.get(`a[href*="${routes.string}"]`).click();
    cy.contains(pageHeader.string);
  });

  it("should open fibonacci page", () => {
    cy.get(`a[href*="${routes.fibonacci}"]`).click();
    cy.contains(pageHeader.fibonacci);
  });

  it("should open fibonacci page", () => {
    cy.get(`a[href*="${routes.sorting}"]`).click();
    cy.contains(pageHeader.sorting);
  });

  it("should open stack page", () => {
    cy.get(`a[href*="${routes.stack}"]`).click();
    cy.contains(pageHeader.stack);
  });

  it("should open queue page", () => {
    cy.get(`a[href*="${routes.queue}"]`).click();
    cy.contains(pageHeader.queue);
  });

  it("should open list page", () => {
    cy.get(`a[href*="${routes.list}"]`).click();
    cy.contains(pageHeader.list);
  });
});
