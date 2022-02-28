describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Person',
      username: 'tester',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Test Person logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color','rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test Person logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Author of Test blog')
      cy.get('#url').type('http://url.of.blog')
      cy.get('#submit-button').click()

      cy.contains('Test blog Author of Test blog').find('button')
    })

    describe('and when a note is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Another test blog',
          author: 'Another author',
          url: 'http://url.of.anotherblog'
        })
      })

      it('it can be liked', function() {
        cy.contains('Another test blog Another author')
          .contains('view')
          .click()

        cy.contains('likes 0').contains('like').click()
        cy.contains('likes 1')
      })
    })
  })
})