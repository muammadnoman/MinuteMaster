
export class BookCasePage {
    createNewBookCase(bookCaseName) {
        cy.get('.fixed').should('not.exist') //loader should not exist
        cy.get("button[tabindex$='0'][type$='button']").eq(1).contains('Create new Bookcase').should('be.visible').click()  // Click create new bookcase

        cy.get('[class*="MuiDialog-root backdrop-blur-sm bg-white/30 MuiModal-root css-"] h2[data-sentry-element="DialogTitle"]').should('be.visible').and('contain.text', 'Create a new Bookcase')  // Validate modal title
        cy.get('.fixed').should('not.exist') //loader should not exist
        cy.get('[class*="MuiDialog-root backdrop-blur-sm bg-white/30 MuiModal-root css-"] #bookcaseName').should('be.visible').type(bookCaseName).and('contain.value', bookCaseName).wait(500) // Type new bookcase name
        cy.get('[class*="MuiDialog-root backdrop-blur-sm bg-white/30 MuiModal-root css-"] button[data-sentry-element="Button"]').should('be.visible').and('contain.text', 'Create new Bookcase').click()  // Save the new bookcase
    }
    selectBookCase(bookCaseName) {
        cy.get('[class="py-1 cursor-pointer hover:bg-gray-100"]').contains(bookCaseName).should('exist').click()
        this.validateBookCase(bookCaseName)
    }
    validateBookCase(bookCaseName) {
        const upperCaseName = bookCaseName.toUpperCase()
        cy.get('.text-3xl').should('be.visible').and('contain.text', upperCaseName)
    }
    addNewShelf(shelfName, bookCaseName) {
        cy.get('[data-sentry-component="SortControl"] label').should('exist').and('contain.text', 'Sort By')
        cy.get('.fixed').should('not.exist') //loader should not exist
        cy.get('button[data-sentry-element="Button"]').should('be.visible').and('contain.text', 'Add a Shelf').click().wait(1000)
        cy.get('.fixed').should('not.exist') //loader should not exist
        cy.get('[aria-describedby="modal-to-add-a-shelf"] h1').should('contain.text', 'Add Bookshelf').and('be.visible')
        cy.get('[data-sentry-element="FormLabel"]').should('be.visible').and('contain.text', 'Shelf Name') //label
        cy.get('input[id="shelfName"]').should('be.visible').type(shelfName).and('contain.value', shelfName) //input
        cy.get('[aria-describedby="modal-to-add-a-shelf"] .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Confirm').click() //Confirm
        cy.get('.p-8').should('not.exist') //modal should be closed

        this.validateBookCase(bookCaseName) //Validate BookCase
        cy.get('.text-2xl').should('exist').and('contain.text', shelfName) //Validate created bookShelf
    }
    expandBookCaseMenu() {
        cy.get('[data-sentry-component="NavList"]:nth-child(1) .MuiListItemText-primary').should('be.visible').and('contain.text', 'Bookcases').click().wait(1000)
    }
    deleteBookCase(bookCaseName) {
        cy.get('[class="py-1 cursor-pointer hover:bg-gray-100"]').contains(bookCaseName).parents('div[class="py-1 cursor-pointer hover:bg-gray-100"]').find('[data-sentry-element="IconButton"][data-sentry-source-file="ShowBookcases.tsx"]').click() //3dots
        cy.get('[role="menuitem"]:nth-child(2)').should('exist').and('contain.text', 'Delete').click({ force: true }) //Delete
        cy.verifyToast('Bookcase deleted successfully')
    }
    deleteBookShelf(bookShelfName) {
        cy.get('[data-sentry-source-file="BookshelfDisplay.tsx"]').should('exist') //bookshelfs should be shown
        cy.get('[data-sentry-source-file="BookshelfDisplay.tsx"] p.text-black').contains(bookShelfName)
            .parents('[data-sentry-source-file="BookshelfDisplay.tsx"] div.mb-1.py-1').find('[data-sentry-element="IconButton"]').click() //3dot
        cy.get('[role="menuitem"]:nth-child(2)').should('exist').and('contain.text', 'Delete').click({ force: true }) //Delete

        //Validate deletion
        cy.get('[data-sentry-source-file="BookshelfDisplay.tsx"] p.text-black').contains(bookShelfName).should('not.exist')
    }
    selectAgenda(bookShelfName, agendaTitle) {
        cy.get('[class="manropeFont mb-8"]').contains(bookShelfName) //Find bookShelf
            .parents('[class="manropeFont mb-8"]').find('[class="bookcover-bg pt-6 pb-2"]')
            .contains(agendaTitle).parents('[class="manropeFont mb-8"] a[href*="/agenda/"]').should('be.visible').click({ force: true })//select agenda
        cy.url().should('include', '/agenda')
    }
    deleteAgenda(agendaTitle) {
        cy.url().should('include', '/agenda')
        cy.get('.m-4 .MuiIconButton-sizeMedium').should('be.visible').click() //Delete icon
        //Confirmation modal
        cy.get('h4[style="width: 100%; text-align: center;"]').should('be.visible').and('contain.text', 'Delete Pack?')
        cy.get('p[style*="color: rgb(119, 119, 119);"]').should('be.visible').and('contain.text', 'All information within the pack will be deleted')
        cy.get('input[class*="MuiInputBase-input MuiOutlinedInput-input css-"]').should('exist').type('Delete') //confirm deletion
        cy.get('.MuiButton-containedError').should('be.visible').and('contain.text', 'YES').click() //YES in RED
        //Validate Deletion
        cy.url().should('include', '/bookcase').wait(2000)
        cy.contains(agendaTitle).should('not.exist')
    }
    archiveAgenda(agendaTitle) {
        cy.url().should('include', '/agenda')
        cy.get('.m-4 .MuiButton-outlined').should('be.visible').and('contain.text', 'Archive Pack').click() //Archive Pack
        //Validate Archived agenda should not be shown
        cy.url().should('include', '/bookcase').wait(3000)
        cy.contains(agendaTitle).should('not.exist')
    }
    validateToast(message) {
        cy.get('.Toastify__toast').should('be.visible').and('contain.text', message)
        cy.get('.Toastify__toast').should('not.exist')
    }
    createNewAgenda(bookShelfName, agendaTitle, agendaDate, agendaTime, meetingLink, agendaLocation, meetingDetail) {
        cy.get('.fixed').should('not.exist') //loader should not exist
        cy.get('[data-sentry-component="ShelfComponent"]').contains(bookShelfName)
            .parents('[class="manropeFont mb-8"]').find('.bookshelf-wrapper a[href*="/agenda/edit?bookshelfId="]').should('exist').click({ force: true }) //Create New Agenda
        cy.url().should('include', '/agenda/edit')
        cy.get('[class*="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary css-"]').eq(1).should('contain.text', bookShelfName) //bookShelfName dropdown

        cy.get('input[placeholder="Title"]').should('be.visible').clear().type(agendaTitle).should('contain.value', agendaTitle) //Title
        cy.get('input[placeholder="DD/MM/YYYY"]').should('be.visible').clear().type(agendaDate).and('contain.value', agendaDate)  //Date
        cy.get('input[placeholder="hh:mm"]').should('exist').type(agendaTime)  //Time
        cy.get('input[placeholder="MEETING LINK"]').type(meetingLink).should('contain.value', meetingLink) //meetingLink
        cy.get('[placeholder="LOCATION"]').should('exist').clear().type(agendaLocation) //agendaLocation
        cy.get('[placeholder="Enter additional meeting details (e.g., password, phone number)"]').clear().type(meetingDetail).should('contain.value', meetingDetail) //meetingDetail
        cy.get('[class*="MuiTypography-root MuiTypography-body2 css-"]').should('exist').and('contain.text', 'Saved')
    }
    addAgendaItem(agendaItem, agendaOwner, duration) {
        cy.get('button[data-sentry-source-file="AgendaItemList.tsx"]').scrollIntoView().should('be.visible').and('contain.text', 'Add Agenda Item').click().wait(1000) //Add Agenda Item
        cy.get('[class*="MuiTableRow-root cursor-grabbing css-"]').last().within(() => {
            cy.get('div[data-sentry-component="Input"]').eq(0).should('be.visible').type(agendaItem).and('contain.text', agendaItem)
            cy.get('div[data-sentry-component="Input"]').eq(1).should('be.visible').type(agendaOwner).and('contain.text', agendaOwner)
            cy.get('div[data-sentry-component="Input"]').eq(2).should('be.visible').type(duration)
        })
    }
    publishAgenda(recipient, recipientNote) {
        cy.get('.MuiButton-containedPrimary[data-sentry-source-file="CreateAgendaHeader.tsx"]').scrollIntoView().should('be.visible').and('contain.text', 'Publish').click().wait(3000) //Publish

        //Select Recipient
        cy.get('h2[class="text-primary-mm text-2xl font-medium m-0"]').if('visible').then((ele) => {
            cy.wrap(ele).should('be.visible').and('contain.text', 'Publish Pack') //Publish Pack
        }).else().then(() => {
            cy.get('.MuiButton-containedPrimary[data-sentry-source-file="CreateAgendaHeader.tsx"]').scrollIntoView().should('be.visible').and('contain.text', 'Publish').click() //Publish
        })
        cy.get('h2[class="text-primary-mm text-2xl font-medium m-0"]').should('be.visible').and('contain.text', 'Publish Pack') //Publish Pack
        cy.get('.mb-4.leading-6').eq(1).should('be.visible').and('contain.text', 'Who will be attending?') //Who will be attending?
        cy.get('.p-2.flex.justify-between').contains(recipient).click() // Select recepient

        cy.get('.mb-4.leading-6').eq(0).should('be.visible').and('contain.text', 'Add note for recipients:') //Add note for recipients:
        cy.get('[placeholder="Write a short note..."]').should('be.visible').clear().type(recipientNote).and('contain.value', recipientNote)

        cy.get('.text-primary-mm.text-2xl.font-medium.m-0').should('contain', 'Publish Pack').and('be.visible').wait(1000)
        cy.get('div[class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-2xl p-6 space-y-4"]').should('contain.text', 'Add note for recipients:').and('be.visible')
        cy.get('.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label.css-1ms20a2').should('contain.text', 'Send Notification').and('be.visible')

        cy.get('[data-sentry-element="Modal"] .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Publish').click() //Publish
    }
    produceMinutesFromTranscriptText(agendaTitle, instruction) {
        cy.get('.gap-2.m-4 .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Produce Meeting Minutes').click() //Produce Meeting Minutes
        cy.url().should('include', '/produce-meeting-minutes')
        cy.get('[data-sentry-component="TipTapDetails"] h1[class*="text-primary-mm"]').should('be.visible').and('contain.text', agendaTitle)
        cy.get('.text-xl.text-primary-mm').should('contain.text', 'Meeting Minutes').and('be.visible')  //Meeting Minutes

        cy.contains('Produce Minutes Draft from Transcript').should('be.visible').click() //Produce Minutes Draft from Transcript
        //Modal to select File OR Text
        cy.get('.mb-0.text-center').should('contain.text', 'Please select your transcript input type').and('be.visible')
        cy.get('.popup-container .MuiButton-containedPrimary').contains('Text').should('be.visible').click() //Text
        cy.get("textarea[class='w-full rounded-lg focus:outline-none border border-gray-300 p-5 resize-none h-full']").type(instruction)
        cy.get('.popup-container .MuiButton-containedPrimary').contains('Send').should('be.visible').click() //Send

        cy.get('[data-sentry-element="EditorContent"]').should('be.visible').wait(3000) //Content should be visible
    }
    produceMinutesFromTranscriptFile(agendaTitle, file) {
        cy.get('.gap-2.m-4 .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Produce Meeting Minutes').click() //Produce Meeting Minutes
        cy.url().should('include', '/produce-meeting-minutes')
        cy.get('[data-sentry-component="TipTapDetails"] h1[class*="text-primary-mm"]').should('be.visible').and('contain.text', agendaTitle)
        cy.get('.text-xl.text-primary-mm').should('contain.text', 'Meeting Minutes').and('be.visible')  //Meeting Minutes

        cy.contains('Produce Minutes Draft from Transcript').should('be.visible')//Produce Minutes Draft from Transcript
        cy.get('input[accept=".docx,.txt,.doc"]').attachFile(file, { force: true }) //Upload file
        cy.get('[data-sentry-element="EditorContent"]').should('be.visible').wait(3000) //Content should be visible
    }
    produceMinutesFromRecording(agendaTitle, file) {
        cy.get('.gap-2.m-4 .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Produce Meeting Minutes').click() //Produce Meeting Minutes
        cy.url().should('include', '/produce-meeting-minutes')
        cy.get('[data-sentry-component="TipTapDetails"] h1[class*="text-primary-mm"]').should('be.visible').and('contain.text', agendaTitle)
        cy.get('.text-xl.text-primary-mm').should('contain.text', 'Meeting Minutes').and('be.visible')  //Meeting Minutes

        cy.contains('Produce Minutes Draft from Meeting Recording').should('be.visible') //Produce Minutes Draft from Meeting Recording
        cy.get('input[accept=".docx,.txt,.doc"]').attachFile(file, { force: true }) //Upload file
        cy.wait(5000)
        cy.get('[data-sentry-element="EditorContent"]').should('be.visible').wait(3000) //Content should be visible
    }
    produceTemplateFromAgendaOnly(agendaTitle) {
        cy.get('.gap-2.m-4 .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Produce Meeting Minutes').click() //Produce Meeting Minutes
        cy.url().should('include', '/produce-meeting-minutes')
        cy.get('[data-sentry-component="TipTapDetails"] h1[class*="text-primary-mm"]').should('be.visible').and('contain.text', agendaTitle)
        cy.get('.text-xl.text-primary-mm').should('contain.text', 'Meeting Minutes').and('be.visible')  //Meeting Minutes

        cy.contains('Generate a Simple Template from Agenda Only').should('be.visible').click() //Generate a Simple Template from Agenda Only
        cy.wait(5000)
        cy.get('[data-sentry-element="EditorContent"]').should('be.visible').wait(3000) //Content should be visible
    }
    startWithBlankCanvas(agendaTitle) {
        cy.get('.gap-2.m-4 .MuiButton-containedPrimary').should('be.visible').and('contain.text', 'Produce Meeting Minutes').click() //Produce Meeting Minutes
        cy.url().should('include', '/produce-meeting-minutes')
        cy.get('[data-sentry-component="TipTapDetails"] h1[class*="text-primary-mm"]').should('be.visible').and('contain.text', agendaTitle)
        cy.get('.text-xl.text-primary-mm').should('contain.text', 'Meeting Minutes').and('be.visible')  //Meeting Minutes

        cy.contains('Start with a Blank Canvas').should('be.visible').click() //Start with a Blank Canvas
        cy.wait(5000)
        cy.get('[data-sentry-element="EditorContent"]').should('be.visible').wait(3000) //Content should be visible
    }
}