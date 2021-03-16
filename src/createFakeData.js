import Post from './models/post';

export default function createFakeData() {
  // create array with 0, 1, ... 39 and convert to post data
  const posts = [...Array(40).keys()].map(i => ({
    title: `Post #${i}`,
    // https://www.lipsum.com/
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['fake', 'data'],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}