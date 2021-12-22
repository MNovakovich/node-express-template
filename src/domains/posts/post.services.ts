import { injectable } from 'tsyringe';
import { Post } from './post.model';

import { BaseService } from '../../core/base.service';

@injectable()
export class PostService extends BaseService<Post> {
  constructor() {
    super(Post);
  }
}

// npx sequelize-auto -h localhost -d timetracking_app -u root -x root -p 3306  --dialect mysql -c ./src/config/db.ts -o ./models -l ts --useDefine ts  --singularize, --sg
