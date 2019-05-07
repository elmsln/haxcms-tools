const {Command, flags} = require('@oclif/command')

class LrnMathCommand extends Command {
  async run() {
    const {flags} = this.parse(LrnMathCommand)
  }
}

LrnMathCommand.description = `Convert "$$" to "<lrn-math>"`

LrnMathCommand.flags = {
}

module.exports = LrnMathCommand