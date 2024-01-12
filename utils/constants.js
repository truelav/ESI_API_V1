const HTTPStatusCodes = {
  // 1xx Informational
  Continue: 100,

  // 2xx Success
  OK: 200,
  Created: 201,
  NoContent: 204,

  // 3xx Redirection
  MovedPermanently: 301,
  Found: 302,
  NotModified: 304,

  // 4xx Client Errors
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ExistsAlready: 409,
  UnprocessableEntity: 422,

  // 5xx Server Errors
  InternalServerError: 500,
  NotImplemented: 501,
  ServiceUnavailable: 503,
};

const authorizationRoles = {
  ADMIN: true,
  SALES: true,
  USER: true,
};

const ProductCategories = {
  accessories: "accessories",
  appliances: "appliances",
  audio: "naudioextjs",
  camera: "camera",
  cellphone: "cellphone",
  computer: "computer",
  electronics: "electronics",
  gaming: "gaming",
  healthcare: "healthcare",
  kitchen: "kitchen",
  home_security: "home security",
  personal_care: "personal care",
  pet_supplies: "pet supplies",
  toy: "toy",
  tv: "tv",
  watches: "watches",
};

export { HTTPStatusCodes, authorizationRoles, ProductCategories };
