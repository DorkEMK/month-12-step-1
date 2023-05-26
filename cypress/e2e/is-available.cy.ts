import { routes } from "../constants/selectors";

describe("service is available", () => {
  it("should be available", () => {
    cy.visit(routes.home);
  });
});
