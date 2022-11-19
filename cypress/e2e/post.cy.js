import * as payloadCharacter from '../fixtures/payloadCharacter.json'

describe('POST /characters', function () {
  beforeEach(function () {
    cy.setToken()
    cy.back2ThePast()
  })
  it('Validate register character ', function () {
    // const character = {
    //   name: 'FoneMaster',
    //   alias: 'Professor Fone',
    //   team: ['x-men', 'illuminatis'],
    //   active: true
    // }

    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
      expect(response.body.character_id.length).to.eql(24)
    })
  })

  it('Validate message duplicate register', function () {
    // const character = {
    //   name: 'FoneMaster',
    //   alias: 'Professor Fone',
    //   team: ['x-men', 'illuminatis'],
    //   active: true
    // }

    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(201)
    })

    cy.PostCharacter(payloadCharacter.character).then(function (response) {
      expect(response.status).to.equal(400)
    })
  })
})
