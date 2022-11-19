import * as payloadCharacter from '../fixtures/payloadCharacter.json'

describe('GET /characters', function () {
  beforeEach(function () {
    cy.setToken()
    cy.back2ThePast()
  })

  it('Validate characters list', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
    })

    cy.GetCharacters().then(function (response) {
      expect(response.status).to.equal(200)
      expect(response.body).to.be.a('array')
      expect(response.body.length).greaterThan(0)
    })
  })

  it('Validate find characters by name', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
    })

    cy.searchCharacters(payloadCharacter.character.name).then(function (
      response
    ) {
      expect(response.status).to.equal(200)
      expect(response.body.length).to.equal(1)
      expect(response.body[0].name).to.equal('FoneMaster')
    })
  })

  it('Validate find characters by ID', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
      Cypress.env('idCharacter', response.body.character_id)
    })

    cy.searchCharacters(Cypress.env('idCharacter')).then(function (response) {
      expect(response.status).to.equal(200)
      expect(response.body.length).to.equal(1)
      expect(response.body[0].name).to.equal('FoneMaster')
    })
  })

  it.only('Validate characters not register', function () {
    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
      Cypress.env('idCharacter', response.body.character_id)
    })

    cy.back2ThePast()

    cy.searchIdCharacters().then(function (response) {
      expect(response.status).to.equal(404)
    })
  })
})
