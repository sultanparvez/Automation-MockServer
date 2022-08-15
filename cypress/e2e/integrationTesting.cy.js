/// <reference types="cypress"/>


describe("Integration Test",()=>{
    it("Integration Test",()=>{
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
                },
                    {
                        "book_name": "RobotFramework-2",
                        "isbn": "144353",
                        "aisle": "982053"
                }
            ]
        }).as("BookRetrivals")
        cy.get('.btn-primary').click()
        cy.wait('@BookRetrivals').then(({request,response})=>{  //can also use should
            cy.log(response.body.length)
             cy.get('tr').should('have.length',response.body.length+1)
        })
    })

})