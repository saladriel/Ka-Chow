exports.notFound = {
  type: 'https://api.ka-chow.com/v1/problem/NotFound',
  title: 'The requested resource could not be found.',
  status: 404,
};

exports.invalidInput = function (invalidProperties) {
  return {
    type: 'https://api.ka-chow.com/v1/problem/InvalidInput',
    title: 'Some of the input provided was invalid.',
    invalidProperties: invalidProperties,
    status: 400,
  };
};

exports.unknownProblem = {
  type: 'https://api.ka-chow.com/v1/problems/UnknownProblem',
  title: 'An unknown problem occured.',
  status: 500,
};
