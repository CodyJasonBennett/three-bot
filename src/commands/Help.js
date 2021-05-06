import chalk from 'chalk';
import { formatList } from 'utils/discord';

const Help = {
  name: 'help',
  description: "Displays this bot's commands.",
  execute({ commands }) {
    try {
      const commandList = commands.map(({ name, options, description }) => {
        const args = options?.map(({ name }) => ` \`${name}\``) || '';

        return `**/${name}**${args} - ${description}`;
      });

      return {
        title: 'Commands',
        description: formatList(commandList),
      };
    } catch (error) {
      console.error(chalk.red(`/help >> ${error.stack}`));
    }
  },
};

export default Help;
