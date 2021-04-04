import chalk from 'chalk';
import { getExamples } from 'utils/three';
import { COMMAND_OPTION_TYPES } from 'constants';
import config from 'config';

const Examples = {
  name: 'examples',
  description: 'Searches https://threejs.org/examples for examples matching query.',
  options: [
    {
      name: 'query',
      description: 'Query to search related examples for',
      type: COMMAND_OPTION_TYPES.STRING,
      required: true,
    },
  ],
  async execute({ args }) {
    try {
      // Get tagged examples
      const examples = await getExamples();

      // Check for an example if key was specified
      const targetKey = args.join('_').toLowerCase();
      const target = examples.find(
        ({ name }) =>
          name === targetKey || name.split('_').every(frag => targetKey.includes(frag))
      );

      // Fuzzy search examples
      const results =
        (target && [target]) ||
        examples
          .filter(({ tags }) => args.some(tag => tags.includes(tag.toLowerCase())))
          .sort((a, b) => a - b)
          .filter(Boolean);

      switch (results.length) {
        case 0:
          // Handle no results
          return {
            title: `No examples were found for "${args.join(' ')}"`,
            description: `Discover an issue? You can report it [here](${config.github}).`,
          };
        case 1: {
          // Handle single result
          const [{ tags, name: title, ...rest }] = results;

          // List tags in result
          const description = `Tags: ${tags
            .map(tag => `[${tag}](${config.examples.url}?q=${tag})`)
            .join(', ')}`;

          return {
            title,
            description,
            ...rest,
          };
        }
        default:
          // Handle multiple results
          return {
            title: `Examples for "${args.join(' ')}"`,
            description: results
              .filter((_, index) => index < 10)
              .map(({ name, url }) => `**[${name}](${url})**`)
              .join('\n'),
          };
      }
    } catch (error) {
      console.error(chalk.red(`/examples ${args.join(' ')} >> ${error.stack}`));
    }
  },
};

export default Examples;
