export const config = {
  passport: {
    secret: 'node.js_sample_secret_key_1asd134',
    expiresIn: 10000,
  },
  env: {
    port: 8080,
    mongoDBUri:
      process.env.ENV === 'prod'
        ? 'mongodb+srv://user:userTestingPassword@cluster0-yfpdy.mongodb.net/test?retryWrites=true&w=majority'
        : 'mongodb://localhost/test',
    mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
  },
};

export const underscoreId = '_id';
