import * as user from '../fixtures/users.json'

Cypress.Commands.add('setToken', function () {
  cy.api({
    method: 'POST',
    url: '/sessions',
    body: user.user1
  }).then(function (response) {
    expect(response.status).to.equal(200)
    Cypress.env('token', response.body.token)
    Cypress.env('userId', response.body.user._id)
  })
})

Cypress.Commands.add('back2ThePast', function () {
  const characterId = Cypress.env('userId')
  cy.api({
    method: 'DELETE',
    url: `/back2thepast/${characterId}`
  }).then(function (response) {
    expect(response.status).to.equal(200)
  })
})

Cypress.Commands.add('PostCharacter', function (payload) {
  cy.api({
    method: 'POST',
    url: '/characters',
    body: payload,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response
  })
})

Cypress.Commands.add('getCharacters', function (payload) {
  cy.api({
    method: 'GET',
    url: '/characters',
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response
  })
})

Cypress.Commands.add('searchCharacters', function (payload) {
  cy.api({
    method: 'GET',
    url: '/characters',
    qs: { name: payload },
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response
  })
})

Cypress.Commands.add('searchIdCharacters', function () {
  cy.api({
    method: 'GET',
    url: `/characters/${Cypress.env('idCharacter')}`,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response
  })
})

Cypress.Commands.add('deleteCharacters', function () {
  cy.api({
    method: 'DELETE',
    url: `/characters/${Cypress.env('idCharacter')}`,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response
  })
})
