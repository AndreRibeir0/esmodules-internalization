import DraftLog from 'draftlog'
import Chalk from 'Chalk'
import ChalkTable from 'Chalk-Table'
import Readline from 'readline'

import database from './../database.json'
import Person from './person.js'

DraftLog(console).addLineListener(process.stdin)
const DEFAULT_LANG = "pt-BR"

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: Chalk.cyan("ID") },
        { field: "vehicles", name: Chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: Chalk.cyan("KM Traveled") },
        { field: "from", name: Chalk.cyan("From") },
        { field: "to", name: Chalk.cyan("To") },

    ]
}

const table = ChalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)))
const print = console.draft(table)

const terminal = Readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})
