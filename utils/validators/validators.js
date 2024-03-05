import Ajv from "ajv"
const ajv = new Ajv({ allErrors: true })

const createUser_Schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      company: { type: 'string' },
      password: { type: 'string' },
      're-password': { type: 'string' },
    },
    required: ['name', 'email', 'company', 'password', 're-password'],
    additionalProperties: false,
}

const loginUser_Schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      company: { type: 'string' },
      password: { type: 'string' },
      're-password': { type: 'string' },
    },
    required: ['name', 'email', 'company', 'password', 're-password'],
    additionalProperties: false,
}

const product_schema = {
    type: 'object', 
    properties: {
        brand: { type: 'string'},
        model: { type: 'string'},
        description: { type: 'string' },
        category: { type: 'string' },
        subcategory: { type: 'string' },
        quantity: { type: 'string' },
        price: { type: 'string'},
        images: { type: 'string' },
        upc: { type: 'string' },
        isActive: { type: "boolean" },
        features: { type: 'array' }
    },
    required: [
        'brand',
        'model',
        'description',
        'category',
        'subcategory',
        'quantity',
        'price',
        'upc',
        'isActive',
    ],
}

const order_schema = {
    type: 'object',
    properties: {}
}

const validateCreateUser = ajv.compile(createUser_Schema);
const validateLoginUser = ajv.compile(loginUser_Schema);


export { validateCreateUser, validateLoginUser };