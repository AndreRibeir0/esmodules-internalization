import Chalk from 'Chalk'
import ChalkTable from 'Chalk-Table'
import DraftLog from 'draftlog'

import Readline from 'readline'
import Person from './person.js'

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    } 

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = Readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = ChalkTable(this.getTableOptions(), data)

        this.print = console.draft(table)
        this.data = data
    }

    updateTable(item) {
        this.data.push(item)
        this.print(ChalkTable(this.getTableOptions(), this.data))
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close();
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: Chalk.cyan("ID") },
                { field: "vehicles", name: Chalk.cyan("Vehicles") },
                { field: "kmTraveled", name: Chalk.cyan("KM Traveled") },
                { field: "from", name: Chalk.cyan("From") },
                { field: "to", name: Chalk.cyan("To") },
        
            ]
        }
    }

}