/**
 * Handles Discord message events.
 */
const MessageEvent = {
  name: 'message',
  execute(_, msg) {
    const isCommand = /^!(help|doc|example)s?/i.test(msg.content);
    if (msg.author.bot || !isCommand) return;

    return msg.channel.send('Try running a command with `/'+msg.content.slice(1).split(/\s+/ig)[0]+'`.');
  },
};

export default MessageEvent;
