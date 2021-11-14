import { Post } from '../posts/post.model';
export class TransientClass {
  public constructor() {
    console.log('Transient constructor');
  }
  public async greet() {
    const res = await Post.findAll();
    console.log(res);
  }
}
