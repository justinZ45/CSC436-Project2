const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 3001;
const upload = multer();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function sendError(res, statusCode, message) {
  res.status(statusCode).json({
    error: message,
  });
}

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  sendError(res, 500, 'Internal server error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/v1/api/posts', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({
        error: 'Posts not found',
      });
      return;
    }

    const posts = JSON.parse(data);
    res.json(posts);
  });
});

app.post('/v1/api/posts', upload.none(), (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({
      error: 'Title and content are required',
    });
    return;
  }

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({
        error: 'Posts not found',
      });
      return;
    }

    const posts = JSON.parse(data);

    const newId =
      posts.reduce((accumulator, currentValue) => {
        if (accumulator > currentValue.id) {
          return accumulator;
        }
        return currentValue.id;
      }, 0) + 1;

    const newPost = {
      id: newId,
      title,
      content,
      last_updated: new Date().toISOString(),
      originally_published: new Date().toISOString(),
    };
    posts.push(newPost);

    fs.writeFile('./data.json', JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).json({
          error: 'Error writing to data store',
        });
        return;
      }

      res.status(201).json(newPost);
    });
  });
});

app.get('/v1/api/posts/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({
        error: 'Posts not found',
      });
      return;
    }

    const posts = JSON.parse(data);
    const post = posts.find((p) => parseInt(p.id, 10) === parseInt(id, 10));

    if (!post) {
      res.status(404).json({
        error: `Post ${id} not found`,
      });
      return;
    }

    res.json(post);

  });
});

app.patch('/v1/api/posts/:id', upload.none(), (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title && !content) {
    res.status(400).json({
      error: 'Title or content is required',
    });
    return;
  }

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({
        error: 'Posts not found',
      });
      return;
    }

    const posts = JSON.parse(data);
    const post = posts.find((p) => parseInt(p.id, 10) === parseInt(id, 10));

    if (!post) {
      res.status(404).json({
        error: 'Post not found',
      });
      return;
    }

    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    post.last_updated = new Date().toISOString();

    fs.writeFile('./data.json', JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).json({
          error: 'Error writing to data store',
        });
        return;
      }

      res.json(post);
    });
  });
});

app.delete('/v1/api/posts/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({
        error: 'Posts not found',
      });
      return;
    }

    const posts = JSON.parse(data);
    const postIndex = posts.findIndex(
      (p) => parseInt(p.id, 10) === parseInt(id, 10)
    );

    if (postIndex === -1) {
      res.status(404).json({
        error: 'Post not found',
      });
      return;
    }

    posts.splice(postIndex, 1);

    fs.writeFile('./data.json', JSON.stringify(posts), (err) => {
      if (err) {
        res.status(500).json({
          error: 'Error writing to data store',
        });
        return;
      }

      res.sendStatus(200);
    });
  });
});
