// Convert input string to event object
module.exports = function parseEvent(str) {
    const matches = str.match(/\[(.*)\] (.*)/);
    const [day, time] = matches[1].split(' ');
    const date = new Date(...day.split('-'), ...time.split(':'));
    return {date, minute: time.split(':')[1], event: matches[2]};
}