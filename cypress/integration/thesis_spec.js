describe('AngularJS project test', function () {

    var addProject = function (title, description) {
        // Add project
        cy.contains("Add project")
            .click();

        cy.get('#title')
            .type(title);

        cy.get('#description')
            .type(description);

        cy.contains("Submit")
            .click();

    };

    var cancelNewProject = function (title, description) {
        cy.contains("Add project")
            .click();

        cy.get('#title')
            .type(title);

        cy.get('#description')
            .type(description);

        cy.contains("Cancel")
            .click();
    };

    var deleteProject = function (title) {
        cy.get('.col-md-3').contains(title)
            .click();

        cy.contains("Delete project")
            .click();
    };

    var testProjectCount = function (count) {
        cy.get('.col-md-3 div button.list-group-item').should('have.length', count);
    };

    var editProject = function (oldProjectTitle, newTitle, newDescription) {
        cy.contains(oldProjectTitle)
            .click();
        cy.contains('Edit project')
            .click();
        cy.get('#title')
            .clear()
            .type(newTitle);

        cy.get('#description')
            .clear()
            .type(newDescription);

        cy.contains("Submit")
            .click();
    };

    before(function () {
        cy.visit('/');
    });


    afterEach(function () {
        cy.visit('/');
        cy.get('.col-md-3 div button.list-group-item').each(function (el, ind, list) {
            cy.get('.col-md-3 div button.list-group-item').first().click();

            cy.contains("Delete project")
                .click();
        })
    });

    it('Test version 1.0: create, select, delete, take time', function () {

        cy.contains('No project selected');
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');
        addProject('Third project', 'This is the last one');
        cancelNewProject('No project', 'Don\'t submit this');
        testProjectCount(3);

        deleteProject('Another project');
        testProjectCount(2);
        cy.contains('No project selected');

        // selects project
        cy.contains('My project title')
            .click();

        cy.get('h1').contains('My project title');

        // take time
        cy.get('button.btn-lg.btn-info').click()
            .wait(1001)
            .click();

        // check that time was registered
        cy.contains('0h 0min 1s');

        cy.visit('/');

        cy.contains('My project title')
            .click();
        cy.contains('0h 0min 1s');
    });

    it('Test version 1.1: mark as done', function () {
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');

        cy.get('#isDone')
            .click();

        cy.get('h1>span');
        cy.get('.col-md-3 span.glyphicon-ok').should('have.length', 1);
    });

    it('Test version 1.2: edit project', function () {
        addProject('My project title', 'This is something absolutely great');
        addProject('Another project', 'This is something else');

        editProject('My project title', 'Totally new project title', 'New description');
        testProjectCount(2);

        cy.contains('Edit project').click();

        cy.get('input[name="title"]')
            .clear()
            .type("This is not going to be here");
        cy.get('h1').contains('This is not going to be here');
        cy.contains('Cancel').click();

        cy.contains('Totally new project title'); // select latest project
        cy.get('h1').contains('Totally new project title');
    });

});
