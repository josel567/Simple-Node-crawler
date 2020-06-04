import {Application} from './app';

const app = new Application();

app.startServer().then(() => {
    console.log('Server working!');
});
