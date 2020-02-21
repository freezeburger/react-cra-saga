//https://asciinema.org/a/d3nnfgv3n0vj2omzsl33l8um6

// https://github.com/mateodelnorte/meta

// https://www.npmjs.com/package/simple-git
const simpleGit = require('simple-git')('../' /* workingDirPath */);
const path = require('path').resolve('../');
console.log(path);

class GitTeamCommand {
  constructor(workingDirPath = '.') {}
  run(/* command,  */ ...options) {
    //TODO check if worker is running 
    const worker =  new Promise((resolve,reject)=>{
        const process = require('child_process').spawn('command', options);

        process.stdout.on('data', data => {
            resolve(`${data}`);
        });
    
        process.stderr.on('data', data => {
            reject(`${data}`);
        });
    
        process.on('close', code => {
          console.log(`command exited with code ${code}`);
        });
    })
    return worker;
  }
  async runGit(...options) {
    return this.run('git', ...options);
  }
  async branchCurrentName() {
    return this.runGit('rev-parse', '--abbrev-ref', 'HEAD');
  }
  async branchCompareRemote(remotePath = 'origin') {
    const currentBranch = await this.branchCurrentName();
    return this.runGit('diff', currentBranch, `${remotePath}/${currentBranch}`);
  }
}
const gtc = new GitTeamCommand('../');
//gtc.run('ls', '-lh', '/usr');
gtc.branchCurrentName();
gtc.branchCompareRemote().then( result => console.log(result))
