import SSH from 'simple-ssh';
import { SSH_HOST, SSH_USER, SSH_PASS, SSH_DIR } from './envSetup.js';

const ssh = new SSH({
    host: SSH_HOST,
    user: SSH_USER,
    pass: SSH_PASS,
    baseDir: SSH_DIR
});

export default ssh;