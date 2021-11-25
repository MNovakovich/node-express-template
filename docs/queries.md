### How to write custom query with join

```js
// import db instance
// import db from '../../config/database';
const postTags = await db.query(
  `
    SELECT *, p.title as post_title 
    FROM posts_tags
    INNER JOIN posts p
    ON posts_tags.post_id = p.id  
    `,
  {
    type: QueryTypes.SELECT,
  }
);
```
