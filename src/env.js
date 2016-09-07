import jetpack from 'fs-jetpack';

export default jetpack.cwd(__dirname).read('env.json', 'json');
