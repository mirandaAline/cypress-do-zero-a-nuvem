describe('testando o CAC-TAT', () => {
  beforeEach(() => {  
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () =>{
    const longText = Cypress._.repeat('abcdefg', 10)

    //cy.login(Cypress.env('username'), Cypress.env('password'))

    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('aline@miranda.com')
    cy.get('#open-text-area').type(longText, {delay:0})
   cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible') //precisa ter uma verificação de resultado esperado em todos os testes
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('aline@miranda,com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () =>{
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('aline@miranda.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
     .type('aline')
     .clear()
     .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
   cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', ()=> {
    const data = {
      firstName: 'Aline',
      lastName: 'Miranda',
      email: 'aline@gmail.com',
      text: 'obrigada'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um arquivo  da pasta fixtures', ()=>{
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json' , {action:'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
  cy.contains('a', 'Política de Privacidade')
   .should('have.attr', 'href', 'privacy.html')
   .and('have.attr', 'target', '_blank')
})

it('acessa a página de política de privacidade removendo o target e então clicando no link', () =>{
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})





})

