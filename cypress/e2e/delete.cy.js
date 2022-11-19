import * as payloadCharacter from '../fixtures/payloadCharacter.json'

describe('DELETE /back2thepast', function () {
  beforeEach(function () {
    cy.setToken()
    cy.back2ThePast()
  })

  it('Validate delete character', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
      Cypress.env('idCharacter', response.body.character_id)
    })

    cy.deleteCharacters().then(function (response) {
      expect(response.status).to.equal(204)
    })
  })

  it('Validate character not find', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
      Cypress.env('idCharacter', response.body.character_id)
    })

    cy.deleteCharacters().then(function (response) {
      expect(response.status).to.equal(204)
    })

    cy.deleteCharacters().then(function (response) {
      expect(response.status).to.equal(404)
    })
  })
})
