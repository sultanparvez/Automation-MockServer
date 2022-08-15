/// <reference types="cypress"/>


describe("Mock Server Responser",()=>{
    it("Mock Server Response",()=>{
        cy.visit("/")
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },{
            statusCode:200,
            body: [
                {
                    "book_name": "RobotFramework",
                    "isbn": "144353",
                    "aisle": "982053"
                }
            ]
        }).as("BookRetrivals")
        cy.get('.btn-primary').click()
        cy.wait('@BookRetrivals')
        cy.get('p').then((element)=>{
            const actualText = element.text()
            expect(actualText.includes("Oops only 1 Book available")).to.be.true
        })
        cy.get('p').should('have.text','Oops only 1 Book available')
    })

})