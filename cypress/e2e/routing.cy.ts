import { routes } from "../constants/selectors";
import { routeTexts } from "../constants/text";

describe("app works correctly with routees", () => {
  beforeEach(() => {
    cy.visit(routes.home);
  });

  it("should open main page", () => {
    cy.contains(routeTexts.home);
  });

  it("should open string page", () => {
    cy.get(`a[href*="${routes.string}"]`).click();
    cy.contains(routeTexts.string);
  });

  it("should open fibonacci page", () => {
    cy.get(`a[href*="${routes.fibonacci}"]`).click();
    cy.contains(routeTexts.fibonacci);
  });

  it("should open fibonacci page", () => {
    cy.get(`a[href*="${routes.sorting}"]`).click();
    cy.contains(routeTexts.sorting);
  });

  it("should open stack page", () => {
    cy.get(`a[href*="${routes.stack}"]`).click();
    cy.contains(routeTexts.stack);
  });

  it("should open queue page", () => {
    cy.get(`a[href*="${routes.queue}"]`).click();
    cy.contains(routeTexts.queue);
  });

  it("should open list page", () => {
    cy.get(`a[href*="${routes.list}"]`).click();
    cy.contains(routeTexts.list);
  });
});
