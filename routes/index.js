import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import tasks from './tasks';
import statuses from './statuses';

const controllers = [welcome, users, sessions, tasks, statuses];

export default (router, container) => controllers.forEach(f => f(router, container));
