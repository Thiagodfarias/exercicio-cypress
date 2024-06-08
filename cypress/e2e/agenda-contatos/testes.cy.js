/// <reference types="cypress" />

describe('Testes de App de Contatos', () => {
    
    beforeEach(()=>{
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('deve testar o App', () => {
        cy.get('header > h1').should('have.length.greaterThan', 0)
        cy.get('form > input').should('have.length', 3)
        cy.screenshot('tela-app')
    })

    it('deve incluir um contato', () => {
        cy.get('[type="text"]').type('Thiago Monte de Farias')
        cy.get('[type="email"]').type('thiago.monte@test.com.br')
        cy.get('[type="tel"]').type('92 99999 9999')
        cy.get('.adicionar').click()
        cy.screenshot('tela-inclusao-contato')
    })  
    
    it('deve ativar edição', () => {
        cy.get(':nth-child(2) > .sc-gueYoa > .edit').click()
        cy.get('[type="text"]').should('have.length.greaterThan', 0)
        cy.screenshot('tela-edicao')
    })

    it('deve alterar o contato selecionado', () => {
        cy.get('.edit').first().click()
        cy.get('[type="text"]').clear()
        cy.get('[type="text"]').type('Thiago Monte de Farias')
        cy.get('[type="email"]').clear()
        cy.get('[type="email"]').type('thiago.monte@test.com.br')
        cy.get('[type="tel"]').clear()
        cy.get('[type="tel"]').type('92 99999 9999')
        cy.get('.alterar').click()
        cy.screenshot('tela-alteracao')
    })

    it('Deve apagar contato', () => {
        
        cy.get('.delete').last().click()
        cy.on('window:alert', (conteudo) => {
            expect(conteudo).contain('Contato deletado')
        })
    })
})