export class ReusableCode {
  generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
  getFormattedDate(offsetDays = 0) {
    const date = new Date()
    date.setDate(date.getDate() + offsetDays) // Adjust date by offsetDays
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    const year = date.getFullYear()
    const formatedDate = `${day}/${month}/${year}`
    cy.log(formatedDate)
    return formatedDate
  }
}